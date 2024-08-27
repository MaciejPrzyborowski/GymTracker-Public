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
import {CompleteNameNavigationProps} from '../../../Navigation/Components/CompleteProfileNavigation';
import ButtonSubmitStyled from '../../Parts/Button';
import TextInputStyled from '../../Parts/Input';
import LoadingStyled from '../../Parts/Loading';
import StorySetCopyright from '../../Parts/Storyset';

import STYLES from '../../../Assets/Styles/Styles';
import DICTIONARY from '../../../Assets/Lang/PL.json';

export default function CompleteNameScreen({
  navigation,
}: CompleteNameNavigationProps) {
  const {user} = useContext(AuthStateContext);
  const [initializing, setInitializing] = useState<boolean>(true);

  const [name, setName] = useState<string>('');
  const [submited, setSubmited] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      if (user) {
        const nameDB = user.getProfile('name') as string;
        setName(nameDB);
        setInitializing(false);
      }
    }, [navigation]),
  );

  const onButtonPressSave = async () => {
    if (user) {
      const trimmedName = name.trim();
      setSubmited(true);
      if (trimmedName.length > 0) {
        await user.updateProfileName(trimmedName);
        navigation.navigate('CompleteGender');
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
            {DICTIONARY.CompleteProfilNameTitle}
          </Text>
          <Image
            style={STYLES.image}
            source={require('../../../Assets/Images/name.png')}
            resizeMode="contain"
          />
          <View style={STYLES.columnContainer}>
            <View style={{flexDirection: 'row'}}>
              <TextInputStyled
                setValue={setName}
                label={DICTIONARY.ProfileName}
                placeholder={
                  (user?.getProfile('name') as string) ||
                  DICTIONARY.CompleteProfilNameTitle
                }
                value={name}
                error={submited && name.trim().length === 0}
                autoComplete="name"
                textContentType="name"
              />
            </View>
            <ButtonSubmitStyled
              label={DICTIONARY.CompleteProfilNameSave}
              onPress={onButtonPressSave}
            />
            <Text style={STYLES.textInfo}>
              {DICTIONARY.CompleteProfilNameInfo}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <StorySetCopyright hide={submited} />
    </ScrollView>
  );
}
