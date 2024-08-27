import DICTIONARY from '../Assets/Lang/PL.json';

export default class SupplementUtilities {
  static getUnitText(value: number): string | undefined {
    switch (value) {
      case 1:
        return DICTIONARY.unit_g;
      case 2:
        return DICTIONARY.unit_pcs;
      default:
        return undefined;
    }
  }
}
