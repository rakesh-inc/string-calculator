import {
  StringParserResult,
  IStringParser,
  INumberStringParser,
  INumberValidator,
  IDelimiterParser,
} from "./string-calculator.interface";

export class DelimiterParser implements IDelimiterParser {
  private isEnclosedDelimiter(input: string): boolean {
    return input.startsWith("[") && input.endsWith("]");
  }

  parse(input: string): RegExp {
    const parsedDelimiter = input.slice(2);

    if (!this.isEnclosedDelimiter(parsedDelimiter)) {
      return new RegExp(`[,\n${parsedDelimiter}]`);
    }

    return new RegExp(
      `[${parsedDelimiter
        .split(/[\[\]]/)
        .filter((delimiter) => delimiter)
        .join("")}]`
    );
  }
}

export class NumberValidator implements INumberValidator {
  validate(numbers: number[]): number[] {
    this.validateNegatives(numbers);
    return this.filterLargeNumbers(numbers);
  }

  private filterLargeNumbers(numbers: number[]): number[] {
    return numbers.filter((number) => number <= 1000);
  }

  private validateNegatives(numbers: number[]): void {
    if (numbers.some((number) => number < 0)) {
      throw new Error(
        `error: negatives not allowed: ${numbers.filter((number) => number < 0).join(" ")}`
      );
    }
  }
}

export class NumberStringParser implements INumberStringParser {
  constructor(private numberValidator: INumberValidator) {}
  parse(input: string, regex: RegExp): number[] {
    let numberArray = input.split(regex).map(Number);
    return this.numberValidator.validate(numberArray);
  }
}

export class StringParser implements IStringParser {
  constructor(private delimiterParser: IDelimiterParser) {}

  private getDefaultDelimiter(input: string): StringParserResult {
    return {
      regularExpression: new RegExp(`[,\n]`),
      updatedNumbers: input,
    };
  }

  parse(input: string): StringParserResult {
    if (!input.startsWith("//")) {
      return this.getDefaultDelimiter(input);
    }
    const [delimiter, numberString] = input.split("\n");
    return {
      regularExpression: this.delimiterParser.parse(delimiter),
      updatedNumbers: numberString,
    };
  }
}

export class StringCalculator {
  constructor(private stringParser: IStringParser, private numStringParser: INumberStringParser) {}
  add(numbers: string): any {
    if (numbers === "") {
      return 0;
    }
    const { regularExpression, updatedNumbers } = this.stringParser.parse(numbers);
    const numberArray = this.numStringParser.parse(updatedNumbers, regularExpression);
    return numberArray.reduce((acc, curr) => acc + curr, 0);
  }
}
