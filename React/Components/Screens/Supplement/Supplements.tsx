import {useCallback, useContext, useEffect, useState} from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
} from 'react-native';

import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {useFocusEffect} from '@react-navigation/native';

import {AuthStateContext} from '../../../Context/AuthContext';
import {MySupplementsNavigationProps} from '../../../Navigation/Components/SupplementNavigation';
import AlertStyled from '../../Parts/Alert';
import FloatingButton from '../../Parts/FloatingButton';
import LoadingStyled from '../../Parts/Loading';
import SupplementList from '../../Parts/SupplementList';
import Icon from '../../../Utilities/Icons';
import SupplementUtilities from '../../../Utilities/SupplementUtilities';
import {GenderType, UserSupplement} from '../../../Utilities/User';

import COLORS from '../../../Assets/Styles/Colors.json';
import SIZES from '../../../Assets/Styles/Sizes.json';
import STYLES from '../../../Assets/Styles/Styles';
import DICTIONARY from '../../../Assets/Lang/PL.json';

export default function SupplementsScreen({
  navigation,
  route,
}: MySupplementsNavigationProps) {
  const {user} = useContext(AuthStateContext);
  const [initializing, setInitializing] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [refreshState, setRefreshState] = useState<number>(0);

  const [supplements, setSupplements] = useState<UserSupplement[]>([]);
  const [mainColor, setMainColor] = useState<string>('gold');
  const [showLabelButton, setShowLabelButton] = useState<boolean>(true);

  const [dialogItemId, setDialogItemId] = useState<number>(0);
  const [dialogTitle, setDialogTitle] = useState<string>('');
  const [dialogDescription, setDialogDescription] = useState<string>('');
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [dialogType, setDialogType] = useState<'renew' | 'remove' | null>();

  useEffect(() => {
    if (route.params?.addedSupplement == true) {
      setTimeout(() => {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: DICTIONARY.AlertSave,
          textBody: DICTIONARY.AlertSaveMessage_Supplement,
        });
        getSupplementsData();
      }, 1000);
    }
  }, [route.params?.addedSupplement]);

  useFocusEffect(
    useCallback(() => {
      if (user) {
        getSupplementsData();
        setInitializing(false);
      }
    }, [user]),
  );

  const getSupplementsData = () => {
    if (user) {
      const genderDB = user.getProfile('gender') as number;
      if (genderDB == GenderType.Female) {
        setMainColor(COLORS.female);
      } else if (genderDB == GenderType.Male) {
        setMainColor(COLORS.male);
      }
      setSupplements(user.getSupplements());
      setRefreshState(prevState => prevState + 1);
    }
  };

  const onRefresh = async () => {
    if (user) {
      setRefreshing(true);

      try {
        await user.refreshUserData();
        getSupplementsData();
      } finally {
        setRefreshing(false);
      }
    }
  };

  const onScroll = ({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
    setShowLabelButton(scrollPosition <= 0);
  };

  const onEditItem = (itemId: number) => {
    navigation.navigate('AddSupplement', {
      supplementId: supplements[itemId].id,
    });
  };

  const onRenewItem = (itemId: number) => {
    const supplement = supplements[itemId];
    const name = supplement.name;
    const value = supplement.defaultValue;
    const unit = SupplementUtilities.getUnitText(supplement.unit);
    const days = Math.floor(value / supplement.serve);
    const suffixDays = days == 1 ? DICTIONARY.day : DICTIONARY.days;

    setDialogItemId(supplements[itemId].id);
    setDialogTitle(DICTIONARY.AlertQuestion_TitleSupplementRenew);
    setDialogDescription(
      `${DICTIONARY.AlertQuestion_MessageSupplementRenew}: ${name}?\n${DICTIONARY.SupplementDefaultValue}: ${value} ${unit} (${DICTIONARY.approx} ${days} ${suffixDays})`,
    );
    setDialogType('renew');
    setDialogVisible(true);
  };

  const onRemoveItem = (itemId: number) => {
    const supplement = supplements[itemId];
    const name = supplement.name;
    const value = supplement.currentValue;
    const unit = SupplementUtilities.getUnitText(supplement.unit);
    const days = Math.floor(value / supplement.serve);
    const suffixDays = days == 1 ? DICTIONARY.day : DICTIONARY.days;

    setDialogItemId(supplements[itemId].id);
    setDialogTitle(DICTIONARY.AlertQuestion_TitleSupplementRemove);
    setDialogDescription(
      `${DICTIONARY.AlertQuestion_MessageSupplementRemove}: ${name}?\n${DICTIONARY.SupplementRemainingValue}: ${value} ${unit} (${DICTIONARY.approx} ${days} ${suffixDays})`,
    );
    setDialogType('remove');
    setDialogVisible(true);
  };

  const onDialogAccept = async () => {
    setDialogVisible(false);
    if (user) {
      if (dialogType == 'renew') {
        try {
          await user.renewSupplement(dialogItemId);
        } finally {
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: DICTIONARY.AlertRenew,
            textBody: DICTIONARY.AlertRenewMessage_Supplement,
          });
          setSupplements(user.getSupplements());
          setRefreshState(prevState => prevState + 1);
        }
      } else if (dialogType == 'remove') {
        try {
          await user.removeSupplement(dialogItemId);
        } finally {
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: DICTIONARY.AlertRemove,
            textBody: DICTIONARY.AlertRemoveMessage_Supplement,
          });
          setSupplements(user.getSupplements());
          setRefreshState(prevState => prevState + 1);
          await user.updateDateProgressByChanges('AddSupplement');
        }
      }
    }
  };

  const onDialogCancel = () => {
    setDialogVisible(false);
  };

  if (initializing) {
    return <LoadingStyled />;
  }

  return (
    <View style={STYLES.container}>
      {supplements.length > 0 ? (
        <FlatList
          data={supplements.sort((a, b) => a.name.localeCompare(b.name))}
          extraData={refreshState}
          keyExtractor={(item, index) => index.toString()}
          onScroll={onScroll}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              colors={[COLORS.white]}
              refreshing={refreshing}
              onRefresh={onRefresh}
              progressBackgroundColor={COLORS.grey}
            />
          }
          renderItem={({item, index}) => (
            <>
              <SupplementList
                name={item.name}
                value={item.currentValue}
                serve={item.serve}
                unit={item.unit}
                mainColor={mainColor}
                onPressEdit={() => onEditItem(index)}
                onPressRenew={() => onRenewItem(index)}
                onPressRemove={() => onRemoveItem(index)}
              />
            </>
          )}
          style={STYLES.flatListBottomMargin}
          accessible={true}
          accessibilityLabel={DICTIONARY.SupplementList}
        />
      ) : (
        <View style={STYLES.noContentContainer}>
          <Text style={[STYLES.noContentText]}>
            {DICTIONARY.SupplementsEmpty}
          </Text>
          <Icon
            type="FontAwesome6"
            name="arrow-trend-down"
            color={COLORS.inputTextDefault}
            size={SIZES.iconEmptySize}
            style={{top: SIZES.iconEmptyTop}}
          />
        </View>
      )}
      <FloatingButton
        icon="plus-thick"
        label={DICTIONARY.SupplementAdd}
        onPress={() => navigation.navigate('AddSupplement')}
        extended={showLabelButton}
        colorBackground={mainColor}
      />
      <AlertStyled
        icon={dialogType == 'renew' ? 'autorenew' : 'delete'}
        iconColor={dialogType == 'renew' ? COLORS.male : COLORS.red}
        title={dialogTitle}
        description={dialogDescription}
        visible={dialogVisible}
        onDialogAccept={onDialogAccept}
        onDialogCancel={onDialogCancel}
        onDialogDismiss={onDialogCancel}
      />
    </View>
  );
}
