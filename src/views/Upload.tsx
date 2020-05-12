import { filter, find, map } from 'lodash';
import React from 'react';

import { Button, Grid } from '@material-ui/core';
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';

import ThemeField from '../components/Field/ThemeField';

import { ThemeError, ThemeMeta, ThemeModel } from '../types/models';
import validate from '../utils/validate';

const themes: ThemeMeta[] = [
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
];

interface UploadViewState {
    inputs: ThemeModel[];
    errors: ThemeError[];
}

const styles = ({ spacing }: Theme) => ({
    submit: {
        padding: spacing(2),
    },
});

class UploadView extends React.Component<WithStyles<typeof styles>, UploadViewState> {
    state = {
        inputs: [] as ThemeModel[],
        errors: [] as ThemeError[],
    };

    handleUpload = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();
        const { inputs } = this.state;

        const errors = await validate(inputs);
        if (errors === null) {
            console.log(inputs);
        } else {
            this.setState({ errors });
        }
    };

    handleChange = ({ id, submissions }: ThemeModel): void => {
        this.setState((state) => {
            let { inputs } = state;
            inputs = filter(inputs, (i) => i.id !== id);
            if (submissions.length) inputs.push({ id, submissions });
            return { inputs };
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
                        {map(themes, (theme) => {
                            const input =
                                find(inputs, (i) => i.id === theme.id) || this.newTheme(theme.id);
                            const error =
                                find(errors, (i) => i.id === theme.id) || this.emptyError(theme.id);

                            return (
                                <ThemeField
                                    key={theme.id}
                                    theme={theme}
                                    inputs={input}
                                    errors={error}
                                    onChange={this.handleChange}
                                />
                            );
                        })}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Upload
                        </Button>
                    </form>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(UploadView);
