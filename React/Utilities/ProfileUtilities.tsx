import DICTIONARY from '../Assets/Lang/PL.json';

export default class ProfileUtilities {
  // BMI
  static calculateBMI(weight: number, height: number): string {
    const bmi = (weight / Math.pow(height / 100, 2)).toFixed(2);
    return bmi;
  }

  static statusBMI(bmi: number): string {
    if (isNaN(bmi)) {
      return DICTIONARY.ProfileParameters_null;
    } else if (bmi < 18.5) {
      return DICTIONARY.ProfileParameters_underweight;
    } else if (bmi < 25) {
      return DICTIONARY.ProfileParameters_correct;
    } else if (bmi < 30) {
      return DICTIONARY.ProfileParameters_overweight;
    } else {
      return DICTIONARY.ProfileParameters_obesity;
    }
  }

  // RFM
  static calculateRFM(
    height: number,
    waistCircum: number,
    gender: number,
  ): string {
    let rfm = DICTIONARY.ProfileParameters_null;
    if (gender === 1) {
      const iRFM = (64 - 20 * (height / waistCircum) + 12).toFixed(2);
      rfm = iRFM;
    } else if (gender === 2) {
      const iRFM = (64 - 20 * (height / waistCircum)).toFixed(2);
      rfm = iRFM;
    }
    return rfm;
  }

  static statusRFM(rfm: number, gender: number): string {
    if (isNaN(rfm) || gender == 0) {
      return DICTIONARY.ProfileParameters_null;
    } else if ((gender === 1 && rfm > 35) || (gender === 2 && rfm > 25)) {
      return DICTIONARY.ProfileParameters_incorrect;
    }
    return DICTIONARY.ProfileParameters_correct;
  }

  // WHR
  static calculateWHR(waistCircum: number, hipCircum: number): string {
    const whr = (waistCircum / hipCircum).toFixed(2);
    return whr;
  }

  static statusWHR(whr: number, gender: number): string {
    if (isNaN(whr) || gender == 0) {
      return DICTIONARY.ProfileParameters_null;
    } else if ((gender === 1 && whr > 0.8) || (gender === 2 && whr > 1)) {
      return DICTIONARY.ProfileParameters_apple;
    }
    return DICTIONARY.ProfileParameters_pear;
  }

  // PPM
  static calculatePPM(
    weight: number,
    height: number,
    age: number,
    gender: number,
  ): string {
    let ppm = DICTIONARY.ProfileParameters_null;
    if (gender == 1) {
      ppm = (655.1 + 9.563 * weight + 1.85 * height - 4.676 * age).toFixed(0);
    } else if (gender == 2) {
      ppm = (66.5 + 13.75 * weight + 5.003 * height - 6.755 * age).toFixed(0);
    }
    return ppm;
  }

  // Water
  static calculateWater(weight: number): string {
    const water = (weight * 35).toFixed(0);
    return water;
  }

  // MinWeight
  static calculateMinWeight(height: number): string {
    const correctWeight = (18.5 * Math.pow(height / 100, 2)).toFixed(1);
    return correctWeight;
  }

  static statusMinWeight(minWeight: number, weight: number): string {
    if (isNaN(weight)) {
      return DICTIONARY.ProfileParameters_null;
    } else if (weight >= minWeight) {
      return DICTIONARY.ProfileParameters_fulfilled;
    } else {
      const weightDiff = (minWeight - weight).toFixed(1);
      return `${DICTIONARY.ProfileParameters_tooLittle}: ${weightDiff}`;
    }
  }

  // CorrectWeight
  static calculateCorrectWeight(height: number): string {
    const correctWeight = (0.75 * (height - 150) + 50).toFixed(1);
    return correctWeight;
  }

  static statusCorrectWeight(correctWeight: number, weight: number): string {
    if (isNaN(weight)) {
      return DICTIONARY.ProfileParameters_null;
    } else if (correctWeight == weight) {
      return DICTIONARY.ProfileParameters_fulfilled;
    } else if (weight > correctWeight) {
      const weightDiff = (weight - correctWeight).toFixed(1);
      return `${DICTIONARY.ProfileParameters_tooMany}: ${weightDiff}`;
    } else {
      const weightDiff = (correctWeight - weight).toFixed(1);
      return `${DICTIONARY.ProfileParameters_tooLittle}: ${weightDiff}`;
    }
  }

  // Maxweight
  static calculateMaxWeight(height: number): string {
    const correctWeight = (25 * Math.pow(height / 100, 2)).toFixed(1);
    return correctWeight;
  }

  static statusMaxWeight(maxWeight: number, weight: number): string {
    if (isNaN(weight)) {
      return DICTIONARY.ProfileParameters_null;
    } else if (weight <= maxWeight) {
      return DICTIONARY.ProfileParameters_fulfilled;
    } else {
      const weightDiff = (weight - maxWeight).toFixed(1);
      return `${DICTIONARY.ProfileParameters_tooMany}: ${weightDiff}`;
    }
  }
}
