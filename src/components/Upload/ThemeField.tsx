import { find, map } from 'lodash';

import React from 'react';

import { Card, CardContent, CardHeader, Grid } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';

import SubmissionField from './SubmissionField';

import { uploadFormStyles } from '../../styles/general';
import { InputChange, SubmissionError, ThemeError, ThemeModel } from '../../types/models';

interface ThemeFieldProps extends WithStyles<typeof uploadFormStyles> {
    inputs: ThemeModel;
    errors: ThemeError;
    handleSubmissionChange: (theme_id: number, submission_id: number, payload: InputChange) => void;
    handleImageRemove: (theme_id: number, submission_id: number, image_id: number) => void;
    handleImageUpdate: (
        theme_id: number,
        submission_id: number,
        image_id: number,
        payload: { file: File },
    ) => void;
}

class ThemeField extends React.Component<ThemeFieldProps> {
    render(): React.ReactNode {
        const {
            classes,
            errors,
            handleSubmissionChange,
            handleImageRemove,
            handleImageUpdate,
            inputs: { id, title, submissions },
        } = this.props;

        return (
            <Card className={classes.themeCard} raised>
                <CardHeader
                    title={title}
                    titleTypographyProps={{ align: 'center', variant: 'h3' }}
                />
                <CardContent>
                    <Grid container alignItems="center" spacing={2}>
                        {map(submissions, (submission) => {
                            const error = find(
                                errors.submissions,
                                (s) => s.id === submission.id,
                            ) as SubmissionError;
                            return (
                                <SubmissionField
                                    key={submission.id}
                                    submission={submission}
                                    errors={error}
                                    theme_id={id}
                                    handleSubmissionChange={handleSubmissionChange}
                                    handleImageRemove={handleImageRemove}
                                    handleImageUpdate={handleImageUpdate}
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
