import { filter, find, map, range } from 'lodash';
import React from 'react';

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

interface SubmissionFieldProps {
    inputs: SubmissionModel;
    submission: SubmissionMeta;
    errors: SubmissionError;
    onChange: (event: SubmissionModel) => void;
}

class SubmissionField extends React.Component<SubmissionFieldProps> {
    static defaultProps = {
        showDescription: false,
    };

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
        const files = filter(inputs.files, (f) => f.id !== id);
        if (file !== undefined) files.push({ id, file });
        this.propagateInputs({ ...inputs, files });
    };

    newImage = (id: number): ImageModel => ({ id, file: undefined });
    emptyError = (id: number): ImageError => ({ id, file: null });

    render(): React.ReactNode {
        const {
            inputs: { files, title, description },
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
                required={files.length !== 0}
                onChange={this.handleChange}
            />
        );

        return (
            <>
                {map(range(imageNumber), (index) => {
                    const file = find(files, (f) => f.id === index) || this.newImage(index);
                    const error =
                        find(errors.images, (f) => f.id === index) || this.emptyError(index);
                    return (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <ImageField
                                image={file}
                                errors={error}
                                onChange={this.handleImageChange}
                            />
                            {imageNumber === 1 ? titleField : false}
                        </Grid>
                    );
                })}
                {imageNumber !== 1 ? (
                    <Grid item xs={12} sm={6} md={4}>
                        {titleField}
                    </Grid>
                ) : (
                    false
                )}
                {showDescription ? (
                    <Grid item xs={12}>
                        <InputField
                            name="description"
                            value={description}
                            label="Description"
                            autoComplete=""
                            required={files.length !== 0}
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

export default SubmissionField;
