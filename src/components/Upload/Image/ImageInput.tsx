import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { uploadFormStyles } from '../../../styles/general';

export interface ImageButtonsProps {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    imageRef: React.RefObject<HTMLInputElement>;
}

const useStyles = makeStyles(uploadFormStyles);

const ImageButtons: React.FC<ImageButtonsProps> = (props) => {
    const classes = useStyles();
    const { handleChange, imageRef } = props;

    return (
        <input className={classes.fileInput} type="file" onChange={handleChange} ref={imageRef} />
    );
};

export default ImageButtons;
