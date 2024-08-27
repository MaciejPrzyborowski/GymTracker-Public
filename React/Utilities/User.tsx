import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

export const MealsValues = ['3', '4', '5', '6'];

export enum GenderType {
  None = 0,
  Female = 1,
  Male = 2,
}

export enum UnitType {
  Grams = 0,
  Pieces = 1,
}

export enum NotificationType {
  No = 0,
  Yes = 1,
}

export type FirestoreUser = {
  profile: UserProfile;
  stats: UserStats;
};

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  gender: number;
  birthday: FirebaseFirestoreTypes.Timestamp | null;
  meals: number;
  timeWakeUp: FirebaseFirestoreTypes.Timestamp | null;
  timeSleep: FirebaseFirestoreTypes.Timestamp | null;
  dailyDayNotifications: boolean;
  dailyNightNotifications: boolean;
  completed: boolean;
}

export interface UserStats {
  supplementsConsumed: number;
  gramsOfSupplementsConsumed: number;
  piecesOfSupplementsConsumed: number;
  trainingsCompleted: number;
  mealsConsumed: number;
}

export interface UserMeasure {
  id: number;
  height: number;
  weight: number;
  chestCircum: number;
  waistCircum: number;
  hipCircum: number;
  armCircum: number;
  thighCircum: number;
  calfCircum: number;
  date: FirebaseFirestoreTypes.Timestamp;
}

export interface UserSupplement {
  id: number;
  name: string;
  unit: number;
  serve: number;
  currentValue: number;
  defaultValue: number;
  timeServe: FirebaseFirestoreTypes.Timestamp;
  daysServe: boolean[];
}

export interface UserTraining {
  id: number;
  name: string;
  time: (FirebaseFirestoreTypes.Timestamp | null)[];
}

export type UserProgress = {
  info: ProgressInfoProp;
  supplements: ProgressSupplementsProp;
  trainings: ProgressTrainingsProp;
  meals: ProgressMealsProp;
};

export interface ProgressInfoProp {
  date: string;
  exists: boolean;
}

export interface ProgressSupplementsProp {
  [key: string]: {
    id: number;
    name: string;
    unit: number;
    serve: number | null;
    defaultServe: number;
    timeServe: FirebaseFirestoreTypes.Timestamp;
    status: boolean;
  };
}

export interface ProgressTrainingsProp {
  [key: number]: {
    name: string;
    time: FirebaseFirestoreTypes.Timestamp;
    status: boolean;
  };
}

export interface ProgressMealsProp {
  [key: number]: {
    type: number;
    time: FirebaseFirestoreTypes.Timestamp | null;
    status: boolean;
  };
}

export class User {
  private profile: UserProfile;
  private stats: UserStats;
  private measures: UserMeasure[];
  private supplements: UserSupplement[];
  private trainings: UserTraining[];
  private progress: UserProgress[];
  private lastUpdate: Date;

  constructor(
    profile: UserProfile,
    stats: UserStats,
    measures: UserMeasure[],
    supplements: UserSupplement[],
    trainings: UserTraining[],
    progress: UserProgress[],
  ) {
    this.profile = profile;
    this.stats = stats;
    this.measures = measures;
    this.supplements = supplements;
    this.trainings = trainings;
    this.progress = progress;
    this.lastUpdate = new Date();
  }

  // Profile
  getProfile(
    field: keyof UserProfile,
  ): string | number | boolean | FirebaseFirestoreTypes.Timestamp | null {
    return this.profile[field];
  }

