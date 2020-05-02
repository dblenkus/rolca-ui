import React from 'react';

import { isEmpty } from 'lodash';

import UserService, { LoginPayload } from '../../services/UserService';

interface AuthProviderProps {
    children: React.ReactNode;
}

interface AuthProviderState {
    user: {} | { token: string; expires: string };
}

export const userContext = React.createContext({
    user: {},
    login: (payload: LoginPayload) => {},
    logout: () => {},
    isLoggedIn: (): boolean => {
        return false;
    },
});

class AuthProvider extends React.Component<AuthProviderProps, AuthProviderState> {
    state = {
        user: {},
    };

    constructor(props: AuthProviderProps) {
        super(props);

        this.state = { user: this.loadData() };
    }

    saveData = (data: any) => {
        localStorage.setItem('token', JSON.stringify(data));
    };

    loadData = () => {
        const tokenString = localStorage.getItem('token');
        if (!tokenString) return {};

        let user = {};
        try {
            user = JSON.parse(tokenString);
        } catch {
            localStorage.removeItem('token');
        }
        return user;
    };

    login = async (payload: LoginPayload): Promise<void> => {
        const { data } = await UserService.login(payload);
        this.setState({ user: data });
        this.saveData(data);
    };

    logout = () => {
        this.setState({ user: {} });
        this.saveData({});
    };

    isLoggedIn = (): boolean => !isEmpty(this.state.user);

    render() {
        const context = {
            user: this.state.user,
            login: this.login,
            logout: this.logout,
            isLoggedIn: this.isLoggedIn,
        };
        return <userContext.Provider value={context}>{this.props.children}</userContext.Provider>;
    }
}

export default AuthProvider;
