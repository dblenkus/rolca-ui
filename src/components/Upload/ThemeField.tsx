import React from 'react';

import { Card, CardContent, CardHeader, Grid } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';

import SubmissionField from './SubmissionField';

import { uploadFormStyles } from '../../styles/general';
import { InputChange, ThemeModel } from '../../types/models';

interface ThemeFieldProps extends WithStyles<typeof uploadFormStyles> {
    theme: ThemeModel;
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
            handleSubmissionChange,
            handleImageRemove,
            handleImageUpdate,
            theme,
        } = this.props;

        return (
            <Card className={classes.themeCard} raised>
                <CardHeader
                    title={theme.meta.title}
                    titleTypographyProps={{ align: 'center', variant: 'h3' }}
                />
                <CardContent>
                    <Grid container alignItems="center" spacing={2}>
                        {theme.submissions.map((submission) => {
                            return (
                                <SubmissionField
                                    key={submission.meta.id}
                                    submission={submission}
                                    theme_id={theme.meta.id}
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
