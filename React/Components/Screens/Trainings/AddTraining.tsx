import React, {useState, useContext, useCallback} from 'react';
import {ScrollView, Text, View} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';

import {weekDays} from '../../../Utilities/Constants';
import {AuthStateContext} from '../../../Context/AuthContext';
import {AddTrainingNavigationProps} from '../../../Navigation/Components/TrainingNavigation';
import AlertStyled from '../../Parts/Alert';
import ButtonSubmitStyled from '../../Parts/Button';
import DatePickerStyled from '../../Parts/Calendar';
import CheckBoxStyled from '../../Parts/CheckBox';
import TextInputStyled, {TextInputButtonStyled} from '../../Parts/Input';
import LoadingStyled from '../../Parts/Loading';
import DateUtilities from '../../../Utilities/DateUtilities';
import {UserTraining} from '../../../Utilities/User';

import COLORS from '../../../Assets/Styles/Colors.json';
import STYLES from '../../../Assets/Styles/Styles';
import DICTIONARY from '../../../Assets/Lang/PL.json';

export default function AddTrainingScreen({
  navigation,
  route,
}: AddTrainingNavigationProps) {
  const {user} = useContext(AuthStateContext);
  const [initializing, setInitializing] = useState<boolean>(true);

  const [trainingId, setTrainingId] = useState<number>(-1);
  const [trainingName, setTrainingName] = useState<string>('');
  const [trainingDays, setTrainingDays] = useState<boolean[]>(
    new Array(7).fill(false),
  );
  const [trainingTime, setTrainingTime] = useState<string[]>(
    new Array(7).fill(''),
  );
  const [submited, setSubmited] = useState<boolean>(false);

  const [timeCalendar, setTimeCalendar] = useState<number>(-1);
  const [timeTrainingDate, setTimeTrainingDate] = useState<Date>(new Date());
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      if (user) {
        if (route.params?.trainingId != null) {
          const trainingData = user.getTrainingById(route.params.trainingId);
          if (trainingData != null) {
            navigation.setOptions({
              headerTitle: DICTIONARY.NavigationTrainingEdit,
            });
            setTrainingId(route.params.trainingId);
            setTrainingName(trainingData.name);
            trainingData.time.forEach((time, index) => {
              if (time !== null) {
                const trainingTimeDB = new Date(time.seconds * 1000);
                trainingDays[index] = true;
                trainingTime[index] =
                  DateUtilities.formatTimeToString(trainingTimeDB);
                setTimeTrainingDate(trainingTimeDB);
              } else {
                trainingDays[index] = false;
                trainingTime[index] = '';
              }
            });
          }
        }
        setInitializing(false);
      }
    }, [user, route.params?.trainingId]),
  );

  const onDayPress = (index: number) => {
    const updatedDays = [...trainingDays];
    updatedDays[index] = !updatedDays[index];
    setTrainingDays(updatedDays);
  };

  const onButtonPressSave = async () => {
    if (user) {
      const training: Omit<UserTraining, 'id'> = {
        name: trainingName.trim(),
        time: trainingDays.map((day, index) => {
          if (day && trainingTime[index].length > 0) {
            return DateUtilities.formatTimeStringToTimestamp(
              trainingTime[index],
            );
          } else if (day) {
            return DateUtilities.formatInvalidTimestamp();
          } else {
            return null;
          }
        }),
      };
      const isTrainingValid =
        training.name.length > 0 &&
        training.time.every(time => {
          return time === null || DateUtilities.isValidTimestamp(time);
        });
      setSubmited(true);

      if (isTrainingValid) {
        try {
          if (trainingId === -1) {
            await user.addTraining(training);
          } else {
            await user.updateTrainingById(trainingId, training);
          }
        } finally {
          await checkProgressData();
        }
      }
    }
  };

  const checkProgressData = async () => {
    if (user) {
      const today = new Date().toISOString().split('T')[0];
      const dateProgressExist = user.existsDateProgress(today);
      if (dateProgressExist) {
        setDialogVisible(true);
      } else {
        navigation.reset({
          index: 0,
          routes: [{name: 'MyTrainings', params: {addedTraining: true}}],
        });
      }
    }
  };

  const onDialogAccept = async () => {
    setDialogVisible(false);
    if (user) {
      await user.updateDateProgressByChanges('AddTraining');
      navigation.reset({
        index: 0,
        routes: [{name: 'MyTrainings', params: {addedTraining: true}}],
      });
    }
  };

  const onDialogCancel = () => {
    setDialogVisible(false);
    navigation.reset({
      index: 0,
      routes: [{name: 'MyTrainings', params: {addedTraining: true}}],
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
        setValue={setTrainingName}
        label={DICTIONARY.TrainingName}
        placeholder={DICTIONARY.TrainingName}
        value={trainingName}
        error={submited && trainingName.trim().length === 0}
        maxLength={15}
      />
      <View style={[STYLES.dayServeContainer]}>
        <Text style={STYLES.dayServeText}>{DICTIONARY.TrainingDays}:</Text>
        {weekDays.map((day, index) => (
          <View style={{flexDirection: 'row'}} key={index}>
            <View style={{paddingVertical: 4}}>
              <CheckBoxStyled
                text={day}
                checked={trainingDays[(index + 1) % 7]}
                onPress={() => onDayPress((index + 1) % 7)}
              />
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'flex-end',
                display: trainingDays[(index + 1) % 7] ? 'flex' : 'none',
              }}>
              <TextInputButtonStyled
                onPressIn={() => setTimeCalendar((index + 1) % 7)}
                label={DICTIONARY.timeHour}
                value={trainingTime[(index + 1) % 7]}
                error={
                  submited &&
                  trainingDays[(index + 1) % 7] &&
                  trainingTime[(index + 1) % 7].length === 0
                }
                showError={false}
              />
            </View>
          </View>
        ))}
      </View>
      <DatePickerStyled
        onConfirm={date => {
          const updatedTimes = [...trainingTime];
          updatedTimes[timeCalendar] = DateUtilities.formatTimeToString(date);
          setTrainingTime(updatedTimes);
          setTimeTrainingDate(date);
          setTimeCalendar(-1);
        }}
        title={DICTIONARY.TrainingTime}
        date={timeTrainingDate}
        mode="time"
        open={timeCalendar != -1}
        onCancel={() => {
          setTimeCalendar(-1);
        }}
      />
      <AlertStyled
        icon={'progress-alert'}
        iconColor={COLORS.male}
        title={DICTIONARY.AlertQuestion_TitleProgressInsert}
        description={DICTIONARY.AlertQuestion_MessageProgressInsert}
        visible={dialogVisible}
        onDialogAccept={onDialogAccept}
        onDialogCancel={onDialogCancel}
        onDialogDismiss={undefined}
      />
      <ButtonSubmitStyled
        label={DICTIONARY.TrainingSave}
        onPress={onButtonPressSave}
      />
    </ScrollView>
  );
}
