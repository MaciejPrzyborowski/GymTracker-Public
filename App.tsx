import React, {useEffect, useRef, useState} from 'react';
import {StatusBar} from 'react-native';

import notifee, {EventType} from '@notifee/react-native';
import auth from '@react-native-firebase/auth';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import {AlertNotificationRoot} from 'react-native-alert-notification';

import LoadingStyled from './React/Components/Parts/Loading';
import {AuthStateContext} from './React/Context/AuthContext';
import RootNavigation, {
  RootStackParamList,
} from './React/Navigation/RootNavigation';
import AuthNavigation from './React/Navigation/Components/AuthNavigation';
import CompleteProfileNavigation from './React/Navigation/Components/CompleteProfileNavigation';
import {
  createUser,
  isUserExist,
  getUserData,
} from './React/Utilities/Firestore';
import {NotificationIds} from './React/Utilities/Notification';
import {User} from './React/Utilities/User';

import COLORS from './React/Assets/Styles/Colors.json';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isCompletedProfile, setIsCompletedProfile] = useState<boolean>(false);

  const navigationRef =
    useRef<NavigationContainerRef<RootStackParamList>>(null);
  const [initializing, setInitializing] = useState<boolean>(true);

  const authContextValues = {
    isCompletedProfile,
    setIsCompletedProfile,
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
  };

  useEffect(() => {
    StatusBar.setBackgroundColor(COLORS.grey);
    SystemNavigationBar.setNavigationColor(COLORS.grey, undefined, 'status');
  }, []);

  const navigateToHome = () => {
    if (navigationRef.current != null && isLoggedIn && isCompletedProfile) {
      navigationRef.current && navigationRef.current.navigate('Home');
    }
  };

  notifee.onBackgroundEvent(async ({type, detail}) => {
    const isDailyNotification =
      detail.notification?.id === NotificationIds.DailyDay ||
      detail.notification?.id === NotificationIds.DailyNight;

    if (isDailyNotification && type === EventType.PRESS) {
      navigateToHome();
    }
  });
  notifee.onForegroundEvent(({type, detail}) => {
    const isDailyNotification =
      detail.notification?.id === NotificationIds.DailyDay ||
      detail.notification?.id === NotificationIds.DailyNight;

    if (isDailyNotification && type === EventType.PRESS) {
      navigateToHome();
    }
  });

  const onAuthStateChanged = async (user: FirebaseAuthTypes.User | null) => {
    setInitializing(true);
    try {
      if (user) {
        const userExist = await isUserExist(user.uid);
        const currentUser = userExist
          ? await getUserData(user.uid)
          : await createUser(user.uid, user.email, user.displayName);
        const isCompleted = currentUser.getProfile('completed') as boolean;
        setUser(currentUser);
        setIsLoggedIn(true);
        setIsCompletedProfile(isCompleted);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(onAuthStateChanged);
    return unsubscribe;
  }, []);

  if (initializing) {
    return <LoadingStyled />;
  }

  return (
    <AlertNotificationRoot theme="dark">
      <NavigationContainer ref={navigationRef}>
        <AuthStateContext.Provider value={authContextValues}>
          {!isLoggedIn ? (
            <AuthNavigation />
          ) : !isCompletedProfile ? (
            <CompleteProfileNavigation />
          ) : (
            <RootNavigation />
          )}
        </AuthStateContext.Provider>
      </NavigationContainer>
    </AlertNotificationRoot>
  );
}
