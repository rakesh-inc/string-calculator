import { DelimiterParserResult, IDelimiterParser } from "./string-calculator.interface";

export class DelimiterParser implements IDelimiterParser {
  parse(input: string): DelimiterParserResult {
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
  constructor(private delimiterParser: IDelimiterParser) {}

  add(numbers: string): any {
    if (numbers === "") {
      return 0;
    }
    const { regularExpression, updatedNumbers } = this.delimiterParser.parse(numbers);
    let numberArray = updatedNumbers.split(regularExpression).map(Number);
    if (numberArray.some((number) => number < 0)) {
      throw new Error(
        `error: negatives not allowed: ${numberArray.filter((number) => number < 0).join(" ")}`
      );
    }
    return numberArray.reduce((acc, curr) => acc + curr, 0);
  }
}
