import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { userContext } from '../../components/Auth/AuthProvider';

interface PrivateRouteProps {
    component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component }) => {
    const user = React.useContext(userContext);
    const location = useLocation();

    if (!user.isLoggedIn()) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Component />;
};

export default PrivateRoute;
