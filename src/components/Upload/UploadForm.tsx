import { filter, find, map } from 'lodash';
import React from 'react';

import { Button } from '@material-ui/core';
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';

import ThemeField from '../Field/ThemeField';

import { ThemeMeta, ThemeModel } from '../../types/models';

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

interface UploadFormState {
    inputs: ThemeModel[];
}

const styles = ({ spacing }: Theme) => ({
    submit: {
        padding: spacing(2),
    },
});

class UploadForm extends React.Component<WithStyles<typeof styles>, UploadFormState> {
    state = {
        inputs: [] as Array<ThemeModel>,
    };

    handleUpload = (event: React.FormEvent): void => {
        event.preventDefault();
        const { inputs } = this.state;
        console.log(inputs);
    };

    handleChange = ({ id, submissions }: ThemeModel): void => {
        this.setState((state) => {
            let { inputs } = state;
            inputs = filter(inputs, (i) => i.id !== id);
            inputs.push({ id, submissions });
            return { inputs };
        });
    };

    newTheme = (id: number): ThemeModel => ({
        id,
        submissions: [],
    });

    render(): React.ReactNode {
        const { classes } = this.props;
        const { inputs } = this.state;

        return (
            <form onSubmit={this.handleUpload}>
                {map(themes, (theme) => {
                    const input = find(inputs, (i) => i.id === theme.id) || this.newTheme(theme.id);
                    return (
                        <ThemeField
                            key={theme.id}
                            theme={theme}
                            inputs={input}
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
        );
    }
}

export default withStyles(styles)(UploadForm);
