import {View, Text, ColorValue} from 'react-native';

import {Popable} from 'react-native-popable';

import Icon from '../../Utilities/Icons';

import COLORS from '../../Assets/Styles/Colors.json';
import FONTS from '../../Assets/Styles/Fonts.json';
import STYLES from '../../Assets/Styles/Styles';

interface Profile2ParametersProps {
  title: string;
  value: string;
  prefix?: string;
  suffix?: string;
  description: string;
  mainColor: ColorValue;
}

interface Profile3ParametersProps extends Profile2ParametersProps {
  status: string;
}

export default function Profile3ParametersStylized({
  title,
  value,
  prefix,
  suffix,
  status,
  description,
  mainColor,
}: Profile3ParametersProps) {
  return (
    <View style={STYLES.gridContainer}>
      <Popable content={description} style={STYLES.popableSmallStyle}>
        <View
          style={[
            STYLES.gridUpperSection,
            {
              backgroundColor: mainColor,
              borderColor: mainColor,
            },
          ]}>
          <Text style={STYLES.gridTitle}>{title} </Text>
          <Icon
            type="MaterialIcons"
            name="info-outline"
            size={FONTS.mediumText}
            color={COLORS.black}
          />
        </View>
        <View style={STYLES.gridMiddle3Section}>
          <Text style={STYLES.gridMiddleDescription}>
            {value != '-' ? prefix : ''} {value} {value != '-' ? suffix : ''}
          </Text>
        </View>
        <View style={STYLES.gridLowerSection}>
          <Text style={STYLES.gridLowerDescription}>{status}</Text>
        </View>
      </Popable>
    </View>
  );
}

export function Profile2ParametersStylized({
  title,
  value,
  prefix,
  suffix,
  description,
  mainColor,
}: Profile2ParametersProps) {
  return (
    <View style={STYLES.gridContainer}>
      <Popable content={description} style={STYLES.popableBigStyle}>
        <View
          style={[
            STYLES.gridUpperSection,
            {
              backgroundColor: mainColor,
              borderColor: mainColor,
            },
          ]}>
          <Text style={STYLES.gridTitle}>{title} </Text>
          <Icon
            type="MaterialIcons"
            name="info-outline"
            size={FONTS.mediumText}
            color={COLORS.black}
          />
        </View>
        <View style={STYLES.gridMiddle2Section}>
          <Text style={STYLES.gridMiddleDescription}>
            {value != '-' ? prefix : ''} {value} {value != '-' ? suffix : ''}
          </Text>
        </View>
      </Popable>
    </View>
  );
}
