import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import CompleteNameScreen from '../../Components/Screens/CompleteProfile/CompleteName';
import CompleteGenderScreen from '../../Components/Screens/CompleteProfile/CompleteGender';
import CompleteBirthdayScreen from '../../Components/Screens/CompleteProfile/CompleteBirthday';
import CompleteMealsScreen from '../../Components/Screens/CompleteProfile/CompleteMeals';
import CompleteTimeWakeUpScreen from '../../Components/Screens/CompleteProfile/CompleteTimeWakeUp';
import CompleteTimeSleepScreen from '../../Components/Screens/CompleteProfile/CompleteTimeSleep';

type CompleteProfileStackList = {
  CompleteName: undefined;
  CompleteGender: undefined;
  CompleteBirthday: undefined;
  CompleteMeals: undefined;
  CompleteTimeWakeUp: undefined;
  CompleteTimeSleep: undefined;
};

export type CompleteNameNavigationProps = NativeStackScreenProps<
  CompleteProfileStackList,
  'CompleteName'
>;

export type CompleteGenderNavigationProps = NativeStackScreenProps<
  CompleteProfileStackList,
  'CompleteGender'
>;

export type CompleteBirthdayNavigationProps = NativeStackScreenProps<
  CompleteProfileStackList,
  'CompleteBirthday'
>;

export type CompleteMealsNavigationProps = NativeStackScreenProps<
  CompleteProfileStackList,
  'CompleteMeals'
>;

export type CompleteTimeWakeUpNavigationProps = NativeStackScreenProps<
  CompleteProfileStackList,
  'CompleteTimeWakeUp'
>;

export type CompleteTimeSleepNavigationProps = NativeStackScreenProps<
  CompleteProfileStackList,
  'CompleteTimeSleep'
>;

const Stack = createNativeStackNavigator<CompleteProfileStackList>();

export default function CompleteProfileNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="CompleteName"
      screenOptions={{
        animationTypeForReplace: 'pop',
        animation: 'slide_from_right',
        animationDuration: 5,
        headerShown: false,
      }}>
      <Stack.Screen name="CompleteName" component={CompleteNameScreen} />
      <Stack.Screen name="CompleteGender" component={CompleteGenderScreen} />
      <Stack.Screen
        name="CompleteBirthday"
        component={CompleteBirthdayScreen}
      />
      <Stack.Screen name="CompleteMeals" component={CompleteMealsScreen} />
      <Stack.Screen
        name="CompleteTimeWakeUp"
        component={CompleteTimeWakeUpScreen}
      />
      <Stack.Screen
        name="CompleteTimeSleep"
        component={CompleteTimeSleepScreen}
      />
    </Stack.Navigator>
  );
}
