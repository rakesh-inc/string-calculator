export class StringCalculator {
  add(numbers: string): any {
    if (numbers === "") {
      return 0;
    }
    if (numbers.length === 1) {
      return parseInt(numbers);
    }
    let numberArray = numbers.split(/[,\n]/).map(Number);
    return numberArray.reduce((acc, curr) => acc + curr, 0);
  }
}