  async updateProfile(updates: Partial<UserProfile>) {
    const profileUpdates: any = {};

    if (updates.name !== undefined) {
      this.profile.name = updates.name;
      profileUpdates['profile.name'] = updates.name;
    }
    if (updates.gender !== undefined) {
      this.profile.gender = updates.gender;
      profileUpdates['profile.gender'] = updates.gender;
    }
    if (updates.birthday !== undefined) {
      this.profile.birthday = updates.birthday;
      profileUpdates['profile.birthday'] = updates.birthday;
    }
    if (updates.meals !== undefined) {
      this.profile.meals = updates.meals;
      profileUpdates['profile.meals'] = updates.meals;
    }
    if (updates.timeWakeUp !== undefined) {
      this.profile.timeWakeUp = updates.timeWakeUp;
      profileUpdates['profile.timeWakeUp'] = updates.timeWakeUp;
    }
    if (updates.timeSleep !== undefined) {
      this.profile.timeSleep = updates.timeSleep;
      profileUpdates['profile.timeSleep'] = updates.timeSleep;
    }
    if (updates.dailyDayNotifications !== undefined) {
      this.profile.dailyDayNotifications = updates.dailyDayNotifications;
      profileUpdates['profile.dailyDayNotifications'] =
        updates.dailyDayNotifications;
    }
    if (updates.dailyNightNotifications !== undefined) {
      this.profile.dailyNightNotifications = updates.dailyNightNotifications;
      profileUpdates['profile.dailyNightNotifications'] =
        updates.dailyNightNotifications;
    }

    try {
      await firestore()
        .collection('users')
        .doc(this.profile.uid)
        .update(profileUpdates);
    } catch (error) {
      console.error(error);
    }
  }

