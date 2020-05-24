import { find, map } from 'lodash';
import React from 'react';

import { connect, ConnectedProps } from 'react-redux';

import { Button, Card, CardContent, CardHeader, Grid } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';

import { AppState } from '../store';
import {
    authorUpdate,
    imageRemove,
    imageUpdate,
    submissionUpdate,
    uploadInit,
    uploadSubmit,
} from '../store/upload/actions';

import AuthorField from '../components/Field/AuthorField';
import ThemeField from '../components/Field/ThemeField';

import { InputChange, ThemeError } from '../types/models';
import { Contest } from '../types/api';
import { uploadFormStyles } from '../styles/general';

const contest: Contest = {
    id: 1,
    title: 'Test contest',
    themes: [
        {
            id: 1,
            title: 'My theme',
            n_photos: 3,
            is_series: false,
        },
        {
            id: 2,
            title: 'My series',
            n_photos: 4,
            is_series: true,
        },
    ],
    start_date: '2020-01-01T00:00:00Z',
    end_date: '2020-12-31T23:59:59Z',
};

interface UploadViewProps extends WithStyles<typeof uploadFormStyles>, PropsFromRedux {}

class UploadView extends React.Component<UploadViewProps> {
    componentDidMount() {
        const { uploadInit } = this.props;
        uploadInit(contest);
    }

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

const mapStateToProps = (state: AppState) => ({ ...state.upload });

const mapDispatchToProps = (dispatch: any) => ({
    uploadInit: (contest: Contest) => dispatch(uploadInit(contest)),
    handleAuthorChange: (payload: InputChange) => dispatch(authorUpdate(payload)),
    handleSubmissionChange: (theme_id: number, submission_id: number, payload: InputChange) =>
        dispatch(submissionUpdate(theme_id, submission_id, payload)),
    handleImageChange: (
        theme_id: number,
        submission_id: number,
        image_id: number,
        payload: { file: File },
    ) => dispatch(imageUpdate(theme_id, submission_id, image_id, payload)),
    handleImageRemove: (theme_id: number, submission_id: number, image_id: number) =>
        dispatch(imageRemove(theme_id, submission_id, image_id)),
    handleSubmit: () => dispatch(uploadSubmit()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default withStyles(uploadFormStyles)(connector(UploadView));
