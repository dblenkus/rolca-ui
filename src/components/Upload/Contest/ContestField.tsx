import React from 'react';

import { withStyles, WithStyles } from '@material-ui/core/styles';

import { Button, CircularProgress, Grid, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { uploadFormStyles } from '../../../styles/general';
import { InputChange, ContestModel } from '../../../types/models';

import HeaderImage from '../../Layout/HeaderImage';
import AuthorField from '../Author/AuthorField';
import ThemeField from '../Theme/ThemeField';

interface ContestFieldProps extends WithStyles<typeof uploadFormStyles> {
    contest: ContestModel;
    handleAuthorChange: (payload: InputChange) => void;
    handleSubmissionChange: (theme_id: number, submission_id: number, payload: InputChange) => void;
    handleImageChange: (
        theme_id: number,
        submission_id: number,
        image_id: number,
        payload: { file: File | undefined },
    ) => void;
    handleSubmit: () => void;
    uploading: boolean;
}

class ContestField extends React.Component<ContestFieldProps> {
    render(): React.ReactNode {
        const { classes } = this.props;

        const {
            contest,
            handleAuthorChange,
            handleSubmissionChange,
            handleImageChange,
            handleSubmit,
            uploading,
        } = this.props;

        const handleClick = (event: React.FormEvent): void => {
            event.preventDefault();
            handleSubmit();
        };

        const onSubmissionChange = (theme_id: number) => (
            submission_id: number,
            payload: { name: string; value: string },
        ): void => handleSubmissionChange(theme_id, submission_id, payload);

        const onImageChange = (theme_id: number) => (
            submission_id: number,
            image_id: number,
            payload: { file: File | undefined },
        ): void => {
            handleImageChange(theme_id, submission_id, image_id, payload);
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
                                    handleSubmissionChange={onSubmissionChange(theme.meta.id)}
                                    handleImageChange={onImageChange(theme.meta.id)}
                                />
                            );
                        })}
                        {contest.errors.hasError && (
                            <Alert className={classes.errorAlert} severity="error">
                                Please fix errors before uploading.
                            </Alert>
                        )}
                        {uploading ? (
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <CircularProgress />
                            </div>
                        ) : (
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submitButton}
                            >
                                Upload
                            </Button>
                        )}
                    </form>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(uploadFormStyles)(ContestField);
