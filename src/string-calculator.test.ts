import { StringCalculator } from "./string-calculator";

describe("StringCalculator", () => {
  it("should return 0 when empty string is passed", () => {
    let calculator = new StringCalculator();
    expect(calculator.add("")).toBe(0);
  });
});
