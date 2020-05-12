import { filter, find, map, range, some } from 'lodash';

import React from 'react';

import { Card, CardContent, CardHeader, Grid } from '@material-ui/core';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

import SubmissionField from './SubmissionField';

import {
    SubmissionError,
    SubmissionModel,
    ThemeError,
    ThemeModel,
    ThemeMeta,
    SubmissionMeta,
} from '../../types/models';

interface ThemeFieldProps {
    theme: ThemeMeta;
    inputs: ThemeModel;
    error: ThemeError;
    onChange: (event: ThemeModel) => void;
}

const styles = ({ spacing }: Theme) =>
    createStyles({
        root: {
            margin: spacing(4, 0),
        },
    });

class ThemeField extends React.Component<ThemeFieldProps & WithStyles<typeof styles>> {
    propagateInputs = (theme: ThemeModel): void => {
        const { onChange } = this.props;
        if (onChange) onChange(theme);
    };

    handleChange = ({ id, title, description, files }: SubmissionModel): void => {
        const { inputs } = this.props;
        const submissions = filter(inputs.submissions, (sub) => sub.id !== id);
        if (some([description, title, files.length]))
            submissions.push({ id, title, description, files });
        this.propagateInputs({ ...inputs, submissions });
    };

    newSubmission = (id: number): SubmissionModel => ({
        id,
        title: undefined,
        description: undefined,
        files: [],
    });

    emptyError = (): SubmissionError => ({ imageErrors: {}, titleError: null });

    render(): React.ReactNode {
        const {
            classes,
            inputs: { submissions },
            error,
            theme: { isSeries, imageNumber, title },
        } = this.props;

        const submissionNumber = isSeries ? 1 : imageNumber;

        const submissionMeta: SubmissionMeta = {
            imageNumber: isSeries ? imageNumber : 1,
            showDescription: isSeries,
        };

        return (
            <Card className={classes.root} raised>
                <CardHeader
                    title={title}
                    titleTypographyProps={{ align: 'center', variant: 'h3' }}
                />
                <CardContent>
                    <Grid container alignItems="center" spacing={2}>
                        {map(range(submissionNumber), (index) => {
                            const submission =
                                find(submissions, (s) => s.id === index) ||
                                this.newSubmission(index);
                            return (
                                <SubmissionField
                                    key={index}
                                    submission={submissionMeta}
                                    inputs={submission}
                                    error={
                                        error.submissionErrors[submission.id] || this.emptyError()
                                    }
                                    onChange={this.handleChange}
                                />
                            );
                        })}
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles)(ThemeField);
