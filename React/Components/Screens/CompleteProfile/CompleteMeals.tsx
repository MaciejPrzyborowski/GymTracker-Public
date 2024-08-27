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
import {CompleteMealsNavigationProps} from '../../../Navigation/Components/CompleteProfileNavigation';
import ButtonSubmitStyled from '../../Parts/Button';
import {SegmentButtonsStyled} from '../../Parts/Input';
import LoadingStyled from '../../Parts/Loading';
import StorySetCopyright from '../../Parts/Storyset';
import {MealsValues} from '../../../Utilities/User';

import STYLES from '../../../Assets/Styles/Styles';
import DICTIONARY from '../../../Assets/Lang/PL.json';

export default function CompleteMealsScreen({
  navigation,
}: CompleteMealsNavigationProps) {
  const {user} = useContext(AuthStateContext);
  const [initializing, setInitializing] = useState<boolean>(true);

  const [meals, setMeals] = useState<string>('');
  const [submited, setSubmited] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      if (user) {
        const mealsDB = user.getProfile('meals') as number;
        setMeals(mealsDB.toString());
        setInitializing(false);
      }
    }, [navigation]),
  );

  const onButtonPressSave = async () => {
    if (user) {
      setSubmited(true);
      if (MealsValues.includes(meals)) {
        await user.updateProfileMeals(parseInt(meals));
        navigation.navigate('CompleteTimeWakeUp');
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
            {DICTIONARY.CompleteProfilMealsTitle}
          </Text>
          <Image
            style={STYLES.image}
            source={require('../../../Assets/Images/meals.png')}
            resizeMode="contain"
          />
          <View style={STYLES.columnContainer}>
            <View style={{flexDirection: 'row'}}>
              <SegmentButtonsStyled
                setValue={setMeals}
                label={DICTIONARY.ProfileMeals}
                value={meals}
                buttons={MealsValues.map(value => ({
                  value,
                  label: value,
                }))}
                error={submited && !MealsValues.includes(meals)}
                showLabel={false}
              />
            </View>
            <ButtonSubmitStyled
              label={DICTIONARY.CompleteProfilMealsSave}
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
