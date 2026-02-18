import reducer from './reducer';
import {
    getCurrentSubmission,
    getIsNext,
    getIsPrevious,
    initializeStore,
    performInitialize,
    setNextSubmission,
    setPreviousSubmission,
    setSubmission,
} from './actions';
import {
    PERFORM_INITIALIZE,
    SET_NEXT_SUBMISSION,
    SET_PREVIOUS_SUBMISSION,
    SET_SUBMISSION,
} from './types';

import ContestService from '../../services/ContestService';
import fetchAll from '../../utils/fetchAll';

vi.mock('../../services/ContestService', () => ({
    __esModule: true,
    default: {
        getContest: vi.fn(),
    },
}));

vi.mock('../../utils/fetchAll', () => ({
    __esModule: true,
    default: vi.fn(),
}));

const mockedContestService = ContestService as vi.Mocked<typeof ContestService>;
const mockedFetchAll = fetchAll as vi.Mock;

describe('jury store', () => {
    it('creates simple actions', () => {
        expect(setSubmission(3)).toEqual({ type: SET_SUBMISSION, payload: { submissionId: 3 } });
        expect(setPreviousSubmission()).toEqual({ type: SET_PREVIOUS_SUBMISSION });
        expect(setNextSubmission()).toEqual({ type: SET_NEXT_SUBMISSION });
    });

    it('reduces initialize and navigation actions', () => {
        const initialized = reducer(
            undefined,
            performInitialize(
                { id: 1 } as any,
                { id: 2 } as any,
                [{ id: 11 }, { id: 22 }] as any,
                1,
            ),
        );

        expect(initialized.isLoading).toBe(false);
        expect(initialized.currentIndex).toBe(1);

        const changed = reducer(initialized, setSubmission(11));
        expect(changed.currentIndex).toBe(0);

        const prev = reducer(changed, setPreviousSubmission());
        const next = reducer(prev, setNextSubmission());
        expect(next.currentIndex).toBe(changed.currentIndex);
    });

    it('falls back to index 0 when submission is missing', () => {
        const state = reducer(
            undefined,
            performInitialize(
                { id: 1 } as any,
                { id: 2 } as any,
                [{ id: 11 }, { id: 22 }] as any,
                0,
            ),
        );
        const changed = reducer(state, setSubmission(999));
        expect(changed.currentIndex).toBe(0);
    });

    it('initializes via thunk with chosen submission index', async () => {
        mockedContestService.getContest.mockResolvedValue({
            data: {
                id: 1,
                themes: [{ id: 3 }, { id: 4 }],
            },
        } as any);
        mockedFetchAll.mockResolvedValue([{ id: 100 }, { id: 200 }]);

        const dispatch = vi.fn();
        await initializeStore('1', '3', 200)(dispatch as any, (() => ({})) as any);

        expect(mockedContestService.getContest).toHaveBeenCalledWith('1');
        expect(dispatch).toHaveBeenCalledWith({
            type: PERFORM_INITIALIZE,
            payload: {
                contest: { id: 1, themes: [{ id: 3 }, { id: 4 }] },
                theme: { id: 3 },
                submissions: [{ id: 100 }, { id: 200 }],
                currentIndex: 1,
            },
        });
    });

    it('initializes via thunk and falls back to first submission when id is missing', async () => {
        mockedContestService.getContest.mockResolvedValue({
            data: {
                id: 1,
                themes: [{ id: 3 }],
            },
        } as any);
        mockedFetchAll.mockResolvedValue([{ id: 100 }, { id: 200 }]);

        const dispatch = vi.fn();
        await initializeStore('1', '3', 999)(dispatch as any, (() => ({})) as any);

        expect(dispatch).toHaveBeenCalledWith({
            type: PERFORM_INITIALIZE,
            payload: {
                contest: { id: 1, themes: [{ id: 3 }] },
                theme: { id: 3 },
                submissions: [{ id: 100 }, { id: 200 }],
                currentIndex: 0,
            },
        });
    });

    it('does not dispatch initialize when theme is missing', async () => {
        mockedContestService.getContest.mockResolvedValue({
            data: {
                id: 1,
                themes: [{ id: 7 }],
            },
        } as any);
        mockedFetchAll.mockResolvedValue([{ id: 100 }]);

        const dispatch = vi.fn();
        await initializeStore('1', '3', undefined)(dispatch as any, (() => ({})) as any);

        expect(dispatch).not.toHaveBeenCalled();
    });

    it('supports selectors', () => {
        const state = {
            jury: {
                submissions: [{ id: 1 }, { id: 2 }],
                currentIndex: 1,
            },
        } as any;

        expect(getCurrentSubmission(state)?.id).toBe(2);
        expect(getIsPrevious(state)).toBe(true);
        expect(getIsNext(state)).toBe(false);

        const empty = { jury: { submissions: null, currentIndex: 0 } } as any;
        expect(getCurrentSubmission(empty)).toBeNull();
        expect(getIsPrevious(empty)).toBe(false);
        expect(getIsNext(empty)).toBe(false);
    });
});
