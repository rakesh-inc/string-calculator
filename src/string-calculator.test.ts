import {
  StringParser,
  StringCalculator,
  NumberStringParser,
  NumberValidator,
} from "./string-calculator";

describe("StringCalculator", () => {
  let calculator: StringCalculator;
  beforeEach(() => {
    calculator = new StringCalculator(
      new StringParser(),
      new NumberStringParser(new NumberValidator())
    );
  });

  it("should return 0 when empty string is passed", () => {
    expect(calculator.add("")).toBe(0);
  });

  it("should return number when a single number number is passed", () => {
    expect(calculator.add("4")).toBe(4);
  });

  it("should return the sum when two numbers are passed as string", () => {
    expect(calculator.add("1,2")).toBe(3);
  });

  it("should return the sum of numbers when multiple numbers are passed", () => {
    expect(calculator.add("1,2,3,4,5,6,7,8,9")).toBe(45);
  });

  it("should return the sum when new line is added as seperator", () => {
    expect(calculator.add("1\n2,3")).toBe(6);
  });

  it("should return the sum when a custom delimiter is added", () => {
    expect(calculator.add("//;\n1;2")).toBe(3);
  });

  it("should return throw error when negative number are passed", () => {
    expect(() => calculator.add("1,-2,-3")).toThrow("error: negatives not allowed: -2 -3");
  });

  it("should ignore numbers greater than 1000", () => {
    expect(calculator.add("1001,2")).toBe(2);
  });

  it("should return sum when arbitary length separator are passed", () => {
    expect(calculator.add("//[***]\n1***2***3")).toBe(6);
  });

  it("should handle multiple single enclosed separator", () => {
    expect(calculator.add("//[*][%]\n1*2%3")).toBe(6);
  });

  it("should handle multiple longer-lenght enclosed delimiters", () => {
    expect(calculator.add("//[foo][bar]\n1foo2bar3")).toBe(6);
  });
});
