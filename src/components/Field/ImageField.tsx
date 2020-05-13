import React from 'react';

import { FormControl, FormHelperText } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';

import SelectImage from './utils/SelectImage';
import ShowImage from './utils/ShowImage';

import { ImageError, ImageModel } from '../../types/models';
import { uploadFormStyles } from '../../styles/general';

interface ImageFieldProps extends WithStyles<typeof uploadFormStyles> {
    image: ImageModel;
    errors: ImageError;
    onChange: (event: ImageModel) => void;
}

class ImageField extends React.Component<ImageFieldProps> {
    imageRef = React.createRef<HTMLInputElement>();

    handleClick = (): void => {
        if (this.imageRef.current) this.imageRef.current.click();
    };

    handleRemove = (): void => {
        if (this.imageRef.current) this.imageRef.current.value = '';
        const { onChange, image } = this.props;
        onChange({ id: image.id, file: undefined });
    };

    handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault();
        if (event.target.files && event.target.files.length > 0) {
            const { onChange, image } = this.props;
            const file = event.target.files[0];
            onChange({ id: image.id, file });
        }
    };

    render(): React.ReactNode {
        const { classes, image, errors } = this.props;

        return (
            <FormControl error={!!errors.file}>
                <input
                    className={classes.fileInput}
                    type="file"
                    onChange={this.handleChange}
                    ref={this.imageRef}
                />
                {image.file === undefined ? (
                    <SelectImage handleClick={this.handleClick} />
                ) : (
                    <ShowImage
                        image={image.file}
                        error={errors.file !== null}
                        handleChange={this.handleClick}
                        handleRemove={this.handleRemove}
                    />
                )}
                {errors.file === null ? null : <FormHelperText>{errors.file}</FormHelperText>}
            </FormControl>
        );
    }
}

export default withStyles(uploadFormStyles)(ImageField);
