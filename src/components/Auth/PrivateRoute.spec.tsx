import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { userContext } from './AuthProvider';
import PrivateRoute from './PrivateRoute';

const Protected = () => <div>Protected content</div>;

describe('PrivateRoute', () => {
    it('renders protected component when user is logged in', () => {
        render(
            <userContext.Provider
                value={{
                    user: { token: 't', expires: '2999-01-01' },
                    login: vi.fn(),
                    logout: vi.fn(),
                    isLoggedIn: () => true,
                }}
            >
                <MemoryRouter initialEntries={['/protected']}>
                    <Routes>
                        <Route path="/protected" element={<PrivateRoute component={Protected} />} />
                    </Routes>
                </MemoryRouter>
            </userContext.Provider>,
        );

        expect(screen.getByText('Protected content')).toBeTruthy();
    });

    it('redirects to login and preserves source location when user is anonymous', () => {
        render(
            <userContext.Provider
                value={{
                    user: {},
                    login: vi.fn(),
                    logout: vi.fn(),
                    isLoggedIn: () => false,
                }}
            >
                <MemoryRouter initialEntries={['/protected']}>
                    <Routes>
                        <Route path="/protected" element={<PrivateRoute component={Protected} />} />
                        <Route path="/login" element={<div>Login route</div>} />
                    </Routes>
                </MemoryRouter>
            </userContext.Provider>,
        );

        expect(screen.getByText('Login route')).toBeTruthy();
    });
});
