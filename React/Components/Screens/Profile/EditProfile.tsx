import React, {useState, useContext, useCallback} from 'react';
import {ScrollView} from 'react-native';

import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {useFocusEffect} from '@react-navigation/native';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

import {AuthStateContext} from '../../../Context/AuthContext';
import {EditProfileNavigationProps} from '../../../Navigation/Components/ProfileNavigation';
import AlertStyled from '../../Parts/Alert';
import ButtonSubmitStyled from '../../Parts/Button';
import DatePickerStyled from '../../Parts/Calendar';
import LoadingStyled from '../../Parts/Loading';
import TextInputStyled, {
  SegmentButtonsStyled,
  TextInputButtonStyled,
} from '../../Parts/Input';
import DateUtilities from '../../../Utilities/DateUtilities';
import {
  NotificationIds,
  checkBatteryOptimization,
  createDailySupplementNotification,
  openBatteryOptimization,
  removeDailySupplementNotification,
} from '../../../Utilities/Notification';
import {
  GenderType,
  MealsValues,
  NotificationType,
} from '../../../Utilities/User';

import COLORS from '../../../Assets/Styles/Colors.json';
import STYLES from '../../../Assets/Styles/Styles';
import DICTIONARY from '../../../Assets/Lang/PL.json';

export default function EditProfileScreen({
  navigation,
}: EditProfileNavigationProps) {
  const {user} = useContext(AuthStateContext);
  const [initializing, setInitializing] = useState<boolean>(true);

  const [name, setName] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');
  const [gender, setGender] = useState<GenderType>(GenderType.None);
  const [meals, setMeals] = useState<string>('');
  const [timeWakeUp, setTimeWakeUp] = useState<string>('');
  const [timeSleep, setTimeSleep] = useState<string>('');
  const [dailyDayNotifications, setDailyDayNotifications] =
    useState<NotificationType>(NotificationType.No);
  const [dailyNightNotifications, setDailyNightNotifications] =
    useState<NotificationType>(NotificationType.No);
  const [submited, setSubmited] = useState<boolean>(false);

  const [birthdayCalendar, setBirthdayCalendar] = useState<boolean>(false);
  const [timeWakeUpCalendar, setTimeWakeUpCalendar] = useState<boolean>(false);
  const [timeSleepCalendar, setTimeSleepCalendar] = useState<boolean>(false);
  const [birthdayDate, setBirthdayDate] = useState<Date>(new Date());
  const [timeWakeUpDate, setTimeWakeUpDate] = useState<Date>(new Date());
  const [timeSleepDate, setTimeSleepDate] = useState<Date>(new Date());
  const [dialogProgressVisible, setDialogProgressVisible] =
    useState<boolean>(false);
  const [dialogBatteryVisible, setDialogBatteryVisible] =
    useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      timeWakeUpDate.setUTCHours(7, 0, 0, 0);
      timeSleepDate.setUTCHours(23, 0, 0, 0);
      if (user) {
        const nameDB = user.getProfile('name') as string;
        const genderDB = user.getProfile('gender') as number;
        const birthdayDB = user.getProfile(
          'birthday',
        ) as FirebaseFirestoreTypes.Timestamp | null;
        const mealsDB = user.getProfile('meals') as number;
        const timeWakeUpDB = user.getProfile(
          'timeWakeUp',
        ) as FirebaseFirestoreTypes.Timestamp | null;
        const timeSleepDB = user.getProfile(
          'timeSleep',
        ) as FirebaseFirestoreTypes.Timestamp | null;
        const dailyDayNotificationsDB = user.getProfile(
          'dailyDayNotifications',
        ) as boolean;
        const dailyNightNotificationsDB = user.getProfile(
          'dailyNightNotifications',
        ) as boolean;

        setName(nameDB);
        setGender(genderDB);
        setMeals(mealsDB.toString());
        if (birthdayDB != null) {
          const birthdayDBDate = new Date(birthdayDB.seconds * 1000);
          setBirthdayDate(birthdayDBDate);
          setBirthday(DateUtilities.formatDateToString(birthdayDBDate));
        }
        if (timeWakeUpDB != null) {
          const timeWakeUpDBDate = new Date(timeWakeUpDB.seconds * 1000);
          setTimeWakeUpDate(timeWakeUpDBDate);
          setTimeWakeUp(DateUtilities.formatTimeToString(timeWakeUpDBDate));
        }
        if (timeSleepDB != null) {
          const timeSleepDBDate = new Date(timeSleepDB.seconds * 1000);
          setTimeSleepDate(timeSleepDBDate);
          setTimeSleep(DateUtilities.formatTimeToString(timeSleepDBDate));
        }
        if (dailyDayNotificationsDB == true) {
          setDailyDayNotifications(NotificationType.Yes);
        } else {
          setDailyDayNotifications(NotificationType.No);
        }
        if (dailyNightNotificationsDB == true) {
          setDailyNightNotifications(NotificationType.Yes);
        } else {
          setDailyNightNotifications(NotificationType.No);
        }
        setInitializing(false);
      }
    }, [navigation]),
  );

  const onButtonPressSave = async () => {
    if (user) {
      setSubmited(true);
      const trimmedName = name.trim();
      if (
        trimmedName.length > 0 &&
        gender !== GenderType.None &&
        birthday.length > 0 &&
        MealsValues.includes(meals) &&
        timeWakeUp.length > 0 &&
        timeSleep.length > 0 &&
        Object.values(NotificationType).includes(dailyDayNotifications) &&
        Object.values(NotificationType).includes(dailyNightNotifications)
      ) {
        const wakeUpTimestamp =
          DateUtilities.formatTimeStringToTimestamp(timeWakeUp);
        const sleepTimestamp =
          DateUtilities.formatTimeStringToTimestamp(timeSleep);
        const minDurationMs = 4 * 60 * 60 * 1000;
        if (
          sleepTimestamp.toMillis() - wakeUpTimestamp.toMillis() >=
          minDurationMs
        ) {
          const dayNotifications =
            dailyDayNotifications === NotificationType.Yes;
          const nightNotifications =
            dailyNightNotifications === NotificationType.Yes;
          if (dailyDayNotifications) {
            createDailySupplementNotification(
              NotificationIds.DailyDay,
              timeWakeUp,
            );
          } else {
            removeDailySupplementNotification(NotificationIds.DailyDay);
          }
          if (dailyNightNotifications) {
            createDailySupplementNotification(
              NotificationIds.DailyNight,
              timeSleep,
            );
          } else {
            removeDailySupplementNotification(NotificationIds.DailyNight);
          }
          try {
            await user.updateProfile({
              name: trimmedName,
              gender: gender,
              birthday: DateUtilities.formatDateStringToTimestamp(birthday),
              meals: parseInt(meals),
              timeWakeUp: DateUtilities.formatTimeStringToTimestamp(timeWakeUp),
              timeSleep: DateUtilities.formatTimeStringToTimestamp(timeSleep),
              dailyDayNotifications: dayNotifications,
              dailyNightNotifications: nightNotifications,
            });
          } finally {
            await checkProgressData();
          }
        } else {
          Toast.show({
            type: ALERT_TYPE.WARNING,
            title: DICTIONARY.AlertError,
            textBody: DICTIONARY.AlertErrorMessage_InvalidSleepTime,
          });
        }
      }
    }
  };

  const checkProgressData = async () => {
    if (user) {
      const today = new Date().toISOString().split('T')[0];
      const dateProgressExist = user.existsDateProgress(today);
      if (dateProgressExist) {
        setDialogProgressVisible(true);
      } else {
        navigation.reset({
          index: 0,
          routes: [{name: 'MyProfile', params: {editedProfile: true}}],
        });
      }
    }
  };

  const onDialogBatteryAccept = async () => {
    setDialogBatteryVisible(false);
    await openBatteryOptimization();
  };

  const onDialogBatteryCancel = () => {
    setDialogBatteryVisible(false);
  };

  const onDialogProgressAccept = async () => {
    setDialogProgressVisible(false);
    if (user) {
      await user.updateDateProgressByChanges('EditProfile');
      navigation.reset({
        index: 0,
        routes: [{name: 'MyProfile', params: {editedProfile: true}}],
      });
    }
  };

  const onDialogProgressCancel = () => {
    setDialogProgressVisible(false);
    navigation.reset({
      index: 0,
      routes: [{name: 'MyProfile', params: {editedProfile: true}}],
    });
  };

  if (initializing) {
    return <LoadingStyled />;
  }

  return (
    <ScrollView
      contentContainerStyle={STYLES.contentContainer}
      style={STYLES.container}>
      <TextInputStyled
        setValue={setName}
        label={DICTIONARY.ProfileName}
        placeholder={(user?.getProfile('name') as string) || ''}
        value={name}
        error={submited && name.trim().length === 0}
        autoComplete="name"
        textContentType="name"
      />
      <SegmentButtonsStyled
        setValue={(value: string) => setGender(parseInt(value))}
        label={DICTIONARY.ProfileGender}
        value={gender.toString()}
        buttons={[
          {
            value: GenderType.Female.toString(),
            label: DICTIONARY.ProfileGenderFemale,
            icon: 'gender-female',
          },
          {
            value: GenderType.Male.toString(),
            label: DICTIONARY.ProfileGenderMale,
            icon: 'gender-male',
          },
        ]}
        error={submited && gender === GenderType.None}
      />
      <TextInputButtonStyled
        onPressIn={() => setBirthdayCalendar(true)}
        label={DICTIONARY.ProfileBirthday}
        value={birthday}
        error={submited && birthday.length === 0}
      />
      <DatePickerStyled
        onConfirm={date => {
          setBirthdayCalendar(false);
          setBirthday(DateUtilities.formatDateToString(date));
          setBirthdayDate(date);
        }}
        title={DICTIONARY.ProfileBirthday}
        date={birthdayDate}
        mode="date"
        open={birthdayCalendar}
        onCancel={() => {
          setBirthdayCalendar(false);
        }}
      />
      <SegmentButtonsStyled
        setValue={setMeals}
        label={DICTIONARY.ProfileMeals}
        value={meals}
        buttons={MealsValues.map(value => ({
          value,
          label: value,
        }))}
        error={submited && !MealsValues.includes(meals)}
      />
      <TextInputButtonStyled
        onPressIn={() => setTimeWakeUpCalendar(true)}
        label={DICTIONARY.ProfileWakeUp}
        value={timeWakeUp}
        error={submited && timeWakeUp.length === 0}
      />
      <DatePickerStyled
        onConfirm={date => {
          setTimeWakeUpCalendar(false);
          setTimeWakeUp(DateUtilities.formatTimeToString(date));
          setTimeWakeUpDate(date);
        }}
        title={DICTIONARY.ProfileWakeUp}
        date={timeWakeUpDate}
        mode="time"
        open={timeWakeUpCalendar}
        onCancel={() => {
          setTimeWakeUpCalendar(false);
        }}
      />
      <TextInputButtonStyled
        onPressIn={() => setTimeSleepCalendar(true)}
        label={DICTIONARY.ProfileSleep}
        value={timeSleep}
        error={submited && timeSleep.length === 0}
      />
      <DatePickerStyled
        onConfirm={date => {
          setTimeSleepCalendar(false);
          setTimeSleep(DateUtilities.formatTimeToString(date));
          setTimeSleepDate(date);
        }}
        title={DICTIONARY.ProfileSleep}
        date={timeSleepDate}
        mode="time"
        open={timeSleepCalendar}
        onCancel={() => {
          setTimeSleepCalendar(false);
        }}
      />
      <SegmentButtonsStyled
        setValue={async (value: string) => {
          setDailyDayNotifications(parseInt(value));
          if (value == NotificationType.Yes.toString()) {
            const enabled = await checkBatteryOptimization();
            if (enabled) {
              setDialogBatteryVisible(true);
            }
          }
        }}
        label={DICTIONARY.ProfileDailyDayNotification}
        value={dailyDayNotifications.toString()}
        buttons={[
          {
            value: NotificationType.No.toString(),
            label: DICTIONARY.no,
            icon: 'alarm-off',
          },
          {
            value: NotificationType.Yes.toString(),
            label: DICTIONARY.yes,
            icon: 'alarm-check',
          },
        ]}
        error={
          submited &&
          !Object.values(NotificationType).includes(dailyDayNotifications)
        }
      />
      <SegmentButtonsStyled
        setValue={async (value: string) => {
          setDailyNightNotifications(parseInt(value));
          if (value == NotificationType.Yes.toString()) {
            const enabled = await checkBatteryOptimization();
            if (enabled) {
              setDialogBatteryVisible(true);
            }
          }
        }}
        label={DICTIONARY.ProfileDailyNightNotification}
        value={dailyNightNotifications.toString()}
        buttons={[
          {
            value: NotificationType.No.toString(),
            label: DICTIONARY.no,
            icon: 'alarm-off',
          },
          {
            value: NotificationType.Yes.toString(),
            label: DICTIONARY.yes,
            icon: 'alarm-check',
          },
        ]}
        error={
          submited &&
          !Object.values(NotificationType).includes(dailyNightNotifications)
        }
      />
      <ButtonSubmitStyled
        label={DICTIONARY.ProfileSave}
        onPress={onButtonPressSave}
      />
      <AlertStyled
        icon={'progress-alert'}
        iconColor={COLORS.male}
        title={DICTIONARY.AlertQuestion_TitleProgressInsert}
        description={DICTIONARY.AlertQuestion_MessageProgressInsert}
        visible={dialogProgressVisible}
        onDialogAccept={onDialogProgressAccept}
        onDialogCancel={onDialogProgressCancel}
        onDialogDismiss={undefined}
      />
      <AlertStyled
        icon={'battery-alert'}
        iconColor={COLORS.red}
        title={DICTIONARY.AlertQuestion_TitleBatteryOptimization}
        description={DICTIONARY.AlertQuestion_MessageBatteryOptimization}
        visible={dialogBatteryVisible}
        onDialogAccept={onDialogBatteryAccept}
        onDialogCancel={onDialogBatteryCancel}
        onDialogDismiss={onDialogBatteryCancel}
        dialogAcceptText={DICTIONARY.AlertButtonAccept_BatteryOptimization}
        dialogCancelText={DICTIONARY.skip}
      />
    </ScrollView>
  );
}
