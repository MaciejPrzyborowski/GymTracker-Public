import {PaperProvider} from 'react-native-paper';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import ProfileScreen from '../../Components/Screens/Profile/Profile';
import EditProfileScreen from '../../Components/Screens/Profile/EditProfile';
import RemoveProfileScreen from '../../Components/Screens/Profile/RemoveProfile';

import COLORS from '../../Assets/Styles/Colors.json';
import STYLES from '../../Assets/Styles/Styles';
import DICTIONARY from '../../Assets/Lang/PL.json';

type ProfileStackList = {
  MyProfile: {editedProfile: boolean} | undefined;
  EditProfile: undefined;
  RemoveProfile: undefined;
};

export type MyProfileNavigationProps = NativeStackScreenProps<
  ProfileStackList,
  'MyProfile'
>;

export type EditProfileNavigationProps = NativeStackScreenProps<
  ProfileStackList,
  'EditProfile'
>;

export type RemoveProfileNavigationProps = NativeStackScreenProps<
  ProfileStackList,
  'RemoveProfile'
>;

const Stack = createNativeStackNavigator<ProfileStackList>();

export function ProfileNavigation() {
  return (
    <PaperProvider>
      <Stack.Navigator
        initialRouteName="MyProfile"
        screenOptions={{
          headerStyle: STYLES.navigationHeader,
          headerTitleStyle: STYLES.navigationHeaderTitle,
          headerTintColor: COLORS.gold,
          animationTypeForReplace: 'pop',
          animation: 'slide_from_right',
          animationDuration: 5,
        }}>
        <Stack.Screen
          name="MyProfile"
          component={ProfileScreen}
          options={{title: DICTIONARY.NavigationProfile}}
          initialParams={{editedProfile: false}}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{title: DICTIONARY.NavigationProfileEdit}}
        />
        <Stack.Screen
          name="RemoveProfile"
          component={RemoveProfileScreen}
          options={{title: DICTIONARY.NavigationProfileRemove}}
        />
      </Stack.Navigator>
    </PaperProvider>
  );
}
