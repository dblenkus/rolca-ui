import fetchAll from './fetchAll';
import { apiClient } from '../services/Base';

jest.mock('../services/Base', () => ({
    apiClient: {
        get: jest.fn(),
    },
}));

const mockedGet = apiClient.get as jest.Mock;

describe('fetchAll', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('fetches all paginated pages', async () => {
        const resource = jest.fn().mockResolvedValue({
            data: {
                count: 3,
                results: [1],
                next: 'http://api.test/items?page=2',
                previous: null,
            },
        });
        mockedGet.mockResolvedValue({
            data: {
                count: 3,
                results: [2, 3],
                next: null,
                previous: 'https://api.test/items?page=1',
            },
        });

        const result = await fetchAll<number>(resource as any);

        expect(resource).toHaveBeenCalledTimes(1);
        expect(mockedGet).toHaveBeenCalledWith('https://api.test/items?page=2');
        expect(result).toEqual([1, 2, 3]);
    });

    it('returns the first page when there is no next link', async () => {
        const resource = jest.fn().mockResolvedValue({
            data: {
                count: 1,
                results: [7],
                next: null,
                previous: null,
            },
        });

        const result = await fetchAll<number>(resource as any);

        expect(mockedGet).not.toHaveBeenCalled();
        expect(result).toEqual([7]);
    });
});
