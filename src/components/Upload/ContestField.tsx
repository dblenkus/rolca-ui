import React from 'react';

import { withStyles, WithStyles } from '@material-ui/core/styles';

import { Button, Grid, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { uploadFormStyles } from '../../styles/general';
import { InputChange, ContestModel } from '../../types/models';

import HeaderImage from '../Layout/HeaderImage';
import AuthorField from './AuthorField';
import ThemeField from './ThemeField';

interface ContestFieldProps extends WithStyles<typeof uploadFormStyles> {
    contest: ContestModel;
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
            contest,
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
                    {contest.meta.headerImage ? (
                        <HeaderImage src={contest.meta.headerImage} />
                    ) : (
                        <Typography align="center" variant="h2">
                            {contest.meta.title}
                        </Typography>
                    )}
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={handleClick} noValidate>
                        <AuthorField
                            handleAUthorChange={handleAuthorChange}
                            author={contest.author}
                        />

                        {contest.themes.map((theme) => {
                            return (
                                <ThemeField
                                    key={theme.meta.id}
                                    theme={theme}
                                    handleSubmissionChange={handleSubmissionChange}
                                    handleImageRemove={handleImageRemove}
                                    handleImageUpdate={handleImageChange}
                                />
                            );
                        })}
                        {contest.errors.hasError && (
                            <Alert className={classes.errorAlert} severity="error">
                                Please fix errors before uploading.
                            </Alert>
                        )}
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
