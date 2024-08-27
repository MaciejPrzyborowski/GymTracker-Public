import notifee, {
  AndroidImportance,
  RepeatFrequency,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';

import DICTIONARY from '../Assets/Lang/PL.json';

export enum NotificationIds {
  DailyDay = '0',
  DailyNight = '1',
}

export const createDailySupplementNotification = async (
  type: NotificationIds,
  time: string,
) => {
  await notifee.requestPermission();
  const channelExists = await notifee.isChannelCreated('daily-notifications');
  if (!channelExists) {
    await notifee.createChannel({
      id: 'daily-notifications',
      name: 'Codzienne powiadomienia',
      importance: AndroidImportance.HIGH,
    });
  }

  const now = new Date(Date.now());

  const [hour, minute] = time.split(':').map(Number);
  const date = new Date(Date.now());
  date.setHours(hour);
  date.setMinutes(minute);
  date.setSeconds(0);

  if (date <= now) {
    date.setDate(date.getDate() + 1);
  }

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: date.getTime(),
    repeatFrequency: RepeatFrequency.DAILY,

    alarmManager: {
      allowWhileIdle: true,
    },
  };
  await notifee.cancelTriggerNotification(type.toString());

  if (type == NotificationIds.DailyDay) {
    await notifee.createTriggerNotification(
      {
        id: type.toString(),
        title: DICTIONARY.NotificationDailySupplement,
        body: DICTIONARY.NotificationDailySupplementMessage_Day,
        android: {
          channelId: 'daily-notifications',
          smallIcon: 'ic_small_icon',
          pressAction: {
            id: 'default',
          },
          importance: AndroidImportance.HIGH,
        },
      },
      trigger,
    );
  } else {
    await notifee.createTriggerNotification(
      {
        id: type.toString(),
        title: DICTIONARY.NotificationDailySupplement,
        body: DICTIONARY.NotificationDailySupplementMessage_Night,
        android: {
          channelId: 'daily-notifications',
          smallIcon: 'ic_small_icon',
          pressAction: {
            id: 'default',
          },
          importance: AndroidImportance.HIGH,
        },
      },
      trigger,
    );
  }
};

export const removeDailySupplementNotification = async (
  type: NotificationIds,
) => {
  await notifee.cancelTriggerNotification(type.toString());
};

export const checkBatteryOptimization = async (): Promise<boolean> => {
  return await notifee.isBatteryOptimizationEnabled();
};

export const openBatteryOptimization = async () => {
  await notifee.openBatteryOptimizationSettings();
};
