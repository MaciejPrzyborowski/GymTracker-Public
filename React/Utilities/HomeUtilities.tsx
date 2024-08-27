import {UserProgress} from './User';

export default class HomeUtilities {
  static areAllValuesFalse = (updatedStats: UserProgress): boolean => {
    return this.checkAllCategories(updatedStats, item => item.status);
  };

  static areAllValuesTrue = (updatedStats: UserProgress): boolean => {
    return this.checkAllCategories(updatedStats, item => !item.status);
  };

  private static checkAllCategories = (
    updatedStats: UserProgress,
    condition: (item: any) => boolean,
  ): boolean => {
    const categoriesToCheck: (keyof UserProgress)[] = [
      'supplements',
      'meals',
      'trainings',
    ];

    for (const category of categoriesToCheck) {
      if (Object.values(updatedStats[category]).some(condition)) {
        return false;
      }
    }
    return true;
  };
}
