import {View, GestureResponderEvent, TouchableOpacity} from 'react-native';

import {
  TextInput,
  MD3DarkTheme as DefaultTheme,
  HelperText,
  SegmentedButtons,
  Text,
} from 'react-native-paper';

import COLORS from '../../Assets/Styles/Colors.json';
import SIZES from '../../Assets/Styles/Sizes.json';
import STYLES from '../../Assets/Styles/Styles';
import DICTIONARY from '../../Assets/Lang/PL.json';

interface TextInputStyledProps {
  setValue: (value: string) => void;
  label: string;
  placeholder: string;
  value: string;
  error: boolean;
  maxLength?: number;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  rightLabel?: string;
  autoComplete?: 'name';
  textContentType?: 'name';
  showError?: boolean;
}

interface TextInputButtonStyledProps {
  onPressIn: (event: GestureResponderEvent) => void;
  label: string;
  value: string;
  error: boolean;
  rightLabel?: string;
  showError?: boolean;
}

interface LoginInputStyledProps {
  setValue: (value: string) => void;
  label: string;
  value: string;
  error: boolean;
  hidePassword?: boolean;
  showPasswordPress?: (event: GestureResponderEvent) => void;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  autoComplete?: 'email' | 'password';
  textContentType?: 'emailAddress' | 'password';
  returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send';
  showError?: boolean;
}

interface SegmentButtonsStyledProps {
  setValue: (value: string) => void;
  label: string;
  value: string;
  buttons: any;
  error: boolean;
  showLabel?: boolean;
  showError?: boolean;
}

export default function TextInputStyled({
  setValue,
  label,
  placeholder,
  value,
  error,
  maxLength,
  keyboardType = 'default',
  rightLabel,
  autoComplete,
  textContentType,
  showError = true,
}: TextInputStyledProps) {
  return (
    <View
      accessible={true}
      accessibilityLabelledBy={label}
      style={STYLES.defaultFlex}>
      <TextInput
        mode="outlined"
        label={label}
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
        maxLength={maxLength}
        keyboardType={keyboardType}
        error={error}
        autoComplete={autoComplete}
        textContentType={textContentType}
        right={
          rightLabel ? (
            <TextInput.Affix
              textStyle={{color: error ? COLORS.red : COLORS.white}}
              text={rightLabel}
            />
          ) : undefined
        }
        textColor={COLORS.white}
        cursorColor={COLORS.white}
        placeholderTextColor={COLORS.silver}
        outlineStyle={{borderWidth: SIZES.baseBorderWidth}}
        style={STYLES.standardText}
        theme={{
          ...DefaultTheme,
          roundness: SIZES.baseBorderRadius,
          colors: {
            ...DefaultTheme.colors,
            primary: COLORS.gold,
            background: COLORS.grey,
            onSurfaceVariant: value.length > 0 ? COLORS.gold : COLORS.white,
            outline: COLORS.gold,
            error: COLORS.red,
          },
        }}
        importantForAccessibility={value.length > 0 ? 'yes' : 'no'}
      />
      {error && showError && (
        <HelperText
          type="error"
          theme={{
            ...DefaultTheme,
            colors: {...DefaultTheme.colors, error: COLORS.red},
          }}
          style={STYLES.helperInputText}>
          {DICTIONARY.AlertErrorMessage_WrongData}
        </HelperText>
      )}
    </View>
  );
}

export function TextInputButtonStyled({
  onPressIn,
  label,
  value,
  error,
  rightLabel,
  showError = true,
}: TextInputButtonStyledProps) {
  return (
    <TouchableOpacity
      accessible={true}
      accessibilityLabelledBy={label}
      style={STYLES.defaultFlex}
      onPress={onPressIn}>
      <TextInput
        mode="outlined"
        label={label}
        editable={false}
        value={value}
        error={error}
        right={
          rightLabel ? (
            <TextInput.Affix
              textStyle={{color: error ? COLORS.red : COLORS.white}}
              text={rightLabel}
            />
          ) : undefined
        }
        textColor={COLORS.white}
        cursorColor={COLORS.white}
        placeholderTextColor={COLORS.silver}
        outlineStyle={{borderWidth: SIZES.baseBorderWidth}}
        style={STYLES.standardText}
        theme={{
          ...DefaultTheme,
          roundness: SIZES.baseBorderRadius,
          colors: {
            ...DefaultTheme.colors,
            primary: COLORS.gold,
            background: COLORS.grey,
            onSurfaceVariant: value.length > 0 ? COLORS.gold : COLORS.white,
            outline: COLORS.gold,
            error: COLORS.red,
          },
        }}
        importantForAccessibility={value.length > 0 ? 'yes' : 'no'}
      />
      {error && showError && (
        <HelperText
          type="error"
          theme={{
            ...DefaultTheme,
            colors: {...DefaultTheme.colors, error: COLORS.red},
          }}
          style={STYLES.helperInputText}>
          {DICTIONARY.AlertErrorMessage_WrongData}
        </HelperText>
      )}
    </TouchableOpacity>
  );
}

