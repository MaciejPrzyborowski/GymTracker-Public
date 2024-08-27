import {PaperProvider} from 'react-native-paper';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import MeasuresScreen from '../../Components/Screens/Measure/Measures';
import AddMeasureScreen from '../../Components/Screens/Measure/AddMeasure';

import COLORS from '../../Assets/Styles/Colors.json';
import STYLES from '../../Assets/Styles/Styles';
import DICTIONARY from '../../Assets/Lang/PL.json';

type MeasuresStackList = {
  MyMeasures: {addedMeasure: boolean} | undefined;
  AddMeasure: undefined;
};

export type MyMeasuresNavigationProps = NativeStackScreenProps<
  MeasuresStackList,
  'MyMeasures'
>;

export type AddMeasureNavigationProps = NativeStackScreenProps<
  MeasuresStackList,
  'AddMeasure'
>;

const Stack = createNativeStackNavigator<MeasuresStackList>();

export function MeasureNavigation() {
  return (
    <PaperProvider>
      <Stack.Navigator
        initialRouteName="MyMeasures"
        screenOptions={{
          headerStyle: STYLES.navigationHeader,
          headerTitleStyle: STYLES.navigationHeaderTitle,
          headerTintColor: COLORS.gold,
          animationTypeForReplace: 'pop',
          animation: 'slide_from_right',
          animationDuration: 5,
        }}>
        <Stack.Screen
          name="MyMeasures"
          component={MeasuresScreen}
          options={{title: DICTIONARY.NavigationMeasures}}
          initialParams={{addedMeasure: false}}
        />
        <Stack.Screen
          name="AddMeasure"
          component={AddMeasureScreen}
          options={{title: DICTIONARY.NavigationMeasureAdd}}
        />
      </Stack.Navigator>
    </PaperProvider>
  );
}
