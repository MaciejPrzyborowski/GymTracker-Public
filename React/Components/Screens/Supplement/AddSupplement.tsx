import React, {useState, useContext, useCallback} from 'react';
import {ScrollView, Text, View} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';

import {weekDays} from '../../../Utilities/Constants';
import {AuthStateContext} from '../../../Context/AuthContext';
import {AddSupplementNavigationProps} from '../../../Navigation/Components/SupplementNavigation';
import AlertStyled from '../../Parts/Alert';
import ButtonSubmitStyled from '../../Parts/Button';
import DatePickerStyled from '../../Parts/Calendar';
import CheckBoxStyled from '../../Parts/CheckBox';
import TextInputStyled, {
  SegmentButtonsStyled,
  TextInputButtonStyled,
} from '../../Parts/Input';
import LoadingStyled from '../../Parts/Loading';
import DateUtilities from '../../../Utilities/DateUtilities';
import Utilities from '../../../Utilities/Functions';
import SupplementUtilities from '../../../Utilities/SupplementUtilities';
import {UserSupplement} from '../../../Utilities/User';

import COLORS from '../../../Assets/Styles/Colors.json';
import STYLES from '../../../Assets/Styles/Styles';
import DICTIONARY from '../../../Assets/Lang/PL.json';

export default function AddSupplementScreen({
  navigation,
  route,
}: AddSupplementNavigationProps) {
  const {user} = useContext(AuthStateContext);
  const [initializing, setInitializing] = useState<boolean>(true);

  const [supplementId, setSupplementId] = useState<number>(-1);
  const [supplementName, setSupplementName] = useState<string>('');
  const [supplementUnit, setSupplementUnit] = useState<number>(0);
  const [supplementServe, setSupplementServe] = useState<string>('');
  const [supplementCurrentValue, setSupplementCurrentValue] =
    useState<string>('');
  const [supplementDefaultValue, setSupplementDefaultValue] =
    useState<string>('');
  const [supplementTime, setSupplementTime] = useState<string>('');
  const [supplementDays, setSupplementDays] = useState<boolean[]>(
    new Array(7).fill(true),
  );
  const [submited, setSubmited] = useState<boolean>(false);

  const [timeCalendar, setTimeCalendar] = useState<boolean>(false);
  const [timeServeDate, setTimeServeDate] = useState<Date>(new Date());
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      if (user) {
        if (route.params?.supplementId != null) {
          const supplementData = user.getSupplementById(
            route.params.supplementId,
          );
          if (supplementData != null) {
            navigation.setOptions({
              headerTitle: DICTIONARY.NavigationSupplementEdit,
            });
            setSupplementId(route.params.supplementId);
            setSupplementName(supplementData.name);
            setSupplementUnit(supplementData.unit);
            setSupplementServe(supplementData.serve.toString());
            setSupplementCurrentValue(supplementData.currentValue.toString());
            setSupplementDefaultValue(supplementData.defaultValue.toString());
            if (supplementData.timeServe != undefined) {
              const timeServeDB = new Date(
                supplementData.timeServe.seconds * 1000,
              );
              setTimeServeDate(timeServeDB);
              setSupplementTime(DateUtilities.formatTimeToString(timeServeDB));
            }
            setSupplementDays(supplementData.daysServe);
          }
        }
        setInitializing(false);
      }
    }, [user, route.params?.supplementId]),
  );

  const onDayPress = (index: number) => {
    const updatedDays = [...supplementDays];
    updatedDays[index] = !updatedDays[index];
    setSupplementDays(updatedDays);
  };

  const onButtonPressSave = async () => {
    if (user) {
      const supplement: Omit<UserSupplement, 'id'> = {
        name: supplementName.trim(),
        unit: supplementUnit,
        serve: Utilities.isNotNumeric(supplementServe)
          ? 0
          : Math.floor(Number(supplementServe)),
        currentValue: Utilities.isNotNumeric(supplementCurrentValue)
          ? 0
          : Math.floor(Number(supplementCurrentValue)),
        defaultValue: Utilities.isNotNumeric(supplementDefaultValue)
          ? 0
          : Math.floor(Number(supplementDefaultValue)),
        timeServe:
          supplementTime.length > 0
            ? DateUtilities.formatTimeStringToTimestamp(supplementTime)
            : DateUtilities.formatInvalidTimestamp(),
        daysServe: supplementDays,
      };
      const isSupplementValid =
        supplement.name.length > 0 &&
        supplement.unit > 0 &&
        supplement.serve > 0 &&
        supplement.defaultValue > 0 &&
        DateUtilities.isValidTimestamp(supplement.timeServe);
      setSubmited(true);

      if (isSupplementValid) {
        if (supplement.currentValue <= 0) {
          supplement.currentValue = supplement.defaultValue;
        }
        try {
          if (supplementId === -1) {
            await user.addSupplement(supplement);
          } else {
            await user.updateSupplementById(supplementId, supplement);
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
          routes: [{name: 'MySupplements', params: {addedSupplement: true}}],
        });
      }
    }
  };

  const onDialogAccept = async () => {
    setDialogVisible(false);
    if (user) {
      await user.updateDateProgressByChanges('AddSupplement');
      navigation.reset({
        index: 0,
        routes: [{name: 'MySupplements', params: {addedSupplement: true}}],
      });
    }
  };

  const onDialogCancel = () => {
    setDialogVisible(false);
    navigation.reset({
      index: 0,
      routes: [{name: 'MySupplements', params: {addedSupplement: true}}],
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
        setValue={setSupplementName}
        label={DICTIONARY.SupplementName}
        placeholder={DICTIONARY.SupplementName}
        value={supplementName}
        error={submited && supplementName.trim().length === 0}
        maxLength={15}
      />
      <SegmentButtonsStyled
        setValue={(value: string) => setSupplementUnit(parseInt(value))}
        label={DICTIONARY.unit}
        value={supplementUnit.toString()}
        buttons={[
          {
            value: '1',
            label: DICTIONARY.unit_g,
          },
          {
            value: '2',
            label: DICTIONARY.unit_pcs,
          },
        ]}
        error={submited && supplementUnit === 0}
      />
      <TextInputStyled
        setValue={setSupplementServe}
        label={DICTIONARY.SupplementServe}
        placeholder={DICTIONARY.SupplementServePlaceHolder}
        value={supplementServe}
        error={
          (submited && supplementServe.length == 0) ||
          Utilities.isNotNumeric(supplementServe)
        }
        maxLength={6}
        keyboardType="numeric"
        rightLabel={SupplementUtilities.getUnitText(supplementUnit)}
      />
      <TextInputStyled
        setValue={setSupplementCurrentValue}
        label={DICTIONARY.SupplementCurrentValue}
        placeholder={DICTIONARY.SupplementCurrentValuePlaceHolder}
        value={supplementCurrentValue}
        error={
          (submited && supplementCurrentValue.length == 0) ||
          Utilities.isNotNumeric(supplementCurrentValue)
        }
        maxLength={6}
        keyboardType="numeric"
        rightLabel={SupplementUtilities.getUnitText(supplementUnit)}
      />
      <TextInputStyled
        setValue={setSupplementDefaultValue}
        label={DICTIONARY.SupplementDefaultValue}
        placeholder={DICTIONARY.SupplementDefaultValuePlaceHolder}
        value={supplementDefaultValue}
        error={
          (submited && supplementDefaultValue.length == 0) ||
          Utilities.isNotNumeric(supplementDefaultValue)
        }
        maxLength={6}
        keyboardType="numeric"
        rightLabel={SupplementUtilities.getUnitText(supplementUnit)}
      />
      <TextInputButtonStyled
        onPressIn={() => setTimeCalendar(true)}
        label={DICTIONARY.SupplementServeTimes}
        value={supplementTime}
        error={submited && supplementTime.length === 0}
      />
      <DatePickerStyled
        onConfirm={date => {
          setTimeCalendar(false);
          setTimeServeDate(date);
          setSupplementTime(DateUtilities.formatTimeToString(date));
        }}
        title={DICTIONARY.SupplementServeTimes}
        date={timeServeDate}
        mode="time"
        open={timeCalendar}
        onCancel={() => {
          setTimeCalendar(false);
        }}
      />
      <View style={STYLES.dayServeContainer}>
        <Text style={STYLES.dayServeText}>
          {DICTIONARY.SupplementServeDays}:
        </Text>
        <View style={STYLES.rowContainer}>
          <View style={STYLES.defaultFlex}>
            {weekDays
              .slice(0, Math.ceil(weekDays.length / 2))
              .map((day, index) => (
                <CheckBoxStyled
                  key={index}
                  text={day}
                  checked={supplementDays[(index + 1) % 7]}
                  onPress={() => onDayPress((index + 1) % 7)}
                />
              ))}
          </View>
          <View style={STYLES.defaultFlex}>
            {weekDays
              .slice(Math.ceil(weekDays.length / 2))
              .map((day, index) => (
                <CheckBoxStyled
                  key={index}
                  text={day}
                  checked={
                    supplementDays[
                      (index + 1 + Math.ceil(weekDays.length / 2)) % 7
                    ]
                  }
                  onPress={() =>
                    onDayPress((index + 1 + Math.ceil(weekDays.length / 2)) % 7)
                  }
                />
              ))}
          </View>
        </View>
      </View>
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
        label={DICTIONARY.SupplementSave}
        onPress={onButtonPressSave}
      />
    </ScrollView>
  );
}
