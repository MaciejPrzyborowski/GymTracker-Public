import DatePicker from 'react-native-date-picker';

import COLORS from '../../Assets/Styles/Colors.json';
import DICTIONARY from '../../Assets/Lang/PL.json';

interface DatePickerStyledProps {
  onConfirm: (date: Date) => void;
  title: string;
  date: Date;
  mode: 'date' | 'time' | 'datetime';
  open: boolean;
  onCancel: () => void;
}

export default function DatePickerStyled({
  onConfirm,
  title,
  date,
  mode,
  open,
  onCancel,
}: DatePickerStyledProps) {
  return (
    <DatePicker
      open={open}
      date={date}
      onConfirm={onConfirm}
      onCancel={onCancel}
      title={title}
      mode={mode}
      timeZoneOffsetInMinutes={0}
      modal
      theme="dark"
      buttonColor={COLORS.gold}
      dividerColor={COLORS.gold}
      cancelText={DICTIONARY.cancel}
      confirmText={DICTIONARY.confirm}
    />
  );
}
