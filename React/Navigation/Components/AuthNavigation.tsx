import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import SignInScreen from '../../Components/Screens/Auth/SignIn';
import SignUpScreen from '../../Components/Screens/Auth/SignUp';

type AuthStackList = {
  SignIn: undefined;
  SignUp: undefined;
};

export type SignInNavigationProps = NativeStackScreenProps<
  AuthStackList,
  'SignIn'
>;

export type SignUpNavigationProps = NativeStackScreenProps<
  AuthStackList,
  'SignUp'
>;

const Stack = createNativeStackNavigator<AuthStackList>();

export default function AuthNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        animationTypeForReplace: 'pop',
        animation: 'slide_from_right',
        animationDuration: 5,
        headerShown: false,
      }}>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
}
