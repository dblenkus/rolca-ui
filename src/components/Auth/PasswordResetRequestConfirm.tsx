import React from 'react';

import Confirm from './utils/Confirm';

interface PasswordResetRequestConfirmProps {
    email: string;
}

const PasswordResetRequestConfirm: React.FC<PasswordResetRequestConfirmProps> = (props) => {
    const { email } = props;

    return (
        <Confirm title={'Email sent to ' + email}>
            To get back into your account, follow the instruction we've sent you to your {email}
            email address.
        </Confirm>
    );
};

export default PasswordResetRequestConfirm;
