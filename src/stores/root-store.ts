import { ConfigStore } from './config/config.store';
import React from 'react';
import { AuthStore } from './auth/auth.store';

class RootStore {
  authStore: AuthStore = {} as AuthStore
  configStore: ConfigStore = {} as ConfigStore

  constructor() {
    this.authStore = new AuthStore()
    this.configStore = new ConfigStore()
  }
}

const StoreContext = React.createContext(new RootStore())

export const useStore = () => React.useContext(StoreContext)