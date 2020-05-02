import React from 'react';

import Confirm from './utils/Confirm';

interface RegisterConfirmProps {
    email: string;
}

const RegisterConfirm: React.FC<RegisterConfirmProps> = (props) => {
    const { email } = props;

    return (
        <Confirm title="Thanks for registration!">
            To activate your account, follow the instruction we've sent you to your {email}
            email address.
        </Confirm>
    );
};

export default RegisterConfirm;
