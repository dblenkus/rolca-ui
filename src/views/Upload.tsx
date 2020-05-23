import { filter, find, map } from 'lodash';
import React from 'react';

import { Button, Card, CardContent, CardHeader, Grid } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';

import AuthorField from '../components/Field/AuthodField';
import ThemeField from '../components/Field/ThemeField';

import {
    AuthorModel,
    ContestError,
    ContestMeta,
    ContestModel,
    ThemeError,
    ThemeModel,
} from '../types/models';
import { uploadFormStyles } from '../styles/general';
import upload from '../utils/upload';
import validate from '../utils/validate';

const contest: ContestMeta = {
    themes: [
        {
            id: 1,
            title: 'My theme',
            imageNumber: 3,
            isSeries: false,
        },
        {
            id: 2,
            title: 'My series',
            imageNumber: 4,
            isSeries: true,
        },
    ],
};

interface UploadViewProps extends WithStyles<typeof uploadFormStyles> {}

interface UploadViewState {
    inputs: ContestModel;
    errors: ContestError;
}

class UploadView extends React.Component<UploadViewProps, UploadViewState> {
    state = {
        inputs: {
            author: { first_name: '', last_name: '', email: '' },
            themes: [],
        } as ContestModel,
        errors: {
            author: { first_name: null, last_name: null, email: null },
            themes: [],
        } as ContestError,
    };

    handleUpload = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();
        const { inputs } = this.state;

        const errors = await validate(inputs);
        if (errors === null) {
            upload(inputs);
        } else {
            this.setState({ errors });
        }
    };

    handleThemeChange = ({ id, submissions }: ThemeModel): void => {
        this.setState((state) => {
            let {
                inputs: { themes, author },
            } = state;
            themes = filter(themes, (i) => i.id !== id);
            if (submissions.length) themes.push({ id, submissions });
            return { inputs: { author, themes } };
        });
    };

    handleAuthorChange = (author: AuthorModel): void => {
        this.setState((state) => {
            const {
                inputs: { themes },
            } = state;
            return { inputs: { author, themes } };
        });
    };

    newTheme = (id: number): ThemeModel => ({ id, submissions: [] });
    emptyError = (id: number): ThemeError => ({ id, submissions: [] });

    render(): React.ReactNode {
        const { classes } = this.props;
        const { errors, inputs } = this.state;

        return (
            <Grid container>
                <Grid item xs={12}>
                    <form onSubmit={this.handleUpload} noValidate>
                        <Card className={classes.themeCard} raised>
                            <CardHeader
                                title="Author"
                                titleTypographyProps={{ align: 'center', variant: 'h3' }}
                            />
                            <CardContent>
                                <Grid container justify="center" spacing={2}>
                                    <AuthorField
                                        onChange={this.handleAuthorChange}
                                        inputs={inputs.author}
                                        errors={errors.author}
                                    />
                                </Grid>
                            </CardContent>
                        </Card>

                        {map(contest.themes, (theme) => {
                            const input =
                                find(inputs.themes, (i) => i.id === theme.id) ||
                                this.newTheme(theme.id);
                            const error =
                                find(errors.themes, (i) => i.id === theme.id) ||
                                this.emptyError(theme.id);

                            return (
                                <ThemeField
                                    key={theme.id}
                                    theme={theme}
                                    inputs={input}
                                    errors={error}
                                    onChange={this.handleThemeChange}
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

export default withStyles(uploadFormStyles)(UploadView);
