import { makeAutoObservable } from 'mobx';

import { IConfig } from './../../interfaces/config';
import { Nullable } from '../../types/index';

export class ConfigStore {
  constructor() {
    makeAutoObservable(this)
  }

  config: Nullable<IConfig> = null

  setConfig(config: IConfig) {
    this.config = config
  }
}