import React from 'react';

import {Provider as PaperProvider} from 'react-native-paper';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';

import {TrainingNavigation} from './Components/TrainingNavigation';
import {SupplementNavigation} from './Components/SupplementNavigation';
import {HomeNavigation} from './Components/HomeNavigation';
import {MeasureNavigation} from './Components/MeasureNavigation';
import {ProfileNavigation} from './Components/ProfileNavigation';
import Icon from '../Utilities/Icons';

import COLORS from '../Assets/Styles/Colors.json';
import STYLES from '../Assets/Styles/Styles';
import DICTIONARY from '../Assets/Lang/PL.json';

const Tab = createMaterialBottomTabNavigator();

export type RootStackParamList = {
  Trainings: undefined;
  Supplements: undefined;
  Home: undefined;
  Measures: undefined;
  Profile: undefined;
};

export default function RootNavigation() {
  return (
    <PaperProvider>
      <Tab.Navigator
        initialRouteName="Home"
        shifting={false}
        barStyle={STYLES.background}
        activeColor={COLORS.gold}
        inactiveColor={COLORS.white}
        keyboardHidesNavigationBar={true}
        theme={{colors: {secondaryContainer: COLORS.grey}}}>
        <Tab.Screen
          name="Trainings"
          component={TrainingNavigation}
          options={{
            tabBarLabel: DICTIONARY.NavigationTrainingsLabel,
            tabBarIcon: ({color}) => (
              <Icon
                type="MaterialCommunityIcons"
                name="dumbbell"
                color={color}
              />
            ),
            tabBarAccessibilityLabel: `${DICTIONARY.Navigation}: ${DICTIONARY.NavigationTrainingsLabel}`,
          }}
        />
        <Tab.Screen
          name="Supplements"
          component={SupplementNavigation}
          options={{
            tabBarLabel: DICTIONARY.NavigationSupplementsLabel,
            tabBarIcon: ({color}) => (
              <Icon type="MaterialCommunityIcons" name="pill" color={color} />
            ),
            tabBarAccessibilityLabel: `${DICTIONARY.Navigation}: ${DICTIONARY.NavigationSupplementsLabel}`,
          }}
        />
        <Tab.Screen
          name="Home"
          component={HomeNavigation}
          options={{
            tabBarLabel: DICTIONARY.NavigationHomeLabel,
            tabBarIcon: ({color}) => (
              <Icon
                type="MaterialCommunityIcons"
                name="progress-check"
                color={color}
              />
            ),
            tabBarAccessibilityLabel: `${DICTIONARY.Navigation}: ${DICTIONARY.NavigationHomeLabel}`,
          }}
        />
        <Tab.Screen
          name="Measures"
          component={MeasureNavigation}
          options={{
            tabBarLabel: DICTIONARY.NavigationMeasuresLabel,
            tabBarIcon: ({color}) => (
              <Icon type="MaterialCommunityIcons" name="ruler" color={color} />
            ),
            tabBarAccessibilityLabel: `${DICTIONARY.Navigation}: ${DICTIONARY.NavigationMeasuresLabel}`,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileNavigation}
          options={{
            tabBarLabel: DICTIONARY.NavigationProfileLabel,
            tabBarIcon: ({color}) => (
              <Icon
                type="MaterialCommunityIcons"
                name="account"
                color={color}
              />
            ),
            tabBarAccessibilityLabel: `${DICTIONARY.Navigation}: ${DICTIONARY.NavigationProfileLabel}`,
          }}
        />
      </Tab.Navigator>
    </PaperProvider>
  );
}