export function LoginInputStyled({
  setValue,
  label,
  value,
  error,
  keyboardType = 'default',
  autoComplete,
  textContentType,
  returnKeyType,
  hidePassword,
  showPasswordPress,
  showError = true,
}: LoginInputStyledProps) {
  return (
    <View accessible={true} accessibilityLabelledBy={label}>
      <TextInput
        mode="outlined"
        label={label}
        value={value}
        onChangeText={setValue}
        keyboardType={keyboardType}
        error={error}
        autoComplete={autoComplete}
        textContentType={textContentType}
        returnKeyType={returnKeyType}
        autoCapitalize="none"
        secureTextEntry={hidePassword}
        right={
          showPasswordPress ? (
            <TextInput.Icon
              icon={hidePassword ? 'eye' : 'eye-off'}
              style={STYLES.menuIcon}
              color={COLORS.white}
              onPress={showPasswordPress}
              forceTextInputFocus={false}
              accessibilityLabel={
                hidePassword ? DICTIONARY.showPassword : DICTIONARY.hidePassword
              }
            />
          ) : undefined
        }
        textColor={COLORS.white}
        cursorColor={COLORS.white}
        placeholderTextColor={COLORS.silver}
        outlineStyle={{borderWidth: SIZES.baseBorderWidth}}
        style={STYLES.standardText}
        theme={{
          ...DefaultTheme,
          roundness: SIZES.baseBorderRadius,
          colors: {
            ...DefaultTheme.colors,
            primary: COLORS.gold,
            background: COLORS.grey,
            onSurfaceVariant: value.length > 0 ? COLORS.gold : COLORS.white,
            outline: COLORS.gold,
            error: COLORS.red,
          },
        }}
        importantForAccessibility={value.length > 0 ? 'yes' : 'no'}
      />
      {error && showError && (
        <HelperText
          type="error"
          theme={{
            ...DefaultTheme,
            colors: {...DefaultTheme.colors, error: COLORS.red},
          }}
          style={STYLES.helperInputText}>
          {DICTIONARY.AlertErrorMessage_WrongData}
        </HelperText>
      )}
    </View>
  );
}

export function SegmentButtonsStyled({
  setValue,
  label,
  value,
  buttons,
  error,
  showLabel = true,
  showError = true,
}: SegmentButtonsStyledProps) {
  const styledButtons = buttons.map((button: any) => ({
    ...button,
    labelStyle: {
      ...STYLES.standardSegmentText,
      paddingVertical: SIZES.basePadding / 3 + 1,
      margin: 0,
    },
    style: {
      borderWidth: SIZES.baseBorderWidth,
    },
  }));

  return (
    <View
      accessible={true}
      accessibilityLabelledBy={label}
      style={STYLES.defaultFlex}>
      {showLabel && (
        <Text
          style={[
            STYLES.labelInputText,
            {color: error ? COLORS.red : COLORS.gold},
          ]}>
          {label}
        </Text>
      )}
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        buttons={styledButtons}
        theme={{
          ...DefaultTheme,
          roundness: SIZES.baseBorderRadius / 4,
          colors: {
            ...DefaultTheme.colors,
            onSecondaryContainer: error ? COLORS.red : COLORS.gold,
            secondaryContainer: COLORS.grey,
            onSurface: error ? COLORS.red : COLORS.white,
            outline: error ? COLORS.red : COLORS.gold,
            onSurfaceDisabled: error ? COLORS.red : COLORS.silver,
            surfaceDisabled: error ? COLORS.red : COLORS.gold,
          },
        }}
      />
      {error && showError && (
        <HelperText
          type="error"
          theme={{
            ...DefaultTheme,
            colors: {...DefaultTheme.colors, error: COLORS.red},
          }}
          style={STYLES.helperInputText}>
          {DICTIONARY.AlertErrorMessage_WrongData}
        </HelperText>
      )}
    </View>
  );
}
