import {View, ActivityIndicator} from 'react-native';

import COLORS from '../../Assets/Styles/Colors.json';
import STYLES from '../../Assets/Styles/Styles';

interface LoadingStyledProps {
  size?: number | 'small' | 'large' | undefined;
}

export default function LoadingStyled({size = 50}: LoadingStyledProps) {
  return (
    <View style={[STYLES.container, STYLES.centerContainer]}>
      <ActivityIndicator animating={true} size={size} color={COLORS.gold} />
    </View>
  );
}
