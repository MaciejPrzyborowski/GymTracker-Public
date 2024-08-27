import React, {
  useState,
  useEffect,
  useContext,
  useLayoutEffect,
  useCallback,
} from 'react';
import {View, Text, ScrollView, ColorValue, RefreshControl} from 'react-native';

import {Appbar, Divider, Menu} from 'react-native-paper';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {useFocusEffect} from '@react-navigation/native';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

import {AuthStateContext} from '../../../Context/AuthContext';
import {MyProfileNavigationProps} from '../../../Navigation/Components/ProfileNavigation';
import LoadingStyled from '../../Parts/Loading';
import Profile3ParametersStylized, {
  Profile2ParametersStylized,
} from '../../Parts/ProfileParameters';
import {SignOut, SignOutGoogle} from '../../../Utilities/Auth';
import DateUtilities from '../../../Utilities/DateUtilities';
import Icon from '../../../Utilities/Icons';
import ProfileUtilities from '../../../Utilities/ProfileUtilities';
import {UserMeasure, GenderType} from '../../../Utilities/User';

import COLORS from '../../../Assets/Styles/Colors.json';
import FONTS from '../../../Assets/Styles/Fonts.json';
import SIZES from '../../../Assets/Styles/Sizes.json';
import STYLES from '../../../Assets/Styles/Styles';
import DICTIONARY from '../../../Assets/Lang/PL.json';

