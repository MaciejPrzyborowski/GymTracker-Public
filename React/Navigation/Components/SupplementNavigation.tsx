import {PaperProvider} from 'react-native-paper';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import SupplementsScreen from '../../Components/Screens/Supplement/Supplements';
import AddSupplementScreen from '../../Components/Screens/Supplement/AddSupplement';

import COLORS from '../../Assets/Styles/Colors.json';
import STYLES from '../../Assets/Styles/Styles';
import DICTIONARY from '../../Assets/Lang/PL.json';

type SupplementsStackList = {
  MySupplements: {addedSupplement: boolean} | undefined;
  AddSupplement: {supplementId: number} | undefined;
};

export type MySupplementsNavigationProps = NativeStackScreenProps<
  SupplementsStackList,
  'MySupplements'
>;

export type AddSupplementNavigationProps = NativeStackScreenProps<
  SupplementsStackList,
  'AddSupplement'
>;

const Stack = createNativeStackNavigator<SupplementsStackList>();

export function SupplementNavigation() {
  return (
    <PaperProvider>
      <Stack.Navigator
        initialRouteName="MySupplements"
        screenOptions={{
          headerStyle: STYLES.navigationHeader,
          headerTitleStyle: STYLES.navigationHeaderTitle,
          headerTintColor: COLORS.gold,
          animationTypeForReplace: 'pop',
          animation: 'slide_from_right',
          animationDuration: 5,
        }}>
        <Stack.Screen
          name="MySupplements"
          component={SupplementsScreen}
          options={{title: DICTIONARY.NavigationSupplements}}
          initialParams={{addedSupplement: false}}
        />
        <Stack.Screen
          name="AddSupplement"
          component={AddSupplementScreen}
          options={{title: DICTIONARY.NavigationSupplementAdd}}
          initialParams={{supplementId: undefined}}
        />
      </Stack.Navigator>
    </PaperProvider>
  );
}
