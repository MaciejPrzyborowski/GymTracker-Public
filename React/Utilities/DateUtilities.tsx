import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

export default class DateUtilities {
  static formatDateToString(date: Date): string {
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear().toString();
    return `${day}.${month}.${year}`;
  }

  static formatDateStringToTimestamp(
    str: string,
  ): FirebaseFirestoreTypes.Timestamp {
    const [day, month, year] = str.split('.').map(Number);
    const timestamp = firestore.Timestamp.fromDate(
      new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0)),
    );
    return timestamp;
  }

  static formatDateUTCStringToTimestamp(
    str: string,
  ): FirebaseFirestoreTypes.Timestamp {
    const [year, month, day] = str.split('-').map(Number);
    const timestamp = firestore.Timestamp.fromDate(
      new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0)),
    );
    return timestamp;
  }

  static formatDateAndTimeToString(date: Date): string {
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear().toString();
    const hour = date.getUTCHours().toString().padStart(2, '0');
    const minute = date.getUTCMinutes().toString().padStart(2, '0');
    return `${day}.${month}.${year} ${hour}:${minute}`;
  }

  static formatTimeToString(date: Date): string {
    const hour = date.getUTCHours().toString().padStart(2, '0');
    const minute = date.getUTCMinutes().toString().padStart(2, '0');
    return `${hour}:${minute}`;
  }

  static formatTimeStringToTimestamp(
    str: string,
  ): FirebaseFirestoreTypes.Timestamp {
    const [hour, minute] = str.split(':').map(Number);
    const currentDate = new Date();
    currentDate.setUTCHours(hour, minute, 0, 0);
    return firestore.Timestamp.fromDate(currentDate);
  }

  static formatTimestampToString(
    date: FirebaseFirestoreTypes.Timestamp,
  ): string {
    return date.toDate().toLocaleDateString('pl', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  static formatTimestampToStringWithTime(
    date: FirebaseFirestoreTypes.Timestamp,
  ): string {
    return date
      .toDate()
      .toLocaleDateString('pl', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
      .replace(',', '');
  }

  static formatInvalidTimestamp(): FirebaseFirestoreTypes.Timestamp {
    return firestore.Timestamp.fromMillis(0);
  }

  static calculateAge(birthday: FirebaseFirestoreTypes.Timestamp): number {
    const currentDate = new Date();
    const birthDate = birthday.toDate();

    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthsDiff = currentDate.getMonth() - birthDate.getMonth();

    if (
      monthsDiff < 0 ||
      (monthsDiff === 0 && currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }

  static isValidTimestamp(
    timestamp: FirebaseFirestoreTypes.Timestamp,
  ): boolean {
    return !timestamp.isEqual(firestore.Timestamp.fromMillis(0));
  }
}
