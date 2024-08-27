import {PaperProvider} from 'react-native-paper';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import TrainingsScreen from '../../Components/Screens/Trainings/Trainings';
import AddTrainingScreen from '../../Components/Screens/Trainings/AddTraining';

import COLORS from '../../Assets/Styles/Colors.json';
import STYLES from '../../Assets/Styles/Styles';
import DICTIONARY from '../../Assets/Lang/PL.json';

type TrainingsStackList = {
  MyTrainings: {addedTraining: boolean} | undefined;
  AddTraining: {trainingId: number} | undefined;
};

export type MyTrainingsNavigationProps = NativeStackScreenProps<
  TrainingsStackList,
  'MyTrainings'
>;

export type AddTrainingNavigationProps = NativeStackScreenProps<
  TrainingsStackList,
  'AddTraining'
>;

const Stack = createNativeStackNavigator<TrainingsStackList>();

export function TrainingNavigation() {
  return (
    <PaperProvider>
      <Stack.Navigator
        initialRouteName="MyTrainings"
        screenOptions={{
          headerStyle: STYLES.navigationHeader,
          headerTitleStyle: STYLES.navigationHeaderTitle,
          headerTintColor: COLORS.gold,
          animationTypeForReplace: 'pop',
          animation: 'slide_from_right',
          animationDuration: 5,
        }}>
        <Stack.Screen
          name="MyTrainings"
          component={TrainingsScreen}
          options={{title: DICTIONARY.NavigationTrainings}}
          initialParams={{addedTraining: false}}
        />
        <Stack.Screen
          name="AddTraining"
          component={AddTrainingScreen}
          options={{title: DICTIONARY.NavigationTrainingAdd}}
          initialParams={{trainingId: undefined}}
        />
      </Stack.Navigator>
    </PaperProvider>
  );
}
