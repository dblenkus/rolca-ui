import React from 'react';

import { FormControl, FormHelperText } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';

import SelectImage from './utils/SelectImage';
import ShowImage from './utils/ShowImage';

import { ImageModel } from '../../types/models';
import { uploadFormStyles } from '../../styles/general';

interface ImageFieldProps extends WithStyles<typeof uploadFormStyles> {
    image: ImageModel;
    theme_id: number;
    submission_id: number;
    handleImageRemove: (theme_id: number, submission_id: number, image_id: number) => void;
    handleImageUpdate: (
        theme_id: number,
        submission_id: number,
        image_id: number,
        payload: { file: File },
    ) => void;
}

class ImageField extends React.Component<ImageFieldProps> {
    imageRef = React.createRef<HTMLInputElement>();

    handleClick = (): void => {
        if (this.imageRef.current) this.imageRef.current.click();
    };

    handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault();
        if (event.target.files && event.target.files.length > 0) {
            const { handleImageUpdate, theme_id, submission_id, image } = this.props;
            const file = event.target.files[0];
            handleImageUpdate(theme_id, submission_id, image.meta.id, { file });
        }
    };

    render(): React.ReactNode {
        const { classes, image, handleImageRemove, submission_id, theme_id } = this.props;

        return (
            <FormControl error={!!image.errors.file}>
                <input
                    className={classes.fileInput}
                    type="file"
                    onChange={this.handleChange}
                    ref={this.imageRef}
                />
                {image.file === undefined ? (
                    <SelectImage
                        error={image.errors.file !== null}
                        handleClick={this.handleClick}
                    />
                ) : (
                    <ShowImage
                        imageUrl={image.url}
                        error={image.errors.file !== null}
                        handleChange={this.handleClick}
                        handleRemove={() => {
                            handleImageRemove(theme_id, submission_id, image.meta.id);
                        }}
                    />
                )}
                {image.errors.file === null ? null : (
                    <FormHelperText>{image.errors.file}</FormHelperText>
                )}
            </FormControl>
        );
    }
}

export default withStyles(uploadFormStyles)(ImageField);