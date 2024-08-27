import {UserMeasure} from './User';
import DateUtilities from './DateUtilities';

export default class MeasureUtilities {
  static getMeasureSuffix = (
    item: Exclude<keyof UserMeasure, 'date'>,
  ): string => (item === 'weight' ? 'kg' : 'cm');

  static getChartLastMeasures = (
    measures: UserMeasure[],
    attribute: Exclude<keyof UserMeasure, 'date'>,
    limit: number = 4,
  ): number[] => {
    const lastMeasures = measures
      .slice(-limit)
      .map(measure => measure[attribute]);
    return lastMeasures;
  };

  static getChartLastDates = (
    measures: UserMeasure[],
    limit: number = 4,
  ): string[] => {
    const lastDates = measures
      .slice(-limit)
      .map(measure => DateUtilities.formatTimestampToString(measure.date));
    return lastDates;
  };

  static calculateDifference = (
    currentValue: number,
    nextValue: number | null,
  ): string => {
    if (nextValue == null || currentValue === nextValue) {
      return '-';
    }

    const difference = (currentValue - nextValue).toFixed(1);
    return Number(difference) > 0 ? `+${difference}` : difference;
  };
}
