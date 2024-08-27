import firestore, {firebase} from '@react-native-firebase/firestore';

import {
  FirestoreUser,
  User,
  UserMeasure,
  UserProgress,
  UserSupplement,
  UserTraining,
} from './User';

export interface GoogleUserProps {
  id: string;
  name: string | null;
  email: string;
  photo: string | null;
  familyName: string | null;
  givenName: string | null;
}

export async function createUser(
  uid: string,
  email: string | null,
  name: string | null,
): Promise<User> {
  const newUser: FirestoreUser = {
    profile: {
      uid,
      email: email || '',
      name: name || '',
      gender: 0,
      birthday: null,
      meals: 3,
      timeWakeUp: null,
      timeSleep: null,
      dailyDayNotifications: false,
      dailyNightNotifications: false,
      completed: false,
    },
    stats: {
      supplementsConsumed: 0,
      gramsOfSupplementsConsumed: 0,
      piecesOfSupplementsConsumed: 0,
      trainingsCompleted: 0,
      mealsConsumed: 0,
    },
  };
  const user = new User(newUser.profile, newUser.stats, [], [], [], []);

  try {
    await firestore().collection('users').doc(uid).set(newUser);
  } catch (error) {
    console.error(error);
  }
  return user;
}

export async function deleteUser(uid: string): Promise<boolean> {
  const user = firebase.auth().currentUser;
  if (user && uid == user.uid) {
    try {
      await user.delete();

      const collections = ['measures', 'progress', 'supplements', 'trainings'];
      await Promise.all(
        collections.map(async collectionName => {
          const collectionSnapshot = await firestore()
            .collection('users')
            .doc(uid)
            .collection(collectionName)
            .get();
          if (!collectionSnapshot.empty) {
            collectionSnapshot.forEach(doc => {
              doc.ref.delete();
            });
          }
        }),
      );
      await firestore().collection('users').doc(uid).delete();
      return true;
    } catch (error) {
      return false;
    }
  }
  return false;
}

export function getUserProvider(): string | null {
  const user = firebase.auth().currentUser;
  if (user) {
    return user.providerData[0].providerId;
  }
  return null;
}

export async function getUserData(uid: string): Promise<User> {
  try {
    const [
      userSnapshot,
      measuresSnapshot,
      supplementsSnapshot,
      trainingsSnapshot,
      progressSnapshot,
    ] = await Promise.all([
      firestore().doc(`users/${uid}`).get(),
      firestore().collection(`users/${uid}/measures`).get(),
      firestore().collection(`users/${uid}/supplements`).get(),
      firestore().collection(`users/${uid}/trainings`).get(),
      firestore().collection(`users/${uid}/progress`).get(),
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

    const user = new User(
      userData.profile,
      userData.stats,
      measuresData,
      supplementsData,
      trainingsData,
      progressData,
    );

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function isUserExist(uid: string) {
  try {
    const documentSnapshot = await firestore()
      .collection('users')
      .doc(uid)
      .get();
    return documentSnapshot.exists;
  } catch (error) {
    console.error(error);
  }
}
