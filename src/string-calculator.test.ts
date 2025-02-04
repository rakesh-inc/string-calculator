import { StringCalculator } from "./string-calculator";

describe("StringCalculator", () => {
  let calculator: StringCalculator;
  beforeEach(() => {
    calculator = new StringCalculator();
  });

  it("should return 0 when empty string is passed", () => {
    expect(calculator.add("")).toBe(0);
  });

  it("should return number when a single number number is passed", () => {
    expect(calculator.add("4")).toBe(4);
  });
});
