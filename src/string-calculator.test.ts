import { StringCalculator } from "./string-calculator";

describe("StringCalculator", () => {
  it("should return 0 when empty string is passed", () => {
    let calculator = new StringCalculator();
    expect(calculator.add("")).toBe(0);
  });

  it("should return number when a single number number is passed", () => {
    let calculator = new StringCalculator();
    expect(calculator.add("4")).toBe(4);
  });
});
