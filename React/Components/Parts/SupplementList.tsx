import {useState} from 'react';
import {View, Text} from 'react-native';

import {Divider, IconButton, Menu} from 'react-native-paper';

import SupplementUtilities from '../../Utilities/SupplementUtilities';

import COLORS from '../../Assets/Styles/Colors.json';
import STYLES from '../../Assets/Styles/Styles';
import DICTIONARY from '../../Assets/Lang/PL.json';
import Icon from '../../Utilities/Icons';

interface SupplementListProps {
  name: string;
  value: number;
  serve: number;
  unit: number;
  mainColor: string;
  onPressEdit: () => void;
  onPressRenew: () => void;
  onPressRemove: () => void;
}

export default function SupplementList({
  name,
  value,
  serve,
  unit,
  mainColor,
  onPressEdit,
  onPressRenew,
  onPressRemove,
}: SupplementListProps) {
  const remainingDays = Math.floor(value / serve);
  const suffix = SupplementUtilities.getUnitText(unit);
  const suffixRemainingDays =
    remainingDays == 1 ? DICTIONARY.day : DICTIONARY.days;
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View
      accessible={true}
      accessibilityLabelledBy={name}
      style={STYLES.cardContainer}>
      <View style={STYLES.textContainer}>
        <Text style={STYLES.textCardName}>{name}</Text>
      </View>
      <View style={STYLES.cardRemainingContainer}>
        <View style={STYLES.remainingCardContent}>
          <Icon
            type="FontAwesome6"
            name="prescription-bottle"
            size={14}
            color="gold"
            style={STYLES.remainingIcon}
          />
          <Text style={STYLES.remainingCardText}>
            {value} {suffix}
          </Text>
        </View>
        <View style={STYLES.remainingCardContent}>
          <Icon
            type="MaterialCommunityIcons"
            name="nutrition"
            size={16}
            color="gold"
            style={STYLES.remainingIcon}
          />
          <Text style={STYLES.remainingCardText}>
            {serve} {suffix}
          </Text>
        </View>
      </View>
      <View>
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <IconButton
              icon="dots-vertical"
              iconColor="silver"
              style={STYLES.menuIcon}
              onPress={() => setMenuVisible(true)}
              accessibilityLabel={`${name} ${DICTIONARY.more}`}
            />
          }
          anchorPosition="bottom"
          theme={{colors: {elevation: {level2: COLORS.secondaryGrey}}}}>
          <Menu.Item
            leadingIcon="pencil"
            onPress={() => {
              onPressEdit();
              setMenuVisible(false);
            }}
            title={DICTIONARY.edit}
            theme={{
              colors: {
                onSurfaceVariant: COLORS.white,
                onSurface: COLORS.white,
              },
            }}
          />
          <Divider theme={{colors: {outlineVariant: COLORS.grey}}} />
          <Menu.Item
            leadingIcon="autorenew"
            onPress={() => {
              onPressRenew();
              setMenuVisible(false);
            }}
            title={DICTIONARY.renew}
            theme={{
              colors: {
                onSurfaceVariant: COLORS.white,
                onSurface: COLORS.white,
              },
            }}
          />
          <Divider theme={{colors: {outlineVariant: COLORS.grey}}} />
          <Menu.Item
            leadingIcon="close"
            onPress={() => {
              onPressRemove();
              setMenuVisible(false);
            }}
            title={DICTIONARY.remove}
            theme={{
              colors: {
                onSurfaceVariant: COLORS.white,
                onSurface: COLORS.white,
              },
            }}
          />
        </Menu>
      </View>
      <View
        style={[
          STYLES.ribbonLeftContainer,
          {
            backgroundColor:
              remainingDays > 7 ? COLORS.green : COLORS.secondaryRed,
          },
        ]}>
        <Text style={STYLES.ribbonText}>
          {remainingDays} {suffixRemainingDays}
        </Text>
      </View>
    </View>
  );
}
