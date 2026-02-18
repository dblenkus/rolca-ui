import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { deleteMessage, deleteMessageWithDelay } from '../../store/notifications/actions';
import { Notification } from '../../store/notifications/types';
import { AppDispatch, AppState } from '../../store';

const Notifications: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const notification: Notification | undefined = useSelector((store: AppState) => {
        const { notifications } = store;
        return notifications[notifications.length - 1];
    });

    React.useEffect(() => {
        if (!notification) return;
        dispatch(deleteMessageWithDelay(notification.id));
    }, [dispatch, notification]);

    const handleClose = () => {
        dispatch(deleteMessage(notification?.id || -1));
    };

    return notification !== undefined ? (
        <Snackbar
            open={notification !== undefined}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transitionDuration={{ enter: 500 }}
            // This is required to trigger the animation on the following notification.
            key={notification.id}
        >
            <Alert severity={notification.severity} variant="filled" onClose={handleClose}>
                {notification.message}
            </Alert>
        </Snackbar>
    ) : (
        <></>
    );
};

export default Notifications;
