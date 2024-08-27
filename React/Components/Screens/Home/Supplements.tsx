import {useCallback, useContext, useState} from 'react';
import {FlatList, Text, TextInput, View} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';

import {AuthStateContext} from '../../../Context/AuthContext';
import {HomeStateContext} from '../../../Context/HomeContext';
import {HomeSupplementsNavigationProps} from '../../../Navigation/Components/HomeNavigation';
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
import {Toast, ALERT_TYPE, Dialog} from 'react-native-alert-notification';

export default function HomeSupplementsScreen({
  navigation,
  route,
}: HomeSupplementsNavigationProps) {
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

  const onCheckBoxSupplementPress = async (supplementId: string) => {
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

      const supplement = updatedStats.supplements[supplementId];
      const supplementRemaining = user.getSupplementValueById(supplement.id);

      if (supplement.serve == null || supplement.serve <= 0) {
        Toast.show({
          type: ALERT_TYPE.WARNING,
          title: DICTIONARY.AlertError,
          textBody: DICTIONARY.AlertErrorMessage_InvalidServe,
        });
        return;
      }
      if (supplement.status || supplementRemaining >= supplement.serve) {
        supplement.status = !supplement.status;
        user.updateSupplementCurrentValue(
          supplement.id,
          supplement.serve,
          supplement.status,
        );
        user.updateStatsSupplements(
          supplement.unit,
          supplement.serve,
          supplement.status,
        );
      } else {
        Toast.show({
          type: ALERT_TYPE.WARNING,
          title: DICTIONARY.AlertError,
          textBody: DICTIONARY.AlertErrorMessage_noRemainingSupplement,
        });
      }

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

  const onServeChange = (text: string, supplementIndex: string) => {
    if (user && dateProgress !== undefined) {
      let newValue: number | undefined | null;

      if (text.trim() === '') {
        newValue = null;
      } else if (isNaN(parseFloat(text))) {
        newValue = undefined;
      } else {
        newValue = parseFloat(text);
      }

      const updatedSupplements = {...dateProgress.supplements};
      const supplement = updatedSupplements[supplementIndex];

      if (supplement) {
        const serveValue =
          newValue !== undefined ? newValue : supplement.defaultServe;
        user.updateDateProgressServe(
          dateSelected,
          parseInt(supplementIndex),
          serveValue,
        );

        const updatedDateProgress = {
          ...dateProgress,
          supplements: {
            ...updatedSupplements,
            [supplementIndex]: {
              ...supplement,
              serve: serveValue,
            },
          },
        };
        setDateProgress(updatedDateProgress);
      }
    }
  };

  if (initializing) {
    return <LoadingStyled />;
  }

  return (
    <View style={STYLES.container}>
      {dateProgress != undefined &&
      dateProgress.supplements != null &&
      Object.entries(dateProgress.supplements).length > 0 ? (
        <FlatList
          data={Object.entries(dateProgress.supplements)}
          renderItem={({item: [supplementIndex, supplement]}) => (
            <View
              key={supplementIndex}
              style={[
                STYLES.cardContainer,
                {
                  borderColor: COLORS.grey,
                },
              ]}>
              <View style={STYLES.centerRowContainer}>
                <View style={{flex: 6}}>
                  <CheckBoxStyled
                    checked={supplement.status}
                    text={supplement.name}
                    onPress={() => onCheckBoxSupplementPress(supplementIndex)}
                  />
                </View>
                <View style={STYLES.defaultFlex}>
                  <TextInput
                    value={
                      supplement.serve !== null
                        ? supplement.serve.toString()
                        : ''
                    }
                    onChangeText={text => onServeChange(text, supplementIndex)}
                    placeholder={supplement.defaultServe.toString()}
                    placeholderTextColor={COLORS.silver}
                    cursorColor={COLORS.grey}
                    editable={!supplement.status}
                    maxLength={5}
                    style={[
                      STYLES.homeInputText,
                      {
                        color:
                          supplement.serve !== supplement.defaultServe
                            ? COLORS.gold
                            : COLORS.white,
                      },
                    ]}
                  />
                </View>
              </View>
              {supplement.timeServe !== null && (
                <View style={STYLES.ribbonRightContainer}>
                  <Text style={STYLES.ribbonText}>
                    {DateUtilities.formatTimeToString(
                      supplement.timeServe.toDate(),
                    )}
                  </Text>
                </View>
              )}
            </View>
          )}
          keyExtractor={([supplementIndex]) => supplementIndex}
          contentContainerStyle={STYLES.flatListTopMargin}
        />
      ) : (
        <View style={STYLES.noContentContainer}>
          <Text style={[STYLES.noContentText]}>
            {DICTIONARY.HomeSupplementsEmpty}
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
