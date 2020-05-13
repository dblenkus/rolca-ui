import { filter, find, map, range } from 'lodash';
import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';

import { Grid } from '@material-ui/core';

import InputField, { IInputChangeEvent } from './InputField';
import ImageField from './ImageField';

import {
    SubmissionError,
    SubmissionMeta,
    SubmissionModel,
    ImageError,
    ImageModel,
} from '../../types/models';
import { uploadFormStyles } from '../../styles/general';

interface SubmissionFieldProps extends WithStyles<typeof uploadFormStyles> {
    inputs: SubmissionModel;
    submission: SubmissionMeta;
    errors: SubmissionError;
    onChange: (event: SubmissionModel) => void;
}

class SubmissionField extends React.Component<SubmissionFieldProps> {
    propagateInputs = (inputs: SubmissionModel): void => {
        const { onChange } = this.props;
        if (onChange) onChange(inputs);
    };

    handleChange = ({ name, value }: IInputChangeEvent): void => {
        const { inputs } = this.props;
        this.propagateInputs({ ...inputs, [name]: value });
    };

    handleImageChange = ({ id, file }: ImageModel): void => {
        const { inputs } = this.props;
        const images = filter(inputs.images, (i) => i.id !== id);
        if (file !== undefined) images.push({ id, file });
        this.propagateInputs({ ...inputs, images });
    };

    newImage = (id: number): ImageModel => ({ id, file: undefined });
    emptyError = (id: number): ImageError => ({ id, file: null });

    render(): React.ReactNode {
        const {
            classes,
            inputs: { images, title, description },
            errors,
            submission: { imageNumber, showDescription },
        } = this.props;

        const titleField = (
            <InputField
                name="title"
                value={title}
                error={errors.title}
                label="Title"
                autoComplete=""
                required={images.length !== 0}
                onChange={this.handleChange}
            />
        );

        return (
            <>
                {map(range(imageNumber), (index) => {
                    const image = find(images, (i) => i.id === index) || this.newImage(index);
                    const error =
                        find(errors.images, (i) => i.id === index) || this.emptyError(index);
                    return (
                        <Grid item xs={12} sm={6} md={4} key={index} className={classes.imageGrid}>
                            <ImageField
                                image={image}
                                errors={error}
                                onChange={this.handleImageChange}
                            />
                            {imageNumber === 1 ? titleField : false}
                        </Grid>
                    );
                })}
                {imageNumber !== 1 ? (
                    <>
                        <Grid item xs={12} className={classes.seriesClearfix}></Grid>
                        <Grid item xs={12} sm={6} md={4} className={classes.seriesMetaGrid}>
                            {titleField}
                        </Grid>
                    </>
                ) : (
                    false
                )}
                {showDescription ? (
                    <Grid item xs={12} className={classes.seriesMetaGrid}>
                        <InputField
                            className={classes.seriesMetaInput}
                            name="description"
                            value={description}
                            label="Description"
                            autoComplete=""
                            required={images.length !== 0}
                            rows={3}
                            onChange={this.handleChange}
                        />
                    </Grid>
                ) : (
                    false
                )}
            </>
        );
    }
}

export default withStyles(uploadFormStyles)(SubmissionField);
