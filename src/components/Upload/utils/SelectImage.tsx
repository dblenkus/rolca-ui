import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Button } from '@material-ui/core';
import { uploadFormStyles } from '../../../styles/general';

interface SelectImageProps {
    error: boolean;
    handleClick: (event: React.MouseEvent) => void;
}

const useStyles = makeStyles(uploadFormStyles);

const SelectImage: React.FC<SelectImageProps> = (props: SelectImageProps) => {
    const classes = useStyles();
    const { error, handleClick } = props;

    let className = classes.image;
    if (error) className += ` ${classes.error}`;

    return (
        <>
            <img
                className={className}
                src={`${process.env.PUBLIC_URL}/img/no-photo.png`}
                alt="Missing"
            />
            <Button
                className={classes.button}
                fullWidth
                variant="outlined"
                color="primary"
                onClick={handleClick}
            >
                Select Image
            </Button>
        </>
    );
};

export default SelectImage;
