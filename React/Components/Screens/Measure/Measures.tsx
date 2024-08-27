import React, {useEffect, useState, useContext, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {useFocusEffect} from '@react-navigation/native';

import {AuthStateContext} from '../../../Context/AuthContext';
import {MyMeasuresNavigationProps} from '../../../Navigation/Components/MeasureNavigation';
import FloatingButton from '../../Parts/FloatingButton';
import LoadingStyled from '../../Parts/Loading';
import TextMeasureList, {GraphMeasureList} from '../../Parts/MeasureList';
import DateUtilities from '../../../Utilities/DateUtilities';
import Icon from '../../../Utilities/Icons';
import MeasureUtilities from '../../../Utilities/MeasureUtilities';
import {GenderType, UserMeasure} from '../../../Utilities/User';

import COLORS from '../../../Assets/Styles/Colors.json';
import SIZES from '../../../Assets/Styles/Sizes.json';
import STYLES from '../../../Assets/Styles/Styles';
import DICTIONARY from '../../../Assets/Lang/PL.json';

interface TabLabels {
  id: Exclude<keyof UserMeasure, 'date'>;
  label: string;
}

export default function MeasuresScreen({
  navigation,
  route,
}: MyMeasuresNavigationProps) {
  const {user} = useContext(AuthStateContext);
  const [initializing, setInitializing] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const [measures, setMeasures] = useState<UserMeasure[]>([]);
  const [mainColor, setMainColor] = useState<string>('gold');
  const [existsToday, setExistsToday] = useState<boolean>(false);
  const [showLabelButton, setShowLabelButton] = useState<boolean>(true);

  const tabLabels: TabLabels[] = [
    {id: 'weight', label: DICTIONARY.MeasureWeight},
    {id: 'armCircum', label: DICTIONARY.MeasureArm},
    {id: 'chestCircum', label: DICTIONARY.MeasureChest},
    {id: 'waistCircum', label: DICTIONARY.MeasureWaist},
    {id: 'hipCircum', label: DICTIONARY.MeasureHip},
    {id: 'thighCircum', label: DICTIONARY.MeasureThigh},
    {id: 'calfCircum', label: DICTIONARY.MeasureCalf},
    {id: 'height', label: DICTIONARY.MeasureHeight},
  ];
  const [selectedTab, setSelectedTab] = useState<
    Exclude<keyof UserMeasure, 'date'>
  >(tabLabels[0].id);

  useEffect(() => {
    if (route.params?.addedMeasure == true) {
      setTimeout(() => {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: DICTIONARY.AlertSave,
          textBody: DICTIONARY.AlertSaveMessage_Measure,
        });
      }, 1000);
    }
  }, [route.params?.addedMeasure]);

  useFocusEffect(
    useCallback(() => {
      if (user) {
        getMeasuresData();
        setInitializing(false);
      }
    }, [user]),
  );

  const getMeasuresData = () => {
    if (user) {
      const genderDB = user.getProfile('gender') as number;
      const measuresDB = user.getMeasures();
      const existsTodayDB = measuresDB.some(measure => {
        const todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0);

        const measureDate = measure.date.toDate();
        measureDate.setHours(0, 0, 0, 0);
        return measureDate.getTime() === todayDate.getTime();
      });
      if (genderDB == GenderType.Female) {
        setMainColor(COLORS.female);
      } else if (genderDB == GenderType.Male) {
        setMainColor(COLORS.male);
      }
      setExistsToday(existsTodayDB);
      setMeasures(measuresDB);
    }
  };

  const onRefresh = async () => {
    if (user) {
      setRefreshing(true);

      try {
        await user.refreshUserData();
        getMeasuresData();
      } finally {
        setRefreshing(false);
      }
    }
  };

  const onScroll = ({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
    setShowLabelButton(scrollPosition <= 0);
  };

  const onTabClick = (tabId: Exclude<keyof UserMeasure, 'date'>) => {
    setSelectedTab(tabId);
  };

  if (initializing) {
    return <LoadingStyled />;
  }

  return (
    <View
      accessible={true}
      accessibilityLabel={DICTIONARY.MeasureList}
      style={STYLES.container}>
      {measures.length > 0 ? (
        <FlatList
          data={measures.slice().reverse()}
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
              {index === 0 && (
                <>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={tabLabels}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        onPress={() => onTabClick(item.id)}
                        style={[
                          STYLES.tabContainer,
                          {
                            borderBottomColor:
                              selectedTab === item.id
                                ? mainColor
                                : 'transparent',
                          },
                        ]}>
                        <Text
                          style={[
                            STYLES.textTab,
                            {
                              color:
                                selectedTab === item.id
                                  ? mainColor
                                  : COLORS.inputTextDefault,
                            },
                          ]}>
                          {item.label}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                  <View style={STYLES.graphContainer}>
                    <GraphMeasureList
                      dataX={MeasureUtilities.getChartLastDates(measures)}
                      dataY={MeasureUtilities.getChartLastMeasures(
                        measures,
                        selectedTab,
                      )}
                      height={SIZES.measuresGraphHeight}
                      suffixDataY={MeasureUtilities.getMeasureSuffix(
                        selectedTab,
                      )}
                    />
                  </View>
                  <View style={STYLES.textContainer}>
                    <Text style={STYLES.textHeader}>
                      {DICTIONARY.MeasuresHistory}
                    </Text>
                  </View>
                </>
              )}
              <TextMeasureList
                date={DateUtilities.formatTimestampToStringWithTime(item.date)}
                value={item[selectedTab]}
                nextValue={
                  measures.length - index - 2 >= 0
                    ? measures[measures.length - index - 2][selectedTab]
                    : null
                }
                suffix={MeasureUtilities.getMeasureSuffix(selectedTab)}
              />
            </>
          )}
          style={STYLES.flatListBottomMargin}
        />
      ) : (
        <View style={STYLES.noContentContainer}>
          <Text style={[STYLES.noContentText]}>{DICTIONARY.MeasuresEmpty}</Text>
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
        label={existsToday ? DICTIONARY.MeasuresUpdate : DICTIONARY.MeasuresAdd}
        onPress={() => navigation.navigate('AddMeasure')}
        extended={showLabelButton}
        colorBackground={mainColor}
      />
    </View>
  );
}
