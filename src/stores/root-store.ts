import React from 'react';
import { AuthStore } from './auth/auth-store';

class RootStore {
  authStore: AuthStore = {} as AuthStore
  constructor() {
    this.authStore = new AuthStore()
  }
}

const StoreContext = React.createContext(new RootStore())

export const useStore = () =>React.useContext(StoreContext)