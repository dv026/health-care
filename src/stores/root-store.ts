import React from 'react';

import { NotificationStore } from './notification/notification.store';
import { ConfigStore } from './config/config.store';
import { AuthStore } from './auth/auth.store';
import { EdibleListStore } from './edible-list/edible-list.store';

class RootStore {
  authStore: AuthStore = {} as AuthStore
  configStore: ConfigStore = {} as ConfigStore
  notificationStore: NotificationStore = {} as NotificationStore
  edibleListStore: EdibleListStore = {} as EdibleListStore

  constructor() {
    this.authStore = new AuthStore()
    this.configStore = new ConfigStore()
    this.notificationStore = new NotificationStore()
    this.edibleListStore = new EdibleListStore()
  }
}

const StoreContext = React.createContext(new RootStore())

export const useStore = () => React.useContext(StoreContext)