import {useState, useEffect} from 'react';
import {Keyboard, Text} from 'react-native';

import STYLES from '../../Assets/Styles/Styles';
import DICTIONARY from '../../Assets/Lang/PL.json';

interface StorySetCopyrightProps {
  hide?: boolean;
}

export default function StorySetCopyright({
  hide = false,
}: StorySetCopyrightProps) {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <Text
      style={[
        STYLES.copyright,
        {display: keyboardVisible || hide ? 'none' : 'flex'},
      ]}>
      {DICTIONARY.storyset}
    </Text>
  );
}
