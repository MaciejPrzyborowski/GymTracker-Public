import {Text} from 'react-native';

import {
  MD3DarkTheme as DefaultTheme,
  Portal,
  Dialog,
  Button,
} from 'react-native-paper';
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';

import COLORS from '../../Assets/Styles/Colors.json';
import SIZES from '../../Assets/Styles/Sizes.json';
import STYLES from '../../Assets/Styles/Styles';
import DICTIONARY from '../../Assets/Lang/PL.json';

interface AlertStyledProp {
  icon: IconSource;
  iconColor: string;
  title: string;
  description: string;
  visible: boolean;
  onDialogAccept: () => void;
  onDialogCancel: () => void;
  onDialogDismiss: (() => void) | undefined;
  dialogAcceptText?: string;
  dialogCancelText?: string;
}

export default function AlertStyled({
  icon,
  iconColor,
  title,
  description,
  visible,
  onDialogAccept,
  onDialogCancel,
  onDialogDismiss,
  dialogAcceptText = DICTIONARY.yes,
  dialogCancelText = DICTIONARY.no,
}: AlertStyledProp) {
  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onDialogDismiss}
        theme={{
          ...DefaultTheme,
          colors: {elevation: {level3: COLORS.grey}},
        }}>
        <Dialog.Icon icon={icon} size={SIZES.iconAlert} color={iconColor} />
        <Dialog.Title style={STYLES.alertHeaderText}>{title}</Dialog.Title>
        <Dialog.Content>
          <Text style={STYLES.alertDescriptionText}>{description}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button textColor={COLORS.white} onPress={onDialogAccept}>
            {dialogAcceptText}
          </Button>
          <Button textColor={COLORS.white} onPress={onDialogCancel}>
            {dialogCancelText}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
