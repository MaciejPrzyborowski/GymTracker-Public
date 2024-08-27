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
import {CompleteBirthdayNavigationProps} from '../../../Navigation/Components/CompleteProfileNavigation';
import ButtonSubmitStyled from '../../Parts/Button';
import DatePickerStyled from '../../Parts/Calendar';
import {TextInputButtonStyled} from '../../Parts/Input';
import LoadingStyled from '../../Parts/Loading';
import StorySetCopyright from '../../Parts/Storyset';
import DateUtilities from '../../../Utilities/DateUtilities';

import STYLES from '../../../Assets/Styles/Styles';
import DICTIONARY from '../../../Assets/Lang/PL.json';

export default function CompleteBirthdayScreen({
  navigation,
}: CompleteBirthdayNavigationProps) {
  const {user} = useContext(AuthStateContext);
  const [initializing, setInitializing] = useState<boolean>(true);

  const [birthday, setBirthday] = useState<string>('');
  const [submited, setSubmited] = useState<boolean>(false);

  const [birthdayCalendar, setBirthdayCalendar] = useState<boolean>(false);
  const [birthdayDate, setBirthdayDate] = useState<Date>(new Date());

  useFocusEffect(
    useCallback(() => {
      if (user) {
        const birthdayDB = user.getProfile(
          'birthday',
        ) as FirebaseFirestoreTypes.Timestamp | null;
        if (birthdayDB != null) {
          const birthdayDBDate = new Date(birthdayDB.seconds * 1000);
          setBirthdayDate(birthdayDBDate);
          setBirthday(DateUtilities.formatDateToString(birthdayDBDate));
        }
        setInitializing(false);
      }
    }, [navigation]),
  );

  const onButtonPressSave = async () => {
    if (user) {
      setSubmited(true);
      if (birthday.length > 0) {
        await user.updateProfileBirthday(
          DateUtilities.formatDateStringToTimestamp(birthday),
        );
        navigation.navigate('CompleteMeals');
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
            {DICTIONARY.CompleteProfilBirthdayTitle}
          </Text>
          <Image
            style={STYLES.image}
            source={require('../../../Assets/Images/birthday.png')}
            resizeMode="contain"
          />
          <View style={STYLES.columnContainer}>
            <View style={{flexDirection: 'row'}}>
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
            </View>
            <ButtonSubmitStyled
              label={DICTIONARY.CompleteProfilBirthdaySave}
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
