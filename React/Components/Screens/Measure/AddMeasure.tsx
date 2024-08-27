import React, {useState, useContext, useCallback} from 'react';
import {ScrollView} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';
import {AddMeasureNavigationProps} from '../../../Navigation/Components/MeasureNavigation';

import {AuthStateContext} from '../../../Context/AuthContext';
import ButtonSubmitStyled from '../../Parts/Button';
import TextInputStyled from '../../Parts/Input';
import LoadingStyled from '../../Parts/Loading';
import Utilities from '../../../Utilities/Functions';
import {UserMeasure} from '../../../Utilities/User';

import STYLES from '../../../Assets/Styles/Styles';
import DICTIONARY from '../../../Assets/Lang/PL.json';

export default function AddMeasureScreen({
  navigation,
}: AddMeasureNavigationProps) {
  const {user} = useContext(AuthStateContext);
  const [initializing, setInitializing] = useState<boolean>(true);

  const [lastMeasure, setLastMeasure] = useState<UserMeasure | null>();
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [chestCircum, setChestCircum] = useState<string>('');
  const [waistCircum, setWaistCircum] = useState<string>('');
  const [hipCircum, setHipCircum] = useState<string>('');
  const [armCircum, setArmCircum] = useState<string>('');
  const [thighCircum, setThighCircum] = useState<string>('');
  const [calfCircum, setCalfCircum] = useState<string>('');
  const [submited, setSubmited] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      if (user) {
        const lastMeasureDB = user.getLastMeasure();
        if (lastMeasureDB) {
          setLastMeasure(lastMeasureDB);
          setHeight(lastMeasureDB.height.toString());
          setWeight(lastMeasureDB.weight.toString());
          setChestCircum(lastMeasureDB.chestCircum.toString());
          setWaistCircum(lastMeasureDB.waistCircum.toString());
          setHipCircum(lastMeasureDB.hipCircum.toString());
          setArmCircum(lastMeasureDB.armCircum.toString());
          setThighCircum(lastMeasureDB.thighCircum.toString());
          setCalfCircum(lastMeasureDB.calfCircum.toString());
        }
        setInitializing(false);
      }
    }, [user]),
  );

  const onButtonPressSave = async () => {
    if (user) {
      const measurements: Omit<UserMeasure, 'id' | 'date'> = {
        height: Utilities.isNotNumeric(height)
          ? 0
          : Utilities.convertToNumber(height),
        weight: Utilities.isNotNumeric(weight)
          ? 0
          : Utilities.convertToNumber(weight),
        chestCircum: Utilities.isNotNumeric(chestCircum)
          ? 0
          : Utilities.convertToNumber(chestCircum),
        waistCircum: Utilities.isNotNumeric(waistCircum)
          ? 0
          : Utilities.convertToNumber(waistCircum),
        hipCircum: Utilities.isNotNumeric(hipCircum)
          ? 0
          : Utilities.convertToNumber(hipCircum),
        armCircum: Utilities.isNotNumeric(armCircum)
          ? 0
          : Utilities.convertToNumber(armCircum),
        thighCircum: Utilities.isNotNumeric(thighCircum)
          ? 0
          : Utilities.convertToNumber(thighCircum),
        calfCircum: Utilities.isNotNumeric(calfCircum)
          ? 0
          : Utilities.convertToNumber(calfCircum),
      };
      const isMeasurementsValid = Object.values(measurements).every(
        measurement => measurement > 0,
      );
      setSubmited(true);

      if (isMeasurementsValid) {
        try {
          await user.addMeasure(measurements);
        } finally {
          navigation.reset({
            index: 0,
            routes: [{name: 'MyMeasures', params: {addedMeasure: true}}],
          });
        }
      }
    }
  };

  if (initializing) {
    return <LoadingStyled />;
  }

  return (
    <ScrollView
      contentContainerStyle={STYLES.contentContainer}
      style={STYLES.container}>
      <TextInputStyled
        setValue={setHeight}
        label={DICTIONARY.MeasureHeight}
        placeholder={lastMeasure?.height.toString() || '0'}
        value={height}
        error={
          (submited && height.length == 0) || Utilities.isNotNumeric(height)
        }
        maxLength={6}
        keyboardType="numeric"
        rightLabel="cm"
      />
      <TextInputStyled
        setValue={setWeight}
        label={DICTIONARY.MeasureWeight}
        placeholder={lastMeasure?.weight.toString() || '0'}
        value={weight}
        error={
          (submited && weight.length == 0) || Utilities.isNotNumeric(weight)
        }
        maxLength={6}
        keyboardType="numeric"
        rightLabel="kg"
      />
      <TextInputStyled
        setValue={setChestCircum}
        label={DICTIONARY.MeasureChestCircum}
        placeholder={lastMeasure?.chestCircum.toString() || '0'}
        value={chestCircum}
        error={
          (submited && chestCircum.length == 0) ||
          Utilities.isNotNumeric(chestCircum)
        }
        maxLength={6}
        keyboardType="numeric"
        rightLabel="cm"
      />
      <TextInputStyled
        setValue={setWaistCircum}
        label={DICTIONARY.MeasureWaistCircum}
        placeholder={lastMeasure?.waistCircum.toString() || '0'}
        value={waistCircum}
        error={
          (submited && waistCircum.length == 0) ||
          Utilities.isNotNumeric(waistCircum)
        }
        maxLength={6}
        keyboardType="numeric"
        rightLabel="cm"
      />
      <TextInputStyled
        setValue={setHipCircum}
        label={DICTIONARY.MeasureHipCircum}
        placeholder={lastMeasure?.hipCircum.toString() || '0'}
        value={hipCircum}
        error={
          (submited && hipCircum.length == 0) ||
          Utilities.isNotNumeric(hipCircum)
        }
        maxLength={6}
        keyboardType="numeric"
        rightLabel="cm"
      />
      <TextInputStyled
        setValue={setArmCircum}
        label={DICTIONARY.MeasureArmCircum}
        placeholder={lastMeasure?.armCircum.toString() || '0'}
        value={armCircum}
        error={
          (submited && armCircum.length == 0) ||
          Utilities.isNotNumeric(armCircum)
        }
        maxLength={6}
        keyboardType="numeric"
        rightLabel="cm"
      />
      <TextInputStyled
        setValue={setThighCircum}
        label={DICTIONARY.MeasureThighCircum}
        placeholder={lastMeasure?.thighCircum.toString() || '0'}
        value={thighCircum}
        error={
          (submited && thighCircum.length == 0) ||
          Utilities.isNotNumeric(thighCircum)
        }
        maxLength={6}
        keyboardType="numeric"
        rightLabel="cm"
      />
      <TextInputStyled
        setValue={setCalfCircum}
        label={DICTIONARY.MeasureCalfCircum}
        placeholder={lastMeasure?.calfCircum.toString() || '0'}
        value={calfCircum}
        error={
          (submited && calfCircum.length == 0) ||
          Utilities.isNotNumeric(calfCircum)
        }
        maxLength={6}
        keyboardType="numeric"
        rightLabel="cm"
      />
      <ButtonSubmitStyled
        label={DICTIONARY.MeasuresSave}
        onPress={onButtonPressSave}
      />
    </ScrollView>
  );
}
