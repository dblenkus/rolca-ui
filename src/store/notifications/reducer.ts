import {
    ADD_NOTIFICATION,
    DELETE_NOTIFICATION,
    Notification,
    NotificationsActionTypes,
    NotificationsState,
} from './types';

const initialState: { notifications: Notification[] } = {
    notifications: [],
};

let nextId = 1;

const reducer = (state = initialState, action: NotificationsActionTypes): NotificationsState => {
    switch (action.type) {
        case ADD_NOTIFICATION:
            const { message, severity } = action.payload;
            const newNotification = { id: nextId, message, severity };
            nextId += 1;
            return { notifications: [...state.notifications, newNotification] };

        case DELETE_NOTIFICATION:
            return {
                notifications: state.notifications.filter(
                    (notification: Notification) => notification.id !== action.meta.notificationId,
                ),
            };

        default:
            return state;
    }
};

export default reducer;
