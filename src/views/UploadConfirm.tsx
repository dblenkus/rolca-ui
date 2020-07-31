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
                    <br />
                    Your photos have been uploaded successfully.
                    <br />
                    <br />
                    Thank you for entering the 2nd International Salon of Photography
                    DRONE&ASTROPHOTOGRAPHY 2020! Wishing you a successfull participation.
                    <br />
                    You can review your submission any time{' '}
                    <a href="#" onClick={this.handleClick}>
                        here
                    </a>
                    .<br />
                    <br />
                    Participation fee is required for all participants and is:
                    <br /> <br />
                    20 EUR for participation in 1 or 2 themes
                    <br />
                    30 EUR for participation in 3 or 4 themes
                    <br /> <br />
                    The fee can be paid via PayPal or by bank transfer to Digitalni foto klub,
                    Ljubljanska cesta 14, 3000 Celje, Slovenija – IBAN SI56 0510 0801 5944 658, BIC
                    code: ABANSI2X. Please make sure you include name of participant!
                    <br />
                    <br />
                    <form
                        action="https://www.paypal.com/cgi-bin/webscr"
                        method="post"
                        target="_top"
                    >
                        <input type="hidden" name="cmd" value="_s-xclick" />
                        <input type="hidden" name="hosted_button_id" value="UWS4LED45Q5P2" />
                        <table style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                            <tr>
                                <td>
                                    <input
                                        type="hidden"
                                        name="on0"
                                        value="number of themes / število tem"
                                    />
                                    number of themes
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <select name="os0">
                                        <option value="1 or 2 themes / 1 ali 2 temi">
                                            1 or 2 themes - €20.00 EUR
                                        </option>
                                        <option value="3 or 4 themes / 3 ali 4 teme">
                                            3 or 4 themes - €30.00 EUR
                                        </option>
                                    </select>
                                </td>
                            </tr>
                        </table>
                        <input type="hidden" name="currency_code" value="EUR" />
                        <input
                            type="image"
                            src="https://www.paypalobjects.com/en_US/i/btn/btn_paynowCC_LG.gif"
                            name="submit"
                            alt="PayPal - The safer, easier way to pay online!"
                        />
                        <img
                            alt=""
                            src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif"
                            width="1"
                            height="1"
                        />
                    </form>
                    <br />
                    ****************
                    <br />
                    <br />
                    Vaše fotografije so bile uspešno naložene.
                    <br />
                    <br />
                    Hvala za sodelovanje na 2. Mednarodnem Salonu Fotografije DRONE&ASTROPHOTOGRAPHY
                    2020! Želimo vam uspešno sodelovanje.
                    <br />
                    Vašo prijavo lahko kadarkoli ponovno pregledate{' '}
                    <a href="#" onClick={this.handleClick}>
                        tukaj
                    </a>
                    .<br />
                    <br />
                    Za sodelovanje na natečaju je potrebno poravnati prijavnino:
                    <br /> <br />
                    20 EUR za sodelovanje v 1 ali 2 temah
                    <br />
                    30 EUR za sodelovanje v 3 ali 4 temah
                    <br /> <br />
                    Prijavnino lahko poravnate preko Paypala ali z nakazilom na bančni račun,
                    Digitalni foto klub, Ljubljanska cesta 14, 3000 Celje, Slovenija – IBAN SI56
                    0510 0801 5944 658, BIC code: ABANSI2X. Obvezno navedite ime in priimek
                    sodelujočega.
                    <br />
                    <br />
                    <form
                        action="https://www.paypal.com/cgi-bin/webscr"
                        method="post"
                        target="_top"
                    >
                        <input type="hidden" name="cmd" value="_s-xclick" />
                        <input type="hidden" name="hosted_button_id" value="UWS4LED45Q5P2" />
                        <table style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                            <tr>
                                <td>
                                    <input
                                        type="hidden"
                                        name="on0"
                                        value="number of themes / število tem"
                                    />
                                    število tem
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <select name="os0">
                                        <option value="1 or 2 themes / 1 ali 2 temi">
                                            1 ali 2 temi - €20.00 EUR
                                        </option>
                                        <option value="3 or 4 themes / 3 ali 4 teme">
                                            3 ali 4 teme - €30.00 EUR
                                        </option>
                                    </select>
                                </td>
                            </tr>
                        </table>
                        <input type="hidden" name="currency_code" value="EUR" />
                        <input
                            type="image"
                            src="https://www.paypalobjects.com/en_US/i/btn/btn_paynowCC_LG.gif"
                            name="submit"
                            alt="PayPal - The safer, easier way to pay online!"
                        />
                        <img
                            alt=""
                            src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif"
                            width="1"
                            height="1"
                        />
                    </form>
                </Typography>
            </>
        );
    }
}

export default UploadConfirmView;
