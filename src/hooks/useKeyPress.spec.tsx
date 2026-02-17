import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import useKeyPress from './useKeyPress';

const Probe = ({ onKey }: { onKey: (key: string) => void }) => {
    useKeyPress(onKey);
    return <div>probe</div>;
};

describe('useKeyPress', () => {
    it('calls handler on keydown and cleans up on unmount', () => {
        const onKey = jest.fn();
        const { unmount } = render(<Probe onKey={onKey} />);

        fireEvent.keyDown(window, { key: 'Escape' });
        expect(onKey).toHaveBeenCalledWith('Escape');

        unmount();
        fireEvent.keyDown(window, { key: 'Enter' });
        expect(onKey).toHaveBeenCalledTimes(1);
    });
});
