import {useCallback, useContext, useState} from 'react';
import {FlatList, Text, View} from 'react-native';

import {Toast, ALERT_TYPE, Dialog} from 'react-native-alert-notification';
import {useFocusEffect} from '@react-navigation/native';

import {AuthStateContext} from '../../../Context/AuthContext';
import {HomeStateContext} from '../../../Context/HomeContext';
import {HomeTrainingsNavigationProps} from '../../../Navigation/Components/HomeNavigation';
import CheckBoxStyled from '../../Parts/CheckBox';
import LoadingStyled from '../../Parts/Loading';
import DateUtilities from '../../../Utilities/DateUtilities';
import HomeUtilities from '../../../Utilities/HomeUtilities';
import Icon from '../../../Utilities/Icons';
import {UserProgress} from '../../../Utilities/User';

import COLORS from '../../../Assets/Styles/Colors.json';
import SIZES from '../../../Assets/Styles/Sizes.json';
import STYLES from '../../../Assets/Styles/Styles';
import DICTIONARY from '../../../Assets/Lang/PL.json';

export default function HomeTrainingsScreen({
  navigation,
  route,
}: HomeTrainingsNavigationProps) {
  const {user} = useContext(AuthStateContext);
  const {dateSelected} = useContext(HomeStateContext);
  const [initializing, setInitializing] = useState<boolean>(true);

  const [dateProgress, setDateProgress] = useState<UserProgress>();

  useFocusEffect(
    useCallback(() => {
      if (user) {
        const progressDB = user.getDateProgress(dateSelected);
        setDateProgress(progressDB);
        setInitializing(false);
      }
    }, [user, dateSelected]),
  );

  const onCheckBoxTrainingPress = async (trainingId: string) => {
    if (user && dateProgress !== undefined) {
      const today = new Date().toISOString().split('T')[0];
      if (dateSelected > today) {
        Toast.show({
          type: ALERT_TYPE.WARNING,
          title: DICTIONARY.AlertError,
          textBody: DICTIONARY.AlertErrorMessage_WrongDate,
        });
        return;
      }
      let updatedStats: UserProgress = {...dateProgress};

      const trainingIndex = Number(trainingId);
      updatedStats.trainings[trainingIndex].status =
        !updatedStats.trainings[trainingIndex].status;
      await user.updateStatsTraining(
        updatedStats.trainings[trainingIndex].status,
      );

      if (HomeUtilities.areAllValuesFalse(updatedStats)) {
        if (dateProgress.info.exists) {
          await user.removeDateProgress(dateSelected);
        }
      } else {
        await user.updateDateProgress(dateSelected, updatedStats);
        if (HomeUtilities.areAllValuesTrue(updatedStats)) {
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: DICTIONARY.AlertCongrats,
            textBody: DICTIONARY.AlertCongratsMessage_DailyGoal,
            button: DICTIONARY.AlertClose,
          });
        }
      }
      setDateProgress(updatedStats);
    }
  };

  if (initializing) {
    return <LoadingStyled />;
  }

  return (
    <View style={STYLES.container}>
      {dateProgress !== undefined &&
      dateProgress.trainings != null &&
      Object.entries(dateProgress.trainings).length > 0 ? (
        <FlatList
          data={Object.entries(dateProgress.trainings)}
          renderItem={({item: [trainingIndex, training]}) => (
            <View
              key={trainingIndex}
              style={[
                STYLES.cardContainer,
                {
                  borderColor: COLORS.grey,
                },
              ]}>
              <CheckBoxStyled
                checked={training.status}
                text={training.name}
                onPress={() => onCheckBoxTrainingPress(trainingIndex)}
              />
              {training.time !== null && (
                <View style={STYLES.ribbonRightContainer}>
                  <Text style={STYLES.ribbonText}>
                    {DateUtilities.formatTimeToString(training.time.toDate())}
                  </Text>
                </View>
              )}
            </View>
          )}
          keyExtractor={([trainingIndex]) => trainingIndex}
          contentContainerStyle={STYLES.flatListTopMargin}
        />
      ) : (
        <View style={STYLES.noContentContainer}>
          <Text style={[STYLES.noContentText]}>
            {DICTIONARY.HomeTrainingsEmpty}
          </Text>
          <Icon
            type="MaterialCommunityIcons"
            name="check-all"
            color={COLORS.inputTextDefault}
            size={SIZES.iconEmptySize}
            style={{top: SIZES.iconEmptyTop / 2}}
          />
        </View>
      )}
    </View>
  );
}
