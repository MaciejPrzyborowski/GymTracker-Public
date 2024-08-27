import {createContext} from 'react';

type HomeStateType = {
  dateSelected: string;
};

const currentDate = new Date().toISOString().split('T')[0];

export const HomeStateContext = createContext<HomeStateType>({
  dateSelected: currentDate,
});