export default function ProfileScreen({
  navigation,
  route,
}: MyProfileNavigationProps) {
  const {user, setUser, setIsLoggedIn} = useContext(AuthStateContext);
  const [initializing, setInitializing] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const [name, setName] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');
  const [age, setAge] = useState<number>(0);
  const [gender, setGender] = useState<GenderType>(GenderType.None);
  const [lastMeasure, setLastMeasure] = useState<UserMeasure | null>();
  const [mainColor, setMainColor] = useState<ColorValue>(COLORS.gold);

  const [supplementsConsumed, setSupplementsConsumed] = useState<number>(0);
  const [gramsOfSupplementsConsumed, setGramsOfSupplementsConsumed] =
    useState<number>(0);
  const [piecesOfSupplementsConsumed, setPiecesOfSupplementsConsumed] =
    useState<number>(0);
  const [trainingsCompleted, setTrainingsCompleted] = useState<number>(0);
  const [mealsConsumed, setMealsConsumed] = useState<number>(0);

  const [BMI, setBMI] = useState<string>('-');
  const [RFM, setRFM] = useState<string>('-');
  const [WHR, setWHR] = useState<string>('-');
  const [PPM, setPPM] = useState<string>('-');
  const [water, setWater] = useState<string>('-');
  const [minWeight, setMinWeight] = useState<string>('-');
  const [correctWeight, setCorrectWeight] = useState<string>('-');
  const [maxWeight, setMaxWeight] = useState<string>('-');

  const [BMIStatus, setBMIStatus] = useState<string>('-');
  const [RFMStatus, setRFMStatus] = useState<string>('-');
  const [WHRStatus, setWHRStatus] = useState<string>('-');
  const [minWeightStatus, setMinWeightStatus] = useState<string>('-');
  const [correctWeightStatus, setCorrectWeightStatus] = useState<string>('-');
  const [maxWeightStatus, setMaxWeightStatus] = useState<string>('-');

  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  useEffect(() => {
    if (route.params?.editedProfile == true) {
      setTimeout(() => {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: DICTIONARY.AlertSave,
          textBody: DICTIONARY.AlertSuccessMessage_SaveData,
        });
      }, 1000);
    }
  }, [route.params?.editedProfile]);

  useFocusEffect(
    useCallback(() => {
      if (user) {
        getProfileData();
        setInitializing(false);
      }
    }, [user]),
  );

  useFocusEffect(
    useCallback(() => {
      if (lastMeasure) {
        getProfileParameters();
      }
    }, [lastMeasure, gender, age]),
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const getProfileData = () => {
    if (user) {
      const nameDB = user.getProfile('name') as string;
      const genderDB = user.getProfile('gender') as number;
      const birthdayDB = user.getProfile(
        'birthday',
      ) as FirebaseFirestoreTypes.Timestamp | null;
      const supplementsConsumedDB = user.getStats('supplementsConsumed');
      const gramsOfSupplementsConsumedDB = user.getStats(
        'gramsOfSupplementsConsumed',
      );
      const piecesOfSupplementsConsumedDB = user.getStats(
        'piecesOfSupplementsConsumed',
      );
      const trainingsCompletedDB = user.getStats('trainingsCompleted');
      const mealsConsumedDB = user.getStats('mealsConsumed');

      setName(nameDB);
      setGender(genderDB);
      setSupplementsConsumed(supplementsConsumedDB);
      setGramsOfSupplementsConsumed(gramsOfSupplementsConsumedDB);
      setPiecesOfSupplementsConsumed(piecesOfSupplementsConsumedDB);
      setTrainingsCompleted(trainingsCompletedDB);
      setMealsConsumed(mealsConsumedDB);
      if (genderDB === GenderType.Female) {
        setMainColor(COLORS.female);
      } else if (genderDB === GenderType.Male) {
        setMainColor(COLORS.male);
      }
      if (birthdayDB != null) {
        const birthdayDBDate = new Date(birthdayDB.seconds * 1000);
        setBirthday(DateUtilities.formatDateToString(birthdayDBDate));
        setAge(DateUtilities.calculateAge(birthdayDB));
      }
      setLastMeasure(user.getLastMeasure());
    }
  };

  const getProfileParameters = () => {
    if (lastMeasure) {
      const BMIDB = ProfileUtilities.calculateBMI(
        lastMeasure.weight,
        lastMeasure.height,
      );
      const RFMDB = ProfileUtilities.calculateRFM(
        lastMeasure.height,
        lastMeasure.waistCircum,
        gender,
      );
      const WHRDB = ProfileUtilities.calculateWHR(
        lastMeasure.waistCircum,
        lastMeasure.hipCircum,
      );
      const PPMDB = ProfileUtilities.calculatePPM(
        lastMeasure.weight,
        lastMeasure.height,
        age,
        gender,
      );
      const WaterDB = ProfileUtilities.calculateWater(lastMeasure.weight);
      const minWeightDB = ProfileUtilities.calculateMinWeight(
        lastMeasure.height,
      );
      const correctWeightDB = ProfileUtilities.calculateCorrectWeight(
        lastMeasure.height,
      );
      const maxWeightDB = ProfileUtilities.calculateMaxWeight(
        lastMeasure.height,
      );

      setBMI(BMIDB);
      setRFM(RFMDB);
      setWHR(WHRDB);
      setPPM(PPMDB);
      setWater(WaterDB);
      setMinWeight(minWeightDB);
      setCorrectWeight(correctWeightDB);
      setMaxWeight(maxWeightDB);
      setBMIStatus(ProfileUtilities.statusBMI(Number(BMIDB)));
      setRFMStatus(ProfileUtilities.statusRFM(Number(RFMDB), gender));
      setWHRStatus(ProfileUtilities.statusWHR(Number(WHRDB), gender));
      setMinWeightStatus(
        ProfileUtilities.statusMinWeight(
          Number(minWeightDB),
          lastMeasure.weight,
        ),
      );
      setCorrectWeightStatus(
        ProfileUtilities.statusCorrectWeight(
          Number(correctWeightDB),
          lastMeasure.weight,
        ),
      );
      setMaxWeightStatus(
        ProfileUtilities.statusMaxWeight(
          Number(maxWeightDB),
          lastMeasure.weight,
        ),
      );
    }
  };

  const onRefresh = async () => {
    if (user) {
      setRefreshing(true);
      try {
        await user.refreshUserData();
        getProfileData();
      } finally {
        setRefreshing(false);
      }
    }
  };

  const onSignOut = async () => {
    try {
      await SignOut();
      await SignOutGoogle();
    } finally {
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  if (initializing) {
    return <LoadingStyled />;
  }

  return (
    <>
      <Appbar.Header style={STYLES.navigationHeader}>
        <Appbar.Content
          title={DICTIONARY.NavigationProfile}
          titleStyle={STYLES.navigationHeaderTitle}
        />
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Appbar.Action
              icon="dots-vertical"
              onPress={() => setMenuVisible(true)}
              color={COLORS.white}
              style={STYLES.menuIcon}
              accessibilityLabel={DICTIONARY.more}
            />
          }
          anchorPosition="bottom"
          theme={{colors: {elevation: {level2: COLORS.secondaryGrey}}}}>
          <Menu.Item
            leadingIcon="account-edit"
            onPress={() => {
              navigation.navigate('EditProfile');
              setMenuVisible(false);
            }}
            title={DICTIONARY.ProfileEdit}
            theme={{
              colors: {
                onSurfaceVariant: COLORS.white,
                onSurface: COLORS.white,
              },
            }}
          />
          <Divider theme={{colors: {outlineVariant: COLORS.grey}}} />
          <Menu.Item
            leadingIcon="account-remove"
            onPress={() => {
              navigation.navigate('RemoveProfile');
              setMenuVisible(false);
            }}
            title={DICTIONARY.ProfileRemove}
            theme={{
              colors: {
                onSurfaceVariant: COLORS.white,
                onSurface: COLORS.white,
              },
            }}
          />
          <Divider theme={{colors: {outlineVariant: COLORS.grey}}} />
          <Menu.Item
            leadingIcon="logout"
            onPress={() => {
              onSignOut();
              setMenuVisible(false);
            }}
            title={DICTIONARY.logout}
            theme={{
              colors: {
                onSurfaceVariant: COLORS.white,
                onSurface: COLORS.white,
              },
            }}
          />
        </Menu>
      </Appbar.Header>
      <ScrollView
        style={STYLES.container}
        refreshControl={
          <RefreshControl
            colors={[COLORS.white]}
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressBackgroundColor={COLORS.grey}
          />
        }>
        <View style={STYLES.userInfoContainer}>
          {gender === GenderType.Female ? (
            <Icon
              type="Fontisto"
              name="female"
              size={SIZES.iconAvatar}
              color={mainColor.toString()}
            />
          ) : gender === GenderType.Male ? (
            <Icon
              type="Fontisto"
              name="male"
              size={SIZES.iconAvatar}
              color={mainColor.toString()}
            />
          ) : (
            <Icon
              type="Fontisto"
              name="person"
              size={SIZES.iconAvatar}
              color={mainColor.toString()}
            />
          )}
          <View style={STYLES.centerColumnContainer}>
            <Text style={STYLES.textHeader}>{name}</Text>
            <View style={STYLES.centerRowContainer}>
              <Icon
                type="MaterialCommunityIcons"
                name="cake-variant"
                color="gold"
                size={FONTS.mediumText}
              />
              <Text style={STYLES.mediumText}>{` ${birthday} (${age})`}</Text>
            </View>
          </View>
        </View>
        <View style={STYLES.noContentContainer}>
          <View style={STYLES.centerRowContainer}>
            <Profile3ParametersStylized
              title={DICTIONARY.ProfileParametersTitle_supplementConsumed}
              value={supplementsConsumed.toString()}
              status={`${gramsOfSupplementsConsumed} ${DICTIONARY.unit_g}, ${piecesOfSupplementsConsumed}`}
              description={
                DICTIONARY.ProfileParametersDescription_supplementConsumed
              }
              mainColor={mainColor}
            />
            <Profile2ParametersStylized
              title={DICTIONARY.ProfileParametersTitle_trainingsCompleted}
              value={trainingsCompleted.toString()}
              description={
                DICTIONARY.ProfileParametersDescription_trainingsCompleted
              }
              mainColor={mainColor}
            />
            <Profile2ParametersStylized
              title={DICTIONARY.ProfileParametersTitle_mealsConsumed}
              value={mealsConsumed.toString()}
              description={
                DICTIONARY.ProfileParametersDescription_mealsConsumed
              }
              mainColor={mainColor}
            />
          </View>
          <View style={STYLES.centerRowContainer}>
            <Profile3ParametersStylized
              title={DICTIONARY.ProfileParametersTitle_BMI}
              value={BMI}
              status={BMIStatus}
              description={DICTIONARY.ProfileParametersDescription_BMI}
              mainColor={mainColor}
            />
            <Profile3ParametersStylized
              title={DICTIONARY.ProfileParametersTitle_RFM}
              value={RFM}
              status={RFMStatus}
              description={DICTIONARY.ProfileParametersDescription_RFM}
              mainColor={mainColor}
            />
            <Profile3ParametersStylized
              title={DICTIONARY.ProfileParametersTitle_WHR}
              value={WHR}
              status={WHRStatus}
              description={DICTIONARY.ProfileParametersDescription_WHR}
              mainColor={mainColor}
            />
          </View>
          <View style={STYLES.centerRowContainer}>
            <Profile3ParametersStylized
              title={DICTIONARY.ProfileParametersTitle_minWeight}
              value={minWeight}
              suffix="kg"
              status={minWeightStatus}
              description={DICTIONARY.ProfileParametersDescription_minWeight}
              mainColor={mainColor}
            />
            <Profile3ParametersStylized
              title={DICTIONARY.ProfileParametersTitle_correctWeight}
              value={correctWeight}
              suffix="kg"
              status={correctWeightStatus}
              description={
                DICTIONARY.ProfileParametersDescription_correctWeight
              }
              mainColor={mainColor}
            />
            <Profile3ParametersStylized
              title={DICTIONARY.ProfileParametersTitle_maxWeight}
              value={maxWeight}
              suffix="kg"
              status={maxWeightStatus}
              description={DICTIONARY.ProfileParametersDescription_maxWeight}
              mainColor={mainColor}
            />
          </View>
          <View style={STYLES.centerRowContainer}>
            <Profile2ParametersStylized
              title={DICTIONARY.ProfileParametersTitle_PPM}
              value={PPM}
              suffix="kcal"
              description={DICTIONARY.ProfileParametersDescription_PPM}
              mainColor={mainColor}
            />
            <Profile2ParametersStylized
              title={DICTIONARY.ProfileParametersTitle_water}
              value={water}
              suffix="ml"
              description={DICTIONARY.ProfileParametersDescription_water}
              mainColor={mainColor}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
}
