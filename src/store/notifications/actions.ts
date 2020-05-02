import {
    ADD_NOTIFICATION,
    DELETE_NOTIFICATION,
    AddNotificationAction,
    DeleteNotificationAction,
    SeverityLevels,
} from './types';

const addNotification = (message: string, severity: SeverityLevels): AddNotificationAction => ({
    type: ADD_NOTIFICATION,
    payload: { message, severity },
});

export const addNotificationError = (newMessage: string): AddNotificationAction =>
    addNotification(newMessage, 'error');

export const addNotificationWarning = (newMessage: string): AddNotificationAction =>
    addNotification(newMessage, 'warning');

export const addNotificationInfo = (newMessage: string): AddNotificationAction =>
    addNotification(newMessage, 'info');

export const addNotificationSuccess = (newMessage: string): AddNotificationAction =>
    addNotification(newMessage, 'success');

export const deleteMessage = (notificationId: number): DeleteNotificationAction => ({
    type: DELETE_NOTIFICATION,
    meta: { notificationId },
});

export const deleteMessageWithDelay = (notificationId: number): Function => (
    dispatch: Function,
) => {
    setTimeout(() => {
        dispatch(deleteMessage(notificationId));
    }, 5000);
};
