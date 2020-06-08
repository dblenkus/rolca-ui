import React from 'react';

import { Typography } from '@material-ui/core';

class UploadConfirmView extends React.Component {
    render() {
        return (
            <>
                <Typography align="center" variant="h3">
                    Thank you for uploading photos!
                </Typography>
                <Typography align="center" variant="body1">
                    Your submission was submitted successfully.
                </Typography>
            </>
        );
    }
}

export default UploadConfirmView;
