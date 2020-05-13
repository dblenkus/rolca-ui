import { filter, find, map, range, some } from 'lodash';

import React from 'react';

import { Card, CardContent, CardHeader, Grid } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';

import SubmissionField from './SubmissionField';

import { uploadFormStyles } from '../../styles/general';
import {
    SubmissionError,
    SubmissionModel,
    ThemeError,
    ThemeModel,
    ThemeMeta,
    SubmissionMeta,
} from '../../types/models';

interface ThemeFieldProps extends WithStyles<typeof uploadFormStyles> {
    theme: ThemeMeta;
    inputs: ThemeModel;
    errors: ThemeError;
    onChange: (event: ThemeModel) => void;
}

class ThemeField extends React.Component<ThemeFieldProps> {
    propagateInputs = (theme: ThemeModel): void => {
        const { onChange } = this.props;
        if (onChange) onChange(theme);
    };

    handleChange = ({ id, title, description, images }: SubmissionModel): void => {
        const { inputs } = this.props;
        const submissions = filter(inputs.submissions, (sub) => sub.id !== id);
        if (some([description, title, images.length]))
            submissions.push({ id, title, description, images });
        this.propagateInputs({ ...inputs, submissions });
    };

    newSubmission = (id: number): SubmissionModel => ({
        id,
        title: undefined,
        description: undefined,
        images: [],
    });

    emptyError = (id: number): SubmissionError => ({ id, images: [], title: null });

    render(): React.ReactNode {
        const {
            classes,
            inputs: { submissions },
            errors,
            theme: { isSeries, imageNumber, title },
        } = this.props;

        const submissionNumber = isSeries ? 1 : imageNumber;

        const submissionMeta: SubmissionMeta = {
            imageNumber: isSeries ? imageNumber : 1,
            showDescription: isSeries,
        };

        return (
            <Card className={classes.themeCard} raised>
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
                            const error =
                                find(errors.submissions, (s) => s.id === index) ||
                                this.emptyError(index);
                            return (
                                <SubmissionField
                                    key={index}
                                    submission={submissionMeta}
                                    inputs={submission}
                                    errors={error}
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

export default withStyles(uploadFormStyles)(ThemeField);
