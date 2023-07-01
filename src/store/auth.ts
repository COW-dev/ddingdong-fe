import { create } from 'zustand';
import { Auth } from '@/types';

type AuthStore = {
  auth: Auth;
  setAuth: (authInfo: Auth) => void;
  resetAuth: () => void;
};

const initialState: Auth = {
  role: '',
  token: '',
};

export const useAuthStore = create<AuthStore>((set) => ({
  auth: initialState,
  setAuth: (authInfo) => set({ auth: authInfo }),
  resetAuth: () => {
    set({
      auth: initialState,
    });
  },
}));
