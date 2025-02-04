export class StringCalculator {
  add(numbers: string): any {
    if (numbers === "") {
      return 0;
    }
    return parseInt(numbers);
  }
}
