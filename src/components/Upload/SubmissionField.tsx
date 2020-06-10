import { find, map } from 'lodash';
import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';

import { Grid } from '@material-ui/core';

import InputField from './InputField';
import ImageField from './ImageField';

import { SubmissionError, SubmissionModel, InputChange, ImageError } from '../../types/models';
import { uploadFormStyles } from '../../styles/general';

interface SubmissionFieldProps extends WithStyles<typeof uploadFormStyles> {
    submission: SubmissionModel;
    errors: SubmissionError;
    theme_id: number;
    handleSubmissionChange: (theme_id: number, submission_id: number, payload: InputChange) => void;
    handleImageRemove: (theme_id: number, submission_id: number, image_id: number) => void;
    handleImageUpdate: (
        theme_id: number,
        submission_id: number,
        image_id: number,
        payload: { file: File },
    ) => void;
}

class SubmissionField extends React.Component<SubmissionFieldProps> {
    render(): React.ReactNode {
        const {
            classes,
            submission,
            errors,
            theme_id,
            handleSubmissionChange,
            handleImageRemove,
            handleImageUpdate,
        } = this.props;

        const handleChange = (payload: { name: string; value: string }): void =>
            handleSubmissionChange(theme_id, submission.id, payload);

        const titleField = (
            <InputField
                name="title"
                value={submission.title}
                error={errors.title}
                label="Title"
                autoComplete=""
                required={submission.titleRequired}
                onChange={handleChange}
            />
        );

        return (
            <>
                {map(submission.images, (image) => {
                    const error = find(errors.images, (i) => i.id === image.id) as ImageError;
                    return (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            key={image.id}
                            className={classes.imageGrid}
                        >
                            <ImageField
                                image={image}
                                errors={error}
                                theme_id={theme_id}
                                submission_id={submission.id}
                                handleImageRemove={handleImageRemove}
                                handleImageUpdate={handleImageUpdate}
                            />
                            {!submission.isSeries ? titleField : null}
                        </Grid>
                    );
                })}
                {submission.isSeries ? (
                    <>
                        <Grid item xs={12} className={classes.seriesClearfix}></Grid>
                        <Grid item xs={12} sm={6} md={4} className={classes.seriesMetaGrid}>
                            {titleField}
                        </Grid>
                        <Grid item xs={12} className={classes.seriesMetaGrid}>
                            <InputField
                                className={classes.seriesMetaInput}
                                name="description"
                                value={submission.description}
                                error={errors.description}
                                label="Description"
                                autoComplete=""
                                required={submission.descriptionRequired}
                                rows={3}
                                onChange={handleChange}
                            />
                        </Grid>
                    </>
                ) : null}
            </>
        );
    }
}

export default withStyles(uploadFormStyles)(SubmissionField);
