import {Text, TouchableOpacity, GestureResponderEvent} from 'react-native';

import {Iconify} from 'react-native-iconify';

import Icon from '../../Utilities/Icons';

import COLORS from '../../Assets/Styles/Colors.json';
import FONTS from '../../Assets/Styles/Fonts.json';
import STYLES from '../../Assets/Styles/Styles';

interface ButtonStyledProps {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
}

export default function ButtonSubmitStyled({
  label,
  onPress,
}: ButtonStyledProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[STYLES.buttonContainer, {backgroundColor: COLORS.gold}]}
      accessibilityRole="button"
      accessibilityLabel={label}>
      <Icon
        type="MaterialCommunityIcons"
        name="check-bold"
        color={COLORS.black}
        size={FONTS.mediumText + 1}
      />
    </TouchableOpacity>
  );
}

export function ButtonSignInUpStyled({label, onPress}: ButtonStyledProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[STYLES.buttonContainer, {backgroundColor: COLORS.gold}]}
      accessibilityRole="button"
      accessibilityLabel={label}>
      <Text style={STYLES.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}

export function ButtonGoogleLoginStyled({label, onPress}: ButtonStyledProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[STYLES.buttonContainer, {backgroundColor: COLORS.white}]}
      accessibilityRole="button"
      accessibilityLabel={label}>
      <Iconify
        icon="logos:google-icon"
        size={FONTS.mediumText + 1}
        style={STYLES.icon}
      />
      <Text style={STYLES.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}

export function ButtonRemoveProfile({label, onPress}: ButtonStyledProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[STYLES.buttonContainer, {backgroundColor: COLORS.secondaryRed}]}
      accessibilityRole="button"
      accessibilityLabel={label}>
      <Text style={STYLES.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}
