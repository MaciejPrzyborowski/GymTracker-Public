import React, {useCallback, useContext, useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

import {AuthStateContext} from '../../../Context/AuthContext';
import {CompleteTimeWakeUpNavigationProps} from '../../../Navigation/Components/CompleteProfileNavigation';
import ButtonSubmitStyled from '../../Parts/Button';
import DatePickerStyled from '../../Parts/Calendar';
import {TextInputButtonStyled} from '../../Parts/Input';
import LoadingStyled from '../../Parts/Loading';
import StorySetCopyright from '../../Parts/Storyset';
import DateUtilities from '../../../Utilities/DateUtilities';

import STYLES from '../../../Assets/Styles/Styles';
import DICTIONARY from '../../../Assets/Lang/PL.json';

export default function CompleteTimeWakeUpScreen({
  navigation,
}: CompleteTimeWakeUpNavigationProps) {
  const {user, setIsCompletedProfile} = useContext(AuthStateContext);
  const [initializing, setInitializing] = useState<boolean>(true);

  const [timeWakeUp, setTimeWakeUp] = useState<string>('');
  const [submited, setSubmited] = useState<boolean>(false);

  const [timeWakeUpCalendar, setTimeWakeUpCalendar] = useState<boolean>(false);
  const [timeWakeUpDate, setTimeWakeUpDate] = useState<Date>(new Date());

  useFocusEffect(
    useCallback(() => {
      timeWakeUpDate.setUTCHours(7, 0, 0, 0);
      if (user) {
        const timeWakeUpDB = user.getProfile(
          'timeWakeUp',
        ) as FirebaseFirestoreTypes.Timestamp | null;
        if (timeWakeUpDB != null) {
          const timeWakeUpDBDate = new Date(timeWakeUpDB.seconds * 1000);
          setTimeWakeUpDate(timeWakeUpDBDate);
          setTimeWakeUp(DateUtilities.formatTimeToString(timeWakeUpDBDate));
        }
        setInitializing(false);
      }
    }, [navigation]),
  );

  const onButtonPressSave = async () => {
    if (user) {
      setSubmited(true);
      if (timeWakeUp.length > 0) {
        await user.updateProfileTimeWakeUp(
          DateUtilities.formatTimeStringToTimestamp(timeWakeUp),
        );
        navigation.navigate('CompleteTimeSleep');
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
            {DICTIONARY.CompleteProfilTimeWakeUpTitle}
          </Text>
          <Image
            style={STYLES.image}
            source={require('../../../Assets/Images/wakeup.png')}
            resizeMode="contain"
          />
          <View style={STYLES.columnContainer}>
            <View style={{flexDirection: 'row'}}>
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
            </View>
            <ButtonSubmitStyled
              label={DICTIONARY.CompleteProfilTimeWakeUpSave}
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
