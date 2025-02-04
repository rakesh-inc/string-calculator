import {
  StringParserResult,
  IStringParser,
  INumberStringParser,
} from "./string-calculator.interface";

export class NumberStringParser implements INumberStringParser {
  parse(input: string, regex: RegExp): number[] {
    let numberArray = input.split(regex).map(Number);
    if (numberArray.some((number) => number < 0)) {
      throw new Error(
        `error: negatives not allowed: ${numberArray.filter((number) => number < 0).join(" ")}`
      );
    }
    return numberArray.filter((number) => number <= 1000);
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
    return {
      regularExpression: new RegExp(`[,\n${delimiter}]`),
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
