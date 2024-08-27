export default class Utilities {
  static convertToNumber(value: string): number {
    const trimmedValue = value.trim();
    if (trimmedValue == '') {
      return 0;
    }

    const normalizedValue = Number(trimmedValue.replace(',', '.'));
    if (isNaN(normalizedValue)) {
      return 0;
    }
    return Number(normalizedValue.toFixed(2));
  }

  static isNotNumeric(input: string): boolean {
    if (input.length === 0) {
      return false;
    }
    const numericRegex = /^[0-9]*[.,]?[0-9]+$/;
    return !numericRegex.test(input);
  }
}
