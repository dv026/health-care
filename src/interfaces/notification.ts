export enum NotificationType {
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
}

export interface INotification {
  type: NotificationType
  id?: string
  message?: string
}