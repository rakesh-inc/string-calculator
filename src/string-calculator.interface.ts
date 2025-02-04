export interface DelimiterParserResult {
  regularExpression: RegExp;
  updatedNumbers: string;
}

export interface IDelimiterParser {
  parse(input: string): DelimiterParserResult;
}
