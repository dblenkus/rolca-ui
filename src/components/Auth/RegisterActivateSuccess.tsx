import React from 'react';

import Success from './utils/Success';

interface RegisterActivateSuccessProps {
    onClick: () => void;
}

const RegisterActivateSuccess: React.FC<RegisterActivateSuccessProps> = (props) => {
    const { onClick } = props;

    return (
        <Success title="Your account is now active!" buttonText="Go to Log in" onClick={onClick} />
    );
};

export default RegisterActivateSuccess;
