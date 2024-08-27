import React, {useState, useCallback} from 'react';

import {
  CalendarProvider,
  LocaleConfig,
  ExpandableCalendar,
} from 'react-native-calendars';
import {Positions} from 'react-native-calendars/src/expandableCalendar';

import {HomeStateContext} from '../../../Context/HomeContext';
import {
  HomeNavigationProps,
  HomeTopNavigation,
} from '../../../Navigation/Components/HomeNavigation';
import Icon from '../../../Utilities/Icons';

import COLORS from '../../../Assets/Styles/Colors.json';

LocaleConfig.locales['pl'] = {
  monthNames: [
    'Styczeń',
    'Luty',
    'Marzec',
    'Kwiecień',
    'Maj',
    'Czerwiec',
    'Lipiec',
    'Sierpień',
    'Wrzesień',
    'Październik',
    'Listopad',
    'Grudzień',
  ],
  monthNamesShort: [
    'STY',
    'LUT',
    'MAR',
    'KWI',
    'MAJ',
    'CZE',
    'LIP',
    'SIE',
    'WRZ',
    'PAŹ',
    'LIS',
    'GRU',
  ],
  dayNames: [
    'Niedziela',
    'Poniedziałek',
    'Wtorek',
    'Środa',
    'Czwartek',
    'Piątek',
    'Sobota',
  ],
  dayNamesShort: ['N', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb'],
  today: 'Dziś',
};

LocaleConfig.defaultLocale = 'pl';

export default function HomeScreen({navigation, route}: HomeNavigationProps) {
  const [dateSelected, setDateSelected] = useState<string>(
    new Date().toISOString().split('T')[0],
  );

  const onDateChanged = useCallback((date: string) => {
    setDateSelected(date);
  }, []);

  return (
    <CalendarProvider date={dateSelected} onDateChanged={onDateChanged}>
      <ExpandableCalendar
        firstDay={1}
        initialPosition={Positions.CLOSED}
        theme={{
          dayTextColor: COLORS.white,
          selectedDayTextColor: COLORS.grey,
          calendarBackground: COLORS.grey,
          todayTextColor: COLORS.gold,
          selectedDayBackgroundColor: COLORS.gold,
          monthTextColor: COLORS.gold,
        }}
        renderArrow={direction => (
          <Icon
            name={direction === 'left' ? 'caretleft' : 'caretright'}
            type="AntDesign"
            color={COLORS.gold}
            size={13}
          />
        )}
      />
      <HomeStateContext.Provider value={{dateSelected}}>
        <HomeTopNavigation />
      </HomeStateContext.Provider>
    </CalendarProvider>
  );
}
