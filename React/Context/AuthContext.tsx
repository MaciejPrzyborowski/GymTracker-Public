import {createContext} from 'react';

import {User} from '../Utilities/User';

type AuthStateType = {
  isCompletedProfile: boolean;
  setIsCompletedProfile: (value: boolean) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  user: User | null;
  setUser: (value: User | null) => void;
};

export const AuthStateContext = createContext<AuthStateType>({
  isCompletedProfile: false,
  setIsCompletedProfile() {},
  isLoggedIn: false,
  setIsLoggedIn() {},
  user: null,
  setUser() {},
});
