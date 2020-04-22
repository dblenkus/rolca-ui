import React from 'react';

import { withStyles, WithStyles } from '@material-ui/core/styles';

import SelectImage from './utils/SelectImage';
import ShowImage from './utils/ShowImage';

import { ImageModel } from '../../types/models';

interface ImageFieldProps {
    image: ImageModel;
    onChange: (event: ImageModel) => void;
}

const styles = {
    input: {
        display: 'none',
    },
};

class ImageField extends React.Component<ImageFieldProps & WithStyles<typeof styles>> {
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
        const { classes, image } = this.props;

        return (
            <>
                <input
                    className={classes.input}
                    type="file"
                    onChange={this.handleChange}
                    ref={this.imageRef}
                />
                {image.file === undefined ? (
                    <SelectImage handleClick={this.handleClick} />
                ) : (
                    <ShowImage
                        image={image.file}
                        handleChange={this.handleClick}
                        handleRemove={this.handleRemove}
                    />
                )}
            </>
        );
    }
}

export default withStyles(styles)(ImageField);
