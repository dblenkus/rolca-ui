import reducer from './reducer';
import {
    addNotificationError,
    addNotificationInfo,
    addNotificationSuccess,
    addNotificationWarning,
    deleteMessage,
    deleteMessageWithDelay,
} from './actions';
import { ADD_NOTIFICATION, DELETE_NOTIFICATION } from './types';

describe('notifications store', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('adds and deletes notifications', () => {
        const firstState = reducer([], addNotificationError('error'));
        const secondState = reducer(firstState, addNotificationSuccess('ok'));

        expect(firstState[0].message).toBe('error');
        expect(firstState[0].severity).toBe('error');
        expect(secondState[1].id).toBeGreaterThan(secondState[0].id);

        const deleted = reducer(secondState, deleteMessage(secondState[0].id));
        expect(deleted).toHaveLength(1);
        expect(deleted[0].message).toBe('ok');
    });

    it('builds action creators with expected severity', () => {
        expect(addNotificationWarning('warn')).toEqual({
            type: ADD_NOTIFICATION,
            payload: { message: 'warn', severity: 'warning' },
        });
        expect(addNotificationInfo('info')).toEqual({
            type: ADD_NOTIFICATION,
            payload: { message: 'info', severity: 'info' },
        });
        expect(deleteMessage(5)).toEqual({
            type: DELETE_NOTIFICATION,
            meta: { notificationId: 5 },
        });
    });

    it('dispatches delayed delete', () => {
        const dispatch = jest.fn();
        deleteMessageWithDelay(9)(dispatch as any);

        expect(dispatch).not.toHaveBeenCalled();
        jest.advanceTimersByTime(5000);
        expect(dispatch).toHaveBeenCalledWith({
            type: DELETE_NOTIFICATION,
            meta: { notificationId: 9 },
        });
    });
});
