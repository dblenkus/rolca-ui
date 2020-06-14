import React from 'react';

import { withStyles, WithStyles } from '@material-ui/core/styles';

import { Card, CardContent, CardHeader, Grid } from '@material-ui/core';

import InputField from './InputField';

import { uploadFormStyles } from '../../styles/general';
import { AuthorModel, InputChange } from '../../types/models';

interface AuthorFieldProps extends WithStyles<typeof uploadFormStyles> {
    author: AuthorModel;
    handleAUthorChange: (payload: InputChange) => void;
}

class AuthorField extends React.Component<AuthorFieldProps> {
    render(): React.ReactNode {
        const { classes, author, handleAUthorChange } = this.props;

        return (
            <Card className={classes.themeCard} raised>
                <CardHeader
                    title="Author"
                    titleTypographyProps={{ align: 'center', variant: 'h3' }}
                />
                <CardContent>
                    <Grid container justify="center" spacing={2}>
                        <Grid item xs={12} sm={6} md={4}>
                            <InputField
                                name="first_name"
                                value={author.first_name}
                                error={author.errors.first_name}
                                label="First name"
                                autoComplete="given-name"
                                autoFocus={true}
                                required={true}
                                onChange={handleAUthorChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <InputField
                                name="last_name"
                                value={author.last_name}
                                error={author.errors.last_name}
                                label="Last name"
                                autoComplete="family-name"
                                required={true}
                                onChange={handleAUthorChange}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(uploadFormStyles)(AuthorField);
