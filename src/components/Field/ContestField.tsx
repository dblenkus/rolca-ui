import { find, map } from 'lodash';
import React from 'react';

import { withStyles, WithStyles } from '@material-ui/core/styles';

import { Button, Card, CardContent, CardHeader, Grid, Typography } from '@material-ui/core';

import { uploadFormStyles } from '../../styles/general';
import { InputChange, ThemeError, ContestModel, ContestError } from '../../types/models';

import AuthorField from './AuthorField';
import ThemeField from './ThemeField';

interface ContestFieldProps extends WithStyles<typeof uploadFormStyles> {
    inputs: ContestModel;
    errors: ContestError;
    handleAuthorChange: (payload: InputChange) => void;
    handleSubmissionChange: (theme_id: number, submission_id: number, payload: InputChange) => void;
    handleImageChange: (
        theme_id: number,
        submission_id: number,
        image_id: number,
        payload: { file: File },
    ) => void;
    handleImageRemove: (theme_id: number, submission_id: number, image_id: number) => void;
    handleSubmit: () => void;
}

class ContestField extends React.Component<ContestFieldProps> {
    render(): React.ReactNode {
        const { classes } = this.props;

        const {
            errors,
            inputs,
            handleAuthorChange,
            handleSubmissionChange,
            handleImageChange,
            handleImageRemove,
            handleSubmit,
        } = this.props;

        const handleClick = (event: React.FormEvent): void => {
            event.preventDefault();
            handleSubmit();
        };

        return (
            <Grid container>
                <Grid item xs={12}>
                    <Typography align="center" variant="h2">
                        {inputs.title}
                    </Typography>
                    <form onSubmit={handleClick} noValidate>
                        <Card className={classes.themeCard} raised>
                            <CardHeader
                                title="Author"
                                titleTypographyProps={{ align: 'center', variant: 'h3' }}
                            />
                            <CardContent>
                                <Grid container justify="center" spacing={2}>
                                    <AuthorField
                                        handleAUthorChange={handleAuthorChange}
                                        inputs={inputs.author}
                                        errors={errors.author}
                                    />
                                </Grid>
                            </CardContent>
                        </Card>

                        {map(inputs.themes, (theme) => {
                            const error = find(
                                errors.themes,
                                (i) => i.id === theme.id,
                            ) as ThemeError;

                            return (
                                <ThemeField
                                    key={theme.id}
                                    inputs={theme}
                                    errors={error}
                                    handleSubmissionChange={handleSubmissionChange}
                                    handleImageRemove={handleImageRemove}
                                    handleImageUpdate={handleImageChange}
                                />
                            );
                        })}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submitButton}
                        >
                            Upload
                        </Button>
                    </form>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(uploadFormStyles)(ContestField);
