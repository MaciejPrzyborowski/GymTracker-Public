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

import {AuthStateContext} from '../../../Context/AuthContext';
import {CompleteGenderNavigationProps} from '../../../Navigation/Components/CompleteProfileNavigation';
import ButtonSubmitStyled from '../../Parts/Button';
import {SegmentButtonsStyled} from '../../Parts/Input';
import LoadingStyled from '../../Parts/Loading';
import StorySetCopyright from '../../Parts/Storyset';
import {GenderType} from '../../../Utilities/User';

import STYLES from '../../../Assets/Styles/Styles';
import DICTIONARY from '../../../Assets/Lang/PL.json';

export default function CompleteGenderScreen({
  navigation,
}: CompleteGenderNavigationProps) {
  const {user} = useContext(AuthStateContext);
  const [initializing, setInitializing] = useState<boolean>(true);

  const [gender, setGender] = useState<GenderType>(GenderType.None);
  const [submited, setSubmited] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      if (user) {
        const genderDB = user.getProfile('gender') as number;
        setGender(genderDB);
        setInitializing(false);
      }
    }, [navigation]),
  );

  const onButtonPressSave = async () => {
    if (user) {
      setSubmited(true);
      if (gender !== GenderType.None) {
        await user.updateProfileGender(gender);
        navigation.navigate('CompleteBirthday');
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
            {DICTIONARY.CompleteProfilGenderTitle}
          </Text>
          <Image
            style={STYLES.image}
            source={require('../../../Assets/Images/gender.png')}
            resizeMode="contain"
          />
          <View style={STYLES.columnContainer}>
            <View style={{flexDirection: 'row'}}>
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
                showLabel={false}
              />
            </View>
            <ButtonSubmitStyled
              label={DICTIONARY.CompleteProfilGenderSave}
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
