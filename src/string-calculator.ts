export class StringCalculator {
  add(numbers: string): any {
    if (numbers === "") {
      return 0;
    }
    if (numbers.length === 1) {
      return parseInt(numbers);
    }
    let regExp = new RegExp(`[,\n]`);
    if (numbers.startsWith("//")) {
      const [delimiter, numberString] = numbers.split("\n");
      regExp = new RegExp(`[,\n${delimiter}]`);
      numbers = numberString;
    }

    let numberArray = numbers.split(regExp).map(Number);
    return numberArray.reduce((acc, curr) => acc + curr, 0);
  }
}
