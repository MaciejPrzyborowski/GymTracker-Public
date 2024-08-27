import React, {useCallback, useContext, useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';

import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {useFocusEffect} from '@react-navigation/native';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

import {AuthStateContext} from '../../../Context/AuthContext';
import {CompleteTimeSleepNavigationProps} from '../../../Navigation/Components/CompleteProfileNavigation';
import ButtonSubmitStyled from '../../Parts/Button';
import DatePickerStyled from '../../Parts/Calendar';
import {TextInputButtonStyled} from '../../Parts/Input';
import LoadingStyled from '../../Parts/Loading';
import StorySetCopyright from '../../Parts/Storyset';
import DateUtilities from '../../../Utilities/DateUtilities';

import STYLES from '../../../Assets/Styles/Styles';
import DICTIONARY from '../../../Assets/Lang/PL.json';

export default function CompleteTimeSleepScreen({
  navigation,
}: CompleteTimeSleepNavigationProps) {
  const {user, setIsCompletedProfile} = useContext(AuthStateContext);
  const [initializing, setInitializing] = useState<boolean>(true);

  const [timeWakeUp, setTimeWakeUp] = useState<string>('');
  const [timeSleep, setTimeSleep] = useState<string>('');
  const [submited, setSubmited] = useState<boolean>(false);

  const [timeSleepCalendar, setTimeSleepCalendar] = useState<boolean>(false);
  const [timeSleepDate, setTimeSleepDate] = useState<Date>(new Date());

  useFocusEffect(
    useCallback(() => {
      timeSleepDate.setUTCHours(23, 0, 0, 0);
      if (user) {
        const timeWakeUpDB = user.getProfile(
          'timeWakeUp',
        ) as FirebaseFirestoreTypes.Timestamp | null;
        const timeSleepDB = user.getProfile(
          'timeSleep',
        ) as FirebaseFirestoreTypes.Timestamp | null;
        if (timeWakeUpDB != null) {
          const timeWakeUpDBDate = new Date(timeWakeUpDB.seconds * 1000);
          setTimeWakeUp(DateUtilities.formatTimeToString(timeWakeUpDBDate));
        }
        if (timeSleepDB != null) {
          const timeSleepDBDate = new Date(timeSleepDB.seconds * 1000);
          setTimeSleepDate(timeSleepDBDate);
          setTimeSleep(DateUtilities.formatTimeToString(timeSleepDBDate));
        }
        setInitializing(false);
      }
    }, [navigation]),
  );

  const onButtonPressSave = async () => {
    if (user) {
      setSubmited(true);
      if (timeSleep.length > 0) {
        const wakeUpTimestamp =
          DateUtilities.formatTimeStringToTimestamp(timeWakeUp);
        const sleepTimestamp =
          DateUtilities.formatTimeStringToTimestamp(timeSleep);
        const minDurationMs = 4 * 60 * 60 * 1000;

        if (
          sleepTimestamp.toMillis() - wakeUpTimestamp.toMillis() >=
          minDurationMs
        ) {
          await user.updateProfileTimeSleep(
            DateUtilities.formatTimeStringToTimestamp(timeSleep),
          );
          await user.updateProfileCompleted(true);
          setIsCompletedProfile(true);
        } else {
          navigation.navigate('CompleteTimeWakeUp');
          Toast.show({
            type: ALERT_TYPE.WARNING,
            title: DICTIONARY.AlertError,
            textBody: DICTIONARY.AlertErrorMessage_InvalidSleepTime,
          });
        }
      }
    }
  };

  if (initializing) {
    return <LoadingStyled />;
  }

  return (
    <ScrollView
      style={STYLES.container}
      contentContainerStyle={STYLES.centerContentContainer}
      showsVerticalScrollIndicator={false}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Text style={STYLES.textTitleHeader}>
            {DICTIONARY.CompleteProfilTimeSleepTitle}
          </Text>
          <Image
            style={STYLES.image}
            source={require('../../../Assets/Images/sleep.png')}
            resizeMode="contain"
          />
          <View style={STYLES.columnContainer}>
            <View style={{flexDirection: 'row'}}>
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
            </View>
            <ButtonSubmitStyled
              label={DICTIONARY.CompleteProfilTimeSleepSave}
              onPress={onButtonPressSave}
            />
            <Text style={STYLES.textInfo}>
              {DICTIONARY.CompleteProfilParametersInfo}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <StorySetCopyright hide={submited} />
    </ScrollView>
  );
}
