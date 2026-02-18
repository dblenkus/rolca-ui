import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { contestMock } from '../../utils/tests/mocks';
import ContestCard from './ContestCard';

describe('ContestCard', () => {
    it('renders title and description', () => {
        render(
            <MemoryRouter>
                <ContestCard contest={contestMock} />
            </MemoryRouter>,
        );

        expect(screen.getByText(contestMock.title)).toBeTruthy();
        expect(screen.getByText(contestMock.description)).toBeTruthy();
    });

    it('renders open link to contest details', () => {
        render(
            <MemoryRouter>
                <ContestCard contest={contestMock} />
            </MemoryRouter>,
        );

        const openLink = screen.getByRole('link', { name: 'Open' });
        expect(openLink).toBeTruthy();
        expect(openLink.getAttribute('href')).toBe(`/contest/${contestMock.id}/details`);
    });
});
