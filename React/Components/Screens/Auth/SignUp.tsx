import React, {useState} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';

import {
  ButtonGoogleLoginStyled,
  ButtonSignInUpStyled,
} from '../../Parts/Button';
import {SignUpNavigationProps} from '../../../Navigation/Components/AuthNavigation';
import {LoginInputStyled} from '../../Parts/Input';
import StorySetCopyright from '../../Parts/Storyset';
import {SignInGoogle, SignUp} from '../../../Utilities/Auth';

import STYLES from '../../../Assets/Styles/Styles';
import DICTIONARY from '../../../Assets/Lang/PL.json';

export default function SignUpScreen({navigation}: SignUpNavigationProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordHide, setPasswordHide] = useState(true);
  const [submited, setSubmited] = useState<boolean>(false);

  const onSignUp = async () => {
    setSubmited(true);
    setEmail(email.trim());
    await SignUp(email, password);
  };

  async function onGoogleSignIn() {
    try {
      await SignInGoogle();
    } catch (error) {
      console.error(error);
    }
  }

  const onSignIn = () => {
    navigation.navigate('SignIn');
  };

  const onPasswordShowPress = () => {
    setPasswordHide(!passwordHide);
  };

  return (
    <ScrollView
      style={STYLES.container}
      contentContainerStyle={STYLES.centerContentContainer}
      showsVerticalScrollIndicator={false}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Text style={STYLES.textTitleHeader}>{DICTIONARY.AppName}</Text>
          <Image
            style={STYLES.image}
            source={require('../../../Assets/Images/login.png')}
            resizeMode="contain"
          />
          <View style={STYLES.columnContainer}>
            <LoginInputStyled
              setValue={setEmail}
              label={DICTIONARY.ProfileEmail}
              value={email}
              error={submited && (email.length === 0 || !email.includes('@'))}
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
              label={DICTIONARY.register}
              onPress={onSignUp}
            />
          </View>
          <View style={STYLES.centerRowContainer}>
            <Text style={STYLES.textInfo}>{DICTIONARY.AuthHasAccount} </Text>
            <TouchableOpacity style={STYLES.textToButton} onPress={onSignIn}>
              <Text
                style={[STYLES.textInfo, {textDecorationLine: 'underline'}]}>
                {DICTIONARY.login}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={STYLES.separatorContainer}>
            <View style={STYLES.separatorLine} />
            <Text style={STYLES.separatorText}>{DICTIONARY.or}</Text>
            <View style={STYLES.separatorLine} />
          </View>
          <ButtonGoogleLoginStyled
            label={DICTIONARY.AuthGoogle}
            onPress={onGoogleSignIn}
          />
        </View>
      </TouchableWithoutFeedback>
      <StorySetCopyright hide={submited} />
    </ScrollView>
  );
}
