import {useCallback, useContext, useEffect, useState} from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
} from 'react-native';

import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {useFocusEffect} from '@react-navigation/native';

import {AuthStateContext} from '../../../Context/AuthContext';
import {MyTrainingsNavigationProps} from '../../../Navigation/Components/TrainingNavigation';
import AlertStyled from '../../Parts/Alert';
import FloatingButton from '../../Parts/FloatingButton';
import LoadingStyled from '../../Parts/Loading';
import TrainingList from '../../Parts/TrainingList';
import Icon from '../../../Utilities/Icons';
import {GenderType, UserTraining} from '../../../Utilities/User';

import COLORS from '../../../Assets/Styles/Colors.json';
import SIZES from '../../../Assets/Styles/Sizes.json';
import STYLES from '../../../Assets/Styles/Styles';
import DICTIONARY from '../../../Assets/Lang/PL.json';

export default function TrainingsScreen({
  navigation,
  route,
}: MyTrainingsNavigationProps) {
  const {user} = useContext(AuthStateContext);
  const [initializing, setInitializing] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [refreshState, setRefreshState] = useState<number>(0);

  const [trainings, setTrainings] = useState<UserTraining[]>([]);
  const [mainColor, setMainColor] = useState<string>('gold');
  const [showLabelButton, setShowLabelButton] = useState<boolean>(true);

  const [dialogItemId, setDialogItemId] = useState<number>(0);
  const [dialogDescription, setDialogDescription] = useState<string>('');
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);

  useEffect(() => {
    if (route.params?.addedTraining == true) {
      setTimeout(() => {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: DICTIONARY.AlertSave,
          textBody: DICTIONARY.AlertSaveMessage_Training,
        });
        getTrainingsData();
      }, 1000);
    }
  }, [route.params?.addedTraining]);

  useFocusEffect(
    useCallback(() => {
      if (user) {
        getTrainingsData();
        setInitializing(false);
      }
    }, [user]),
  );

  const getTrainingsData = () => {
    if (user) {
      const genderDB = user.getProfile('gender') as number;
      if (genderDB == GenderType.Female) {
        setMainColor(COLORS.female);
      } else if (genderDB == GenderType.Male) {
        setMainColor(COLORS.male);
      }
      setTrainings(user.getTrainings());
      setRefreshState(prevState => prevState + 1);
    }
  };

  const onRefresh = async () => {
    if (user) {
      setRefreshing(true);
      try {
        await user.refreshUserData();
        getTrainingsData();
      } finally {
        setRefreshing(false);
      }
    }
  };

  const onScroll = ({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
    setShowLabelButton(scrollPosition <= 0);
  };

  const onEditItem = (itemId: number) => {
    navigation.navigate('AddTraining', {
      trainingId: trainings[itemId].id,
    });
  };

  const onRemoveItem = (itemId: number) => {
    setDialogItemId(trainings[itemId].id);
    setDialogDescription(
      `${DICTIONARY.AlertQuestion_MessageTrainingRemove}: ${trainings[itemId].name}?`,
    );
    setDialogVisible(true);
  };

  const onDialogAccept = async () => {
    setDialogVisible(false);
    if (user) {
      try {
        await user.removeTraining(dialogItemId);
      } finally {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: DICTIONARY.AlertRemove,
          textBody: DICTIONARY.AlertRemoveMessage_Training,
        });
        setTrainings(user.getTrainings());
        setRefreshState(prevState => prevState + 1);
        await user.updateDateProgressByChanges('AddTraining');
      }
    }
  };

  const onDialogCancel = () => {
    setDialogVisible(false);
  };

  if (initializing) {
    return <LoadingStyled />;
  }

  return (
    <View style={STYLES.container}>
      {trainings.length > 0 ? (
        <FlatList
          data={trainings}
          extraData={refreshState}
          keyExtractor={(item, index) => index.toString()}
          onScroll={onScroll}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              colors={[COLORS.white]}
              refreshing={refreshing}
              onRefresh={onRefresh}
              progressBackgroundColor={COLORS.grey}
            />
          }
          renderItem={({item, index}) => (
            <>
              <TrainingList
                name={item.name}
                time={item.time}
                onPressEdit={() => onEditItem(index)}
                onPressRemove={() => onRemoveItem(index)}
              />
            </>
          )}
          style={STYLES.flatListBottomMargin}
          accessible={true}
          accessibilityLabel={DICTIONARY.TrainingList}
        />
      ) : (
        <View style={STYLES.noContentContainer}>
          <Text style={[STYLES.noContentText]}>
            {DICTIONARY.TrainingsEmpty}
          </Text>
          <Icon
            type="FontAwesome6"
            name="arrow-trend-down"
            color={COLORS.inputTextDefault}
            size={SIZES.iconEmptySize}
            style={{top: SIZES.iconEmptyTop}}
          />
        </View>
      )}
      <FloatingButton
        icon="plus-thick"
        label={DICTIONARY.TrainingAdd}
        onPress={() => navigation.navigate('AddTraining')}
        extended={showLabelButton}
        colorBackground={mainColor}
      />
      <AlertStyled
        icon={'delete'}
        iconColor={COLORS.red}
        title={DICTIONARY.AlertQuestion_TitleTrainingRemove}
        description={dialogDescription}
        visible={dialogVisible}
        onDialogAccept={onDialogAccept}
        onDialogCancel={onDialogCancel}
        onDialogDismiss={onDialogCancel}
      />
    </View>
  );
}
