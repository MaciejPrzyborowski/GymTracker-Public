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

import {SignInNavigationProps} from '../../../Navigation/Components/AuthNavigation';
import {LoginInputStyled} from '../../Parts/Input';
import {
  ButtonGoogleLoginStyled,
  ButtonSignInUpStyled,
} from '../../Parts/Button';
import StorySetCopyright from '../../Parts/Storyset';
import {SignIn, SignInGoogle} from '../../../Utilities/Auth';

import STYLES from '../../../Assets/Styles/Styles';
import DICTIONARY from '../../../Assets/Lang/PL.json';

export default function SignInScreen({navigation}: SignInNavigationProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordHide, setPasswordHide] = useState(true);
  const [submited, setSubmited] = useState<boolean>(false);

  const onSignIn = async () => {
    setSubmited(true);
    setEmail(email.trim());
    await SignIn(email, password);
  };

  async function onGoogleSignIn() {
    try {
      await SignInGoogle();
    } catch (error) {
      console.error(error);
    }
  }

  const onSignUp = () => {
    navigation.navigate('SignUp');
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
            <ButtonSignInUpStyled label={DICTIONARY.login} onPress={onSignIn} />
          </View>
          <View style={STYLES.centerRowContainer}>
            <Text style={STYLES.textInfo}>{DICTIONARY.AuthNoAccount} </Text>
            <TouchableOpacity style={STYLES.textToButton} onPress={onSignUp}>
              <Text
                style={[STYLES.textInfo, {textDecorationLine: 'underline'}]}>
                {DICTIONARY.register}
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
