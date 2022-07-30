import { makeAutoObservable } from 'mobx';
import { v4 } from 'uuid';

import { INotification, NotificationType } from './../../interfaces/notification';

export class NotificationStore {
  constructor() {
    makeAutoObservable(this)
  }

  notifications: INotification[] = []

  showNotification(notification: INotification) {
    const id = v4()
    notification.id = id
    this.notifications = [...this.notifications, notification]
    if (notification.type !== NotificationType.Error) {
      setTimeout(() => {
        this.closeNotification(id)
      }, 5000)
    }
  }

  closeNotification(id: string) {
    this.notifications = this.notifications.filter((notification) => notification.id !== id)
  }
}