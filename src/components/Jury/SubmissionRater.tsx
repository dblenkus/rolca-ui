import React from 'react';

import { IconButton, makeStyles } from '@material-ui/core';
import { Close, NavigateBefore, NavigateNext } from '@material-ui/icons';

import { Submission } from '../../types/api';
import Rating from './Rating';

interface SubmissionRaterProps {
    submission: Submission;
    rating: number;
    isPrevious: boolean;
    isNext: boolean;
    close: () => void;
    previousSubmission: () => void;
    nextSubmission: () => void;
    updateRating: (value: number) => void;
}

const useStyles = makeStyles({
    mainFlex: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    imageFlex: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        maxWidth: '100%',
        maxHeight: '80vh',
    },
    iconsFlex: {
        alignSelf: 'stretch',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    invisibleIcon: { visibility: 'hidden' },
});

const SubmissionRater: React.FC<SubmissionRaterProps> = ({
    submission,
    rating,
    isPrevious,
    isNext,
    close,
    previousSubmission,
    nextSubmission,
    updateRating,
}: SubmissionRaterProps) => {
    const classes = useStyles();
    const { file } = submission.files[0];
    const { title } = submission;

    return (
        <div className={classes.mainFlex}>
            <div className={classes.imageFlex}>
                <IconButton disabled={!isPrevious} onClick={() => previousSubmission()}>
                    <NavigateBefore />
                </IconButton>
                <img className={classes.image} src={file} alt={title} />
                <div className={classes.iconsFlex}>
                    <IconButton onClick={() => close()}>
                        <Close />
                    </IconButton>
                    <IconButton disabled={!isNext} onClick={() => nextSubmission()}>
                        <NavigateNext />
                    </IconButton>
                    {/* Placeholder to match the alignment. */}
                    <IconButton className={classes.invisibleIcon}>
                        <Close />
                    </IconButton>
                </div>
            </div>

            <div>
                <b>Title:</b> {title}
            </div>
            <div>
                <Rating max={10} value={rating} onChange={(value) => updateRating(value)} />
            </div>
        </div>
    );
};

export default SubmissionRater;
