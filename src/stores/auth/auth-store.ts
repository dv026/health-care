import { makeAutoObservable } from 'mobx';
import { IUser } from '../../interfaces/user';
import { Nullable } from '../../types/index';

export class AuthStore {
  constructor() {
    makeAutoObservable(this)
  }
  user: Nullable<IUser> = null

  setUser(user: IUser) {
    this.user = user
  }
}