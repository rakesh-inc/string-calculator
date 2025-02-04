export class StringCalculator {
  add(numbers: string): any {
    if (numbers === "") {
      return 0;
    }
    if (numbers.length === 1) {
      return parseInt(numbers);
    }
    let numberArray = numbers.split(",");
    return parseInt(numberArray[0]) + parseInt(numberArray[1]);
  }
}
