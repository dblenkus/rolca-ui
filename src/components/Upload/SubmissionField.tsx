import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';

import { Grid } from '@material-ui/core';

import InputField from './InputField';
import ImageField from './ImageField';

import { SubmissionModel, InputChange } from '../../types/models';
import { uploadFormStyles } from '../../styles/general';

interface SubmissionFieldProps extends WithStyles<typeof uploadFormStyles> {
    submission: SubmissionModel;
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
            theme_id,
            handleSubmissionChange,
            handleImageRemove,
            handleImageUpdate,
        } = this.props;

        const handleChange = (payload: { name: string; value: string }): void =>
            handleSubmissionChange(theme_id, submission.meta.id, payload);

        const titleField = (
            <InputField
                name="title"
                value={submission.title}
                error={submission.errors.title}
                label="Title"
                autoComplete=""
                required={submission.meta.titleRequired}
                onChange={handleChange}
            />
        );

        return (
            <>
                {submission.images.map((image) => {
                    return (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            key={image.meta.id}
                            className={classes.imageGrid}
                        >
                            <ImageField
                                image={image}
                                theme_id={theme_id}
                                submission_id={submission.meta.id}
                                handleImageRemove={handleImageRemove}
                                handleImageUpdate={handleImageUpdate}
                            />
                            {!submission.meta.isSeries ? titleField : null}
                        </Grid>
                    );
                })}
                {submission.meta.isSeries ? (
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
                                error={submission.errors.description}
                                label="Description"
                                autoComplete=""
                                required={submission.meta.descriptionRequired}
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
