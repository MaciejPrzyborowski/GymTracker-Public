import React from 'react';
import {GestureResponderEvent} from 'react-native';

import {AnimatedFAB} from 'react-native-paper';
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';

import COLORS from '../../Assets/Styles/Colors.json';
import STYLES from '../../Assets/Styles/Styles';

interface FloatingButtonProps {
  icon: IconSource;
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  extended: boolean;
  colorIcon?: string;
  colorBackground?: string;
}

export default function FloatingButton({
  icon,
  label,
  onPress,
  extended,
  colorIcon = COLORS.black,
  colorBackground = COLORS.male,
}: FloatingButtonProps) {
  return (
    <AnimatedFAB
      icon={icon}
      label={label}
      visible={true}
      extended={extended}
      animateFrom={'right'}
      onPress={onPress}
      theme={{
        colors: {
          primaryContainer: colorBackground,
          onPrimaryContainer: colorIcon,
        },
      }}
      style={STYLES.fabRightContainer}
      accessibilityRole="button"
      accessibilityLabel={label}
    />
  );
}
