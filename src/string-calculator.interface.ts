export interface StringParserResult {
  regularExpression: RegExp;
  updatedNumbers: string;
}

export interface IStringParser {
  parse(input: string): StringParserResult;
}

export interface INumberStringParser {
  parse(input: string, regex: RegExp): number[];
}
