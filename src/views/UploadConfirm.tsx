import React from 'react';

import { Redirect } from 'react-router-dom';

import { Typography } from '@material-ui/core';

interface UploadConfirmViewState {
    redirect: boolean;
}

class UploadConfirmView extends React.Component<{}, UploadConfirmViewState> {
    state = {
        redirect: false,
    };

    handleClick = () => {
        this.setState({ redirect: true });
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to={'/user/submissions'} />;
        }

        return (
            <>
                <Typography align="center" variant="h3">
                    Thank you for uploading photos!
                </Typography>
                <Typography align="center" variant="body1">
                    Your photos have been uploaded successfully.
                    <br />
                    Thank you for entering the 2nd International Salon of Photography
                    DRONE&ASTROPHOTOGRAPHY 2020! Wishing you a successfull participation.
                    <br />
                    You can review your submission any time{' '}
                    <a href="#" onClick={this.handleClick}>
                        here
                    </a>
                    .
                    <br />
                    <br />
                    ***
                    <br />
                    <br />
                    Vaše fotografije so bile uspešno naložene.
                    <br />
                    Hvala za sodelovanje na 2. Mednarodnem Salonu Fotografije DRONE&ASTROPHOTOGRAPHY
                    2020! Želimo vam uspešno sodelovanje.
                    <br />
                    Vašo prijavo lahko kadarkoli ponovno pregledate{' '}
                    <a href="#" onClick={this.handleClick}>
                        tukaj
                    </a>
                    .
                </Typography>
            </>
        );
    }
}

export default UploadConfirmView;
