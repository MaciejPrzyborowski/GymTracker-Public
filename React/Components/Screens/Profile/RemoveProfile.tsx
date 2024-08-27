import React, {useCallback, useContext, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';

import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {useFocusEffect} from '@react-navigation/native';

import {AuthStateContext} from '../../../Context/AuthContext';
import {RemoveProfileNavigationProps} from '../../../Navigation/Components/ProfileNavigation';
import {
  ButtonGoogleLoginStyled,
  ButtonRemoveProfile,
  ButtonSignInUpStyled,
} from '../../Parts/Button';
import {LoginInputStyled} from '../../Parts/Input';
import {
  ReauthenticateGoogle,
  ReauthenticatePassword,
  SignOutGoogle,
} from '../../../Utilities/Auth';
import {deleteUser, getUserProvider} from '../../../Utilities/Firestore';
import Icon from '../../../Utilities/Icons';

import COLORS from '../../../Assets/Styles/Colors.json';
import SIZES from '../../../Assets/Styles/Sizes.json';
import STYLES from '../../../Assets/Styles/Styles';
import DICTIONARY from '../../../Assets/Lang/PL.json';

export default function RemoveProfileScreen({
  navigation,
  route,
}: RemoveProfileNavigationProps) {
  const {user, setUser, setIsLoggedIn} = useContext(AuthStateContext);
  const [userProvider, setUserProvider] = useState<string | null>('');
  const [reauthenticated, setReauthenticated] = useState<boolean>(false);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordHide, setPasswordHide] = useState(true);
  const [submited, setSubmited] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      setUserProvider(getUserProvider());
    }, [navigation, user]),
  );

  const onSignIn = async () => {
    setSubmited(true);
    setEmail(email.trim());
    const success = await ReauthenticatePassword(email, password);
    if (success) {
      setReauthenticated(true);
    }
  };

  async function onGoogleSignIn() {
    const success = await ReauthenticateGoogle();
    if (success) {
      setReauthenticated(true);
    }
  }

  const onPasswordShowPress = () => {
    setPasswordHide(!passwordHide);
  };

  const onButtonPressRemove = async () => {
    if (user) {
      try {
        await deleteUser(user.getProfile('uid') as string);
      } finally {
        try {
          await SignOutGoogle();
        } finally {
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: DICTIONARY.AlertSuccess,
            textBody: DICTIONARY.AlertSuccessMessage_RemoveAccount,
          });
          setUser(null);
          setIsLoggedIn(false);
        }
      }
    }
  };

  return (
    <ScrollView
      style={STYLES.container}
      contentContainerStyle={STYLES.contentContainer}>
      <View style={STYLES.columnContainer}>
        <Text style={STYLES.textHeader}>{DICTIONARY.RemoveProfileHeader}</Text>
        <View style={STYLES.columnContainer}>
          <View style={STYLES.rowContainer}>
            <Icon
              type="MaterialCommunityIcons"
              name="progress-check"
              color={COLORS.white}
              size={SIZES.removeProfileIconSize}
              style={STYLES.icon}
            />
            <Text style={STYLES.textRemoveInfo}>
              {DICTIONARY.RemoveProfileProgress}
            </Text>
          </View>
          <View style={STYLES.rowContainer}>
            <Icon
              type="MaterialCommunityIcons"
              name="ruler"
              color={COLORS.white}
              size={SIZES.removeProfileIconSize}
              style={STYLES.icon}
            />
            <Text style={STYLES.textRemoveInfo}>
              {DICTIONARY.RemoveProfileMeasures}
            </Text>
          </View>
          <View style={STYLES.rowContainer}>
            <Icon
              type="MaterialCommunityIcons"
              name="pill"
              color={COLORS.white}
              size={SIZES.removeProfileIconSize}
              style={STYLES.icon}
            />
            <Text style={STYLES.textRemoveInfo}>
              {DICTIONARY.RemoveProfileSupplements}
            </Text>
          </View>
          <View style={STYLES.rowContainer}>
            <Icon
              type="Ionicons"
              name="stats-chart"
              color={COLORS.white}
              size={SIZES.removeProfileIconSize}
              style={STYLES.icon}
            />
            <Text style={STYLES.textRemoveInfo}>
              {DICTIONARY.RemoveProfileStats}
            </Text>
          </View>
          <View style={STYLES.rowContainer}>
            <Icon
              type="MaterialCommunityIcons"
              name="account"
              color={COLORS.white}
              size={SIZES.removeProfileIconSize}
              style={STYLES.icon}
            />
            <Text style={STYLES.textRemoveInfo}>
              {DICTIONARY.RemoveProfileProfile}
            </Text>
          </View>
        </View>
        {!reauthenticated ? (
          <>
            <Text style={STYLES.textHeader}>
              {DICTIONARY.RemoveProfileAuthHeader}
            </Text>
            {userProvider === 'password' ? (
              <>
                <LoginInputStyled
                  setValue={setEmail}
                  label={DICTIONARY.ProfileEmail}
                  value={email}
                  error={
                    submited && (email.length === 0 || !email.includes('@'))
                  }
                  keyboardType="email-address"
                  autoComplete="email"
                  textContentType="emailAddress"
                  returnKeyType="next"
                />
                <LoginInputStyled
                  setValue={setPassword}
                  label={DICTIONARY.ProfilePassword}
                  value={password}
                  error={submited && password.length === 0}
                  hidePassword={passwordHide}
                  showPasswordPress={onPasswordShowPress}
                  autoComplete="password"
                  textContentType="password"
                  returnKeyType="done"
                />
                <ButtonSignInUpStyled
                  label={DICTIONARY.login}
                  onPress={onSignIn}
                />
              </>
            ) : (
              <ButtonGoogleLoginStyled
                label={DICTIONARY.AuthGoogle}
                onPress={onGoogleSignIn}
              />
            )}
          </>
        ) : (
          <>
            <ButtonRemoveProfile
              label={DICTIONARY.RemoveProfile}
              onPress={onButtonPressRemove}
            />
            <Text style={STYLES.textInfo}>{DICTIONARY.actionNoUndo}</Text>
          </>
        )}
      </View>
    </ScrollView>
  );
}
