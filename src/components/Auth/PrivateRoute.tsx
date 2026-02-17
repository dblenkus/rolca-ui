import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { userContext } from '../../components/Auth/AuthProvider';

const PrivateRoute: React.FC<RouteProps> = ({ component: Component, ...rest }) => {
    const user = React.useContext(userContext);

    return (
        <Route
            {...rest}
            render={(props) =>
                // fakeAuth.isAuthenticated ? (
                user.isLoggedIn() ? (
                    Component ? (
                        React.createElement(Component as React.ComponentType<any>, props as any)
                    ) : null
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
