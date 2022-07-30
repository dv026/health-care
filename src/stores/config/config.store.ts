import { makeAutoObservable } from 'mobx';

import { IConfig } from './../../interfaces/config';

export class ConfigStore {
  constructor() {
    makeAutoObservable(this)
  }
  
  config: IConfig = {} as IConfig

  setConfig(config: IConfig) {
    this.config = config
  }
}