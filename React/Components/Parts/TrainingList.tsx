import {useState} from 'react';
import {View, Text} from 'react-native';

import {Divider, IconButton, Menu} from 'react-native-paper';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

import Icon from '../../Utilities/Icons';

import COLORS from '../../Assets/Styles/Colors.json';
import STYLES from '../../Assets/Styles/Styles';
import DICTIONARY from '../../Assets/Lang/PL.json';

interface SupplementListProps {
  name: string;
  time: (FirebaseFirestoreTypes.Timestamp | null)[];
  onPressEdit: () => void;
  onPressRemove: () => void;
}

export default function TrainingList({
  name,
  time,
  onPressEdit,
  onPressRemove,
}: SupplementListProps) {
  const [menuVisible, setMenuVisible] = useState(false);
  const timesPerWeek = time.filter(time => time !== null).length;

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
            type="MaterialCommunityIcons"
            name="calendar-week"
            size={16}
            color="gold"
            style={STYLES.remainingIcon}
          />
          <Text style={STYLES.remainingCardText}>
            {timesPerWeek} {DICTIONARY.perWeek}
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
    </View>
  );
}
