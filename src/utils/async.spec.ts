import { asyncMap } from './async';

describe('asyncMap', () => {
    it('maps values with an async mapper', async () => {
        const result = await asyncMap([1, 2, 3], async (value) => value * 2);
        expect(result).toEqual([2, 4, 6]);
    });
});
