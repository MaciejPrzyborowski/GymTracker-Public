import {Text, View} from 'react-native';

import {PaperProvider} from 'react-native-paper';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import HomeScreen from '../../Components/Screens/Home/Home';
import HomeSupplementsScreen from '../../Components/Screens/Home/Supplements';
import HomeTrainingsScreen from '../../Components/Screens/Home/Trainings';
import HomeDietsScreen from '../../Components/Screens/Home/Diets';
import Icon, {IconTypes} from '../../Utilities/Icons';

import COLORS from '../../Assets/Styles/Colors.json';
import SIZES from '../../Assets/Styles/Sizes.json';
import STYLES from '../../Assets/Styles/Styles';
import DICTIONARY from '../../Assets/Lang/PL.json';

type HomeStackList = {
  MyHome: undefined;
};

type HomeNavTabList = {
  HomeSupplements: undefined;
  HomeTrainings: undefined;
  HomeDiets: undefined;
};

export type HomeNavigationProps = NativeStackScreenProps<
  HomeStackList,
  'MyHome'
>;

export type HomeSupplementsNavigationProps = NativeStackScreenProps<
  HomeNavTabList,
  'HomeSupplements'
>;

export type HomeTrainingsNavigationProps = NativeStackScreenProps<
  HomeNavTabList,
  'HomeTrainings'
>;

export type HomeDietsNavigationProps = NativeStackScreenProps<
  HomeNavTabList,
  'HomeDiets'
>;

type CustomNavTabProps = {
  focused: boolean;
  color: string;
  label: string;
  iconType: keyof typeof IconTypes;
  iconName: string;
};

const Stack = createNativeStackNavigator<HomeStackList>();
const HomeNavTab = createMaterialTopTabNavigator<HomeNavTabList>();

export function HomeNavigation() {
  return (
    <PaperProvider>
      <Stack.Navigator
        initialRouteName="MyHome"
        screenOptions={{
          headerStyle: STYLES.navigationHeader,
          headerTitleStyle: STYLES.navigationHeaderTitle,
          headerTintColor: COLORS.gold,
          animationTypeForReplace: 'pop',
          animation: 'slide_from_right',
          animationDuration: 5,
        }}>
        <Stack.Screen
          name="MyHome"
          component={HomeScreen}
          options={{title: DICTIONARY.NavigationHome}}
        />
      </Stack.Navigator>
    </PaperProvider>
  );
}

const CustomNavTab: React.FC<CustomNavTabProps> = ({
  focused,
  color,
  label,
  iconType,
  iconName,
}) => {
  return (
    <View style={STYLES.centerRowContainer}>
      <Icon
        type={iconType}
        name={iconName}
        color={color}
        size={16}
        style={{paddingRight: SIZES.basePadding / 2}}
      />
      <Text style={[STYLES.textTabBar, {color}]}>{label}</Text>
    </View>
  );
};

export const HomeTopNavigation = () => {
  return (
    <HomeNavTab.Navigator
      screenOptions={({route}) => ({
        tabBarLabel: ({focused, color}) => {
          let icon, label;
          switch (route.name) {
            case 'HomeSupplements':
              icon = 'pill';
              label = DICTIONARY.NavigationHomeSupplements;
              break;
            case 'HomeTrainings':
              icon = 'dumbbell';
              label = DICTIONARY.NavigationHomeTrainings;
              break;
            case 'HomeDiets':
              icon = 'silverware';
              label = DICTIONARY.NavigationHomeDiet;
              break;
          }
          return (
            <CustomNavTab
              focused={focused}
              color={color}
              label={label}
              iconType="MaterialCommunityIcons"
              iconName={icon}
            />
          );
        },
        tabBarStyle: STYLES.background,
        tabBarActiveTintColor: COLORS.gold,
        tabBarInactiveTintColor: COLORS.white,
        tabBarIndicatorStyle: {backgroundColor: COLORS.gold},
        tabBarContentContainerStyle: {elevation: 5},
      })}>
      <HomeNavTab.Screen
        name="HomeSupplements"
        component={HomeSupplementsScreen}
      />
      <HomeNavTab.Screen name="HomeTrainings" component={HomeTrainingsScreen} />
      <HomeNavTab.Screen name="HomeDiets" component={HomeDietsScreen} />
    </HomeNavTab.Navigator>
  );
};
