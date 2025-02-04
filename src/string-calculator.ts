import {
  StringParserResult,
  IStringParser,
  INumberStringParser,
  INumberValidator,
} from "./string-calculator.interface";

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
  parse(input: string): StringParserResult {
    if (!input.startsWith("//")) {
      return {
        regularExpression: new RegExp(`[,\n]`),
        updatedNumbers: input,
      };
    }
    const [delimiter, numberString] = input.split("\n");
    const parsedDelimiter = delimiter.slice(2);
    let updatedDelimiter = new RegExp(`[,\n${parsedDelimiter}]`);
    let updatedNumberString = numberString;
    if (parsedDelimiter.startsWith("[") && parsedDelimiter.endsWith("]")) {
      updatedNumberString = numberString
        .split(/[\[\]]/)
        .filter((delimiter) => delimiter)
        .join("");
      updatedDelimiter = new RegExp(parsedDelimiter);
    }
    return {
      regularExpression: updatedDelimiter,
      updatedNumbers: updatedNumberString,
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
