import BouncyCheckbox from 'react-native-bouncy-checkbox';

import COLORS from '../../Assets/Styles/Colors.json';
import STYLES from '../../Assets/Styles/Styles';

interface CheckBoxStyledProps {
  checked: boolean;
  text: string;
  onPress: (checked: boolean) => void;
}

export default function CheckBoxStyled({
  checked,
  text,
  onPress,
}: CheckBoxStyledProps) {
  return (
    <BouncyCheckbox
      text={text}
      isChecked={checked}
      innerIconStyle={
        checked ? STYLES.iconStyleChecked : STYLES.iconStyleUnChecked
      }
      onPress={onPress}
      iconImageStyle={{tintColor: checked ? COLORS.white : COLORS.black}}
      fillColor={checked ? COLORS.green : COLORS.gold}
      style={STYLES.checkBox}
      textStyle={STYLES.checkBoxText}
    />
  );
}