  async updateProfileName(name: string) {
    this.profile.name = name;
    try {
      await firestore().collection('users').doc(this.profile.uid).update({
        'profile.name': name,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async updateProfileGender(gender: number) {
    this.profile.gender = gender;
    try {
      await firestore().collection('users').doc(this.profile.uid).update({
        'profile.gender': gender,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async updateProfileBirthday(birthday: FirebaseFirestoreTypes.Timestamp) {
    this.profile.birthday = birthday;
    try {
      await firestore().collection('users').doc(this.profile.uid).update({
        'profile.birthday': birthday,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async updateProfileMeals(meals: number) {
    this.profile.meals = meals;
    try {
      await firestore().collection('users').doc(this.profile.uid).update({
        'profile.meals': meals,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async updateProfileTimeWakeUp(timeWakeUp: FirebaseFirestoreTypes.Timestamp) {
    this.profile.timeWakeUp = timeWakeUp;
    try {
      await firestore().collection('users').doc(this.profile.uid).update({
        'profile.timeWakeUp': timeWakeUp,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async updateProfileTimeSleep(timeSleep: FirebaseFirestoreTypes.Timestamp) {
    this.profile.timeSleep = timeSleep;
    try {
      await firestore().collection('users').doc(this.profile.uid).update({
        'profile.timeSleep': timeSleep,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async updateProfileCompleted(completed: boolean) {
    this.profile.completed = completed;
    try {
      await firestore().collection('users').doc(this.profile.uid).update({
        'profile.completed': completed,
      });
    } catch (error) {
      console.error(error);
    }
  }

  // Stats
  getStats(field: keyof UserStats): number {
    return this.stats[field];
  }

  private async updateStatsInFirestore(
    field: keyof UserStats,
    isIncrease: boolean,
    additionalValue?: number,
  ) {
    const currentValue = this.stats[field];

    if (additionalValue !== undefined) {
      this.stats[field] = Math.max(
        0,
        currentValue + (isIncrease ? additionalValue : -additionalValue),
      );
    } else {
      this.stats[field] = Math.max(0, currentValue + (isIncrease ? 1 : -1));
    }

    const updateFields = {
      [`stats.${field}`]: this.stats[field],
    };

    try {
      await firestore()
        .collection('users')
        .doc(this.profile.uid)
        .update(updateFields);
    } catch (error) {
      console.error(error);
    }
  }

  async updateStatsSupplements(
    supplementUnit: number,
    supplementServe: number,
    isIncrease: boolean,
  ) {
    const fieldToUpdate =
      supplementUnit === 1
        ? 'gramsOfSupplementsConsumed'
        : 'piecesOfSupplementsConsumed';
    await this.updateStatsInFirestore('supplementsConsumed', isIncrease);
    await this.updateStatsInFirestore(
      fieldToUpdate,
      isIncrease,
      supplementServe,
    );
  }

  async updateStatsTraining(isIncrease: boolean) {
    await this.updateStatsInFirestore('trainingsCompleted', isIncrease);
  }

  async updateStatsMeals(isIncrease: boolean) {
    await this.updateStatsInFirestore('mealsConsumed', isIncrease);
  }

  // Measures
  getMeasures(): UserMeasure[] {
    return this.measures;
  }

  getLastMeasure(): UserMeasure | null {
    return this.measures.length > 0
      ? [...this.measures].sort((a, b) => b.date.seconds - a.date.seconds)[0]
      : null;
  }

  async addMeasure(measure: Omit<UserMeasure, 'id' | 'date'>) {
    const existingMeasureIndex = this.measures.findIndex(measure => {
      const todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0);

      const measureDate = measure.date.toDate();
      measureDate.setHours(0, 0, 0, 0);
      return measureDate.getTime() === todayDate.getTime();
    });

    let newId: number;
    if (existingMeasureIndex !== -1) {
      newId = this.measures[existingMeasureIndex].id;
      this.measures[existingMeasureIndex] = {
        id: newId,
        ...measure,
        date: firestore.Timestamp.now(),
      };
    } else {
      if (this.measures.length > 0) {
        newId = Math.max(...this.measures.map(measure => measure.id)) + 1;
      } else {
        newId = 1;
      }

      this.measures.push({
        id: newId,
        ...measure,
        date: firestore.Timestamp.now(),
      });
    }
    try {
      await firestore()
        .collection(`users/${this.profile.uid}/measures`)
        .doc(newId.toString())
        .set(this.measures.find(measure => measure.id === newId)!);
    } catch (error) {
      console.error(error);
    }
  }

  // Supplements
  getSupplements(): UserSupplement[] {
    return this.supplements;
  }

  getSupplementById(id: number): UserSupplement | null {
    const supplement = this.supplements.find(
      supplement => supplement.id === id,
    );
    return supplement ? supplement : null;
  }

  getSupplementValueById(id: number): number {
    const supplement = this.supplements.find(
      supplement => supplement.id === id,
    );
    return supplement ? supplement.currentValue : 0;
  }

  async addSupplement(supplement: Omit<UserSupplement, 'id'>) {
    let newId: number;

    if (this.supplements.length > 0) {
      newId =
        Math.max(...this.supplements.map(supplement => supplement.id)) + 1;
    } else {
      newId = 1;
    }
    const newSupplement: UserSupplement = {
      id: newId,
      ...supplement,
    };
    this.supplements.push(newSupplement);

    try {
      await firestore()
        .collection(`users/${this.profile.uid}/supplements`)
        .doc(newSupplement.id.toString())
        .set(newSupplement);
    } catch (error) {
      console.error(error);
    }
  }

  async renewSupplement(id: number) {
    const defaultValue = this.supplements.find(
      supplement => supplement.id === id,
    )?.defaultValue;

    if (defaultValue) {
      const updatedSupplements = this.supplements.map(supplement =>
        supplement.id === id
          ? {...supplement, currentValue: defaultValue}
          : supplement,
      );
      this.supplements = updatedSupplements;

      try {
        await firestore()
          .collection(`users/${this.profile.uid}/supplements`)
          .doc(id.toString())
          .update({
            currentValue: defaultValue,
          });
      } catch (error) {
        console.error(error);
      }
    }
  }

  async updateSupplementById(
    id: number,
    updatedValues: Partial<UserSupplement>,
  ) {
    const updatedSupplements = this.supplements.map(supplement =>
      supplement.id === id ? {...supplement, ...updatedValues} : supplement,
    );
    this.supplements = updatedSupplements;

    try {
      await firestore()
        .collection(`users/${this.profile.uid}/supplements`)
        .doc(id.toString())
        .update(updatedValues);
    } catch (error) {
      console.error(error);
    }
  }

  async updateSupplementCurrentValue(
    supplementId: number,
    supplementServe: number,
    isDecrease: boolean,
  ) {
    const supplementIndex = this.supplements.findIndex(
      supplement => supplement.id === supplementId,
    );

    if (supplementIndex !== -1) {
      const currentValue = this.supplements[supplementIndex].currentValue;
      const updatedValue = isDecrease
        ? currentValue - supplementServe
        : currentValue + supplementServe;

      this.supplements[supplementIndex].currentValue = updatedValue;
      try {
        await firestore()
          .collection(`users/${this.profile.uid}/supplements`)
          .doc(supplementId.toString())
          .update({
            currentValue: updatedValue,
          });
      } catch (error) {
        console.error(error);
      }
    }
  }

  async removeSupplement(id: number) {
    const updatedSupplements = this.supplements.filter(
      supplement => supplement.id !== id,
    );
    this.supplements = updatedSupplements;

    try {
      await firestore()
        .collection(`users/${this.profile.uid}/supplements`)
        .doc(id.toString())
        .delete();
    } catch (error) {
      console.error(error);
    }
  }

  // Trainings
  getTrainings(): UserTraining[] {
    return this.trainings;
  }

  getTrainingById(id: number): UserTraining | null {
    const training = this.trainings.find(training => training.id === id);
    return training ? training : null;
  }

  async addTraining(training: Omit<UserTraining, 'id'>) {
    let newId: number;

    if (this.trainings.length > 0) {
      newId = Math.max(...this.trainings.map(training => training.id)) + 1;
    } else {
      newId = 1;
    }
    const newTraining: UserTraining = {
      id: newId,
      ...training,
    };
    this.trainings.push(newTraining);

    try {
      await firestore()
        .collection(`users/${this.profile.uid}/trainings`)
        .doc(newTraining.id.toString())
        .set(newTraining);
    } catch (error) {
      console.error(error);
    }
  }

  async updateTrainingById(id: number, updatedValues: Partial<UserTraining>) {
    const updatedTrainings = this.trainings.map(training =>
      training.id === id ? {...training, ...updatedValues} : training,
    );
    this.trainings = updatedTrainings;

    try {
      await firestore()
        .collection(`users/${this.profile.uid}/trainings`)
        .doc(id.toString())
        .update(updatedValues);
    } catch (error) {
      console.error(error);
    }
  }

  async removeTraining(id: number) {
    const updatedTrainings = this.trainings.filter(
      training => training.id !== id,
    );
    this.trainings = updatedTrainings;

    try {
      await firestore()
        .collection(`users/${this.profile.uid}/trainings`)
        .doc(id.toString())
        .delete();
    } catch (error) {
      console.error(error);
    }
  }

  // Refresh
  async refreshUserData() {
    const elapsedTime =
      (new Date().getTime() - this.lastUpdate.getTime()) / 1000;

    if (elapsedTime >= 60) {
      try {
        const [
          userSnapshot,
          measuresSnapshot,
          supplementsSnapshot,
          trainingsSnapshot,
          progressSnapshot,
        ] = await Promise.all([
          firestore().doc(`users/${this.profile.uid}`).get(),
          firestore().collection(`users/${this.profile.uid}/measures`).get(),
          firestore().collection(`users/${this.profile.uid}/supplements`).get(),
          firestore().collection(`users/${this.profile.uid}/trainings`).get(),
          firestore().collection(`users/${this.profile.uid}/progress`).get(),
        ]);

        const userData = userSnapshot.data() as FirestoreUser;
        const measuresData = measuresSnapshot.docs.map(
          doc => doc.data() as UserMeasure,
        );
        const supplementsData = supplementsSnapshot.docs.map(
          doc => doc.data() as UserSupplement,
        );
        const trainingsData = trainingsSnapshot.docs.map(
          doc => doc.data() as UserTraining,
        );
        const progressData = progressSnapshot.docs.map(
          doc => doc.data() as UserProgress,
        );

        this.profile = userData.profile;
        this.stats = userData.stats;
        this.measures = measuresData;
        this.supplements = supplementsData;
        this.trainings = trainingsData;
        this.progress = progressData;
        this.lastUpdate = new Date();
      } catch (error) {
        console.error(error);
      }
    }
  }

  // Progress
  getMealType = (mealId: number): number => {
    const mealTypes = [1, 2, 3, 4, 5, 6];
    if (this.profile.meals < 6) {
      mealTypes.splice(3, 1);
      if (this.profile.meals < 5) {
        mealTypes.splice(3, 1);
        if (this.profile.meals < 4) {
          mealTypes.splice(1, 1);
        }
      }
    }
    return mealTypes[mealId - 1] || 0;
  };

  getMealTime = (mealId: number): FirebaseFirestoreTypes.Timestamp | null => {
    const {timeWakeUp, timeSleep, meals} = this.profile;

    if (!timeWakeUp || !timeSleep) {
      return null;
    }

    const firstMeal = timeWakeUp.toMillis() + 60 * 60 * 1000;
    const lastMeal = timeSleep.toMillis() - 2 * 60 * 60 * 1000;

    const mealTime =
      firstMeal + (mealId - 1) * ((lastMeal - firstMeal) / (meals - 1));

    return firestore.Timestamp.fromMillis(mealTime);
  };

  getDateProgress(date: string): UserProgress {
    const existingProgressData = this.progress.find(
      item => item.info.date === date,
    );
    if (existingProgressData) {
      return existingProgressData;
    }

    const dateDate = new Date(date);
    const dayIndex = dateDate.getUTCDay();

    const supplementData: ProgressSupplementsProp = {};
    const trainingData: ProgressTrainingsProp = {};
    const mealsData: ProgressMealsProp = {};

    this.supplements
      .filter(supplement => supplement.daysServe[dayIndex])
      .sort((a, b) => {
        const dateA = a.timeServe.toDate();
        const dateB = b.timeServe.toDate();
        return (
          dateA.getUTCHours() * 60 +
          dateA.getUTCMinutes() -
          (dateB.getUTCHours() * 60 + dateB.getUTCMinutes())
        );
      })
      .forEach((supplement, index) => {
        supplementData[index] = {
          id: supplement.id,
          name: supplement.name,
          unit: supplement.unit,
          serve: supplement.serve,
          defaultServe: supplement.serve,
          timeServe: supplement.timeServe,
          status: false,
        };
      });

    this.trainings
      .filter(training => training.time[dayIndex] !== null)
      .sort((a, b) => {
        const dateA = a.time[dayIndex]!.toDate()!;
        const dateB = b.time[dayIndex]!.toDate()!;
        return (
          dateA.getUTCHours() * 60 +
          dateA.getUTCMinutes() -
          (dateB.getUTCHours() * 60 + dateB.getUTCMinutes())
        );
      })
      .forEach((training, index) => {
        trainingData[index] = {
          name: training.name,
          time: training.time[dayIndex]!,
          status: false,
        };
      });

    for (let i = 1; i <= this.profile.meals; i++) {
      mealsData[i] = {
        type: this.getMealType(i),
        time: this.getMealTime(i),
        status: false,
      };
    }

    const newProgressData: UserProgress = {
      info: {
        date: date,
        exists: false,
      },
      supplements: supplementData,
      trainings: trainingData,
      meals: mealsData,
    };
    this.progress.push(newProgressData);
    this.progress.sort((a, b) => {
      const dateA = new Date(a.info.date);
      const dateB = new Date(b.info.date);
      return dateA.getTime() - dateB.getTime();
    });
    return newProgressData;
  }

  updateDateProgressServe(
    date: string,
    supplementIndex: number,
    serve: number | null,
  ) {
    const progressIndex = this.progress.findIndex(
      item => item.info.date === date,
    );

    if (progressIndex !== -1) {
      this.progress[progressIndex].supplements[supplementIndex].serve = serve;
    }
  }

  async updateDateProgressByChanges(
    changeType: 'EditProfile' | 'AddSupplement' | 'AddTraining',
  ) {
    const today = new Date().toISOString().split('T')[0];
    const dateProgressIndex = this.progress.findIndex(
      item => item.info.date === today,
    );
    if (dateProgressIndex === -1) return;

    const dateProgress = this.progress[dateProgressIndex];
    const updateData: Partial<UserProgress> = {};

    switch (changeType) {
      case 'EditProfile': {
        const newMealsData: ProgressMealsProp = {};
        for (let i = 1; i <= this.profile.meals; i++) {
          const mealData = dateProgress.meals[i];
          newMealsData[i] = {
            type: this.getMealType(i),
            time: this.getMealTime(i),
            status: mealData ? mealData.status : false,
          };
        }
        updateData.meals = newMealsData;
        break;
      }

      case 'AddSupplement': {
        const dayIndex = new Date(today).getUTCDay();
        const newSupplementsData: ProgressSupplementsProp = {};

        this.supplements
          .filter(supplement => supplement.daysServe[dayIndex])
          .sort((a, b) => {
            const dateA = a.timeServe.toDate();
            const dateB = b.timeServe.toDate();
            return (
              dateA.getUTCHours() * 60 +
              dateA.getUTCMinutes() -
              (dateB.getUTCHours() * 60 + dateB.getUTCMinutes())
            );
          })
          .forEach((supplement, index) => {
            const existingSupplement = Object.values(
              dateProgress.supplements,
            ).find(item => item.id === supplement.id);
            const status = existingSupplement
              ? existingSupplement.status
              : false;
            newSupplementsData[index] = {
              id: supplement.id,
              name: supplement.name,
              unit: supplement.unit,
              serve: supplement.serve,
              defaultServe: supplement.serve,
              timeServe: supplement.timeServe,
              status: status,
            };
          });
        updateData.supplements = newSupplementsData;
        break;
      }

      case 'AddTraining': {
        const dayIndex = new Date(today).getUTCDay();
        const newTrainingsData: ProgressTrainingsProp = {};

        this.trainings
          .filter(training => training.time[dayIndex] !== null)
          .sort((a, b) => {
            const dateA = a.time[dayIndex]!.toDate();
            const dateB = b.time[dayIndex]!.toDate();
            return (
              dateA.getUTCHours() * 60 +
              dateA.getUTCMinutes() -
              (dateB.getUTCHours() * 60 + dateB.getUTCMinutes())
            );
          })
          .forEach((training, index) => {
            const existingTraining = Object.values(dateProgress.trainings).find(
              item => item.id === training.id,
            );
            const status = existingTraining ? existingTraining.status : false;
            newTrainingsData[index] = {
              name: training.name,
              time: training.time[dayIndex]!,
              status: status,
            };
          });
        updateData.trainings = newTrainingsData;
        break;
      }

      default:
        break;
    }
    this.progress[dateProgressIndex] = {...dateProgress, ...updateData};
    this.progress = this.progress.filter(item => item.info.exists === true);

    if (dateProgress.info.exists === true) {
      await firestore()
        .collection('users')
        .doc(this.profile.uid)
        .collection('progress')
        .doc(today)
        .update(updateData);
    }
  }

  async updateDateProgress(date: string, stats: UserProgress) {
    const dateProgressIndex = this.progress.findIndex(
      item => item.info.date === date,
    );
    if (dateProgressIndex !== -1) {
      stats.info.exists = true;
      this.progress[dateProgressIndex] = stats;
      try {
        await firestore()
          .collection('users')
          .doc(this.profile.uid)
          .collection('progress')
          .doc(date)
          .set(stats);
      } catch (error) {
        console.error(error);
      }
    }
  }

  async removeDateProgress(date: string) {
    const dateProgressIndex = this.progress.findIndex(
      item => item.info.date === date,
    );
    if (dateProgressIndex !== -1) {
      this.progress[dateProgressIndex].info.exists = false;
      try {
        await firestore()
          .collection('users')
          .doc(this.profile.uid)
          .collection('progress')
          .doc(date)
          .delete();
      } catch (error) {
        console.error(error);
      }
    }
  }

  existsDateProgress(date: string): boolean {
    return !!this.progress.find(item => item.info.date === date);
  }
}
