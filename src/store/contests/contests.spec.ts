import reducer from './reducer';
import { STORE_CONTESTS } from './types';
import { loadContests, storeContests } from './actions';

import ContestService from '../../services/ContestService';

jest.mock('../../services/ContestService', () => ({
    __esModule: true,
    default: {
        getActiveContests: jest.fn(),
    },
}));

const mockedContestService = ContestService as jest.Mocked<typeof ContestService>;

describe('contests store', () => {
    it('returns initial state', () => {
        expect(reducer(undefined, { type: 'UNKNOWN' } as any)).toEqual([]);
    });

    it('stores contests in reducer', () => {
        const contests = [{ id: 1 }, { id: 2 }] as any;
        const action = storeContests(contests as any);

        expect(action.type).toBe(STORE_CONTESTS);
        expect(reducer([], action)).toEqual(contests);
    });

    it('loads contests and dispatches store action', async () => {
        mockedContestService.getActiveContests.mockResolvedValue({
            data: { results: [{ id: 7 }] },
        } as any);
        const dispatch = jest.fn();

        await loadContests()(dispatch as any);

        expect(mockedContestService.getActiveContests).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
            type: STORE_CONTESTS,
            payload: { contests: [{ id: 7 }] },
        });
    });
});
