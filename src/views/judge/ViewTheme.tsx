import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

import { Typography } from '@mui/material';

import { AppState, AppDispatch } from '../../store';

import { initializeStore, setSubmission } from '../../store/jury/actions';
import LoadingProgress from '../../components/LoadingProgress';
import ThemeGallery from '../../components/Jury/ThemeGallery';
import RatingService from '../../services/RatingService';
import { Rating } from '../../types/api';
import fetchAll from '../../utils/fetchAll';

const ViewTheme: React.FC<PropsFromRedux> = ({
    initialize,
    setSubmission,
    theme,
    isLoading,
    submissions,
}: PropsFromRedux) => {
    const [ratings, setRatings] = useState<Rating[]>([]);
    const [redirect, setRedirect] = useState<string | null>(null);
    const { contestId, themeId } = useParams<'contestId' | 'themeId'>();

    useEffect(() => {
        if (!contestId || !themeId) return;
        initialize(contestId, themeId);
    }, [contestId, themeId, initialize]);

    useEffect(() => {
        const fetchRatings = async (): Promise<void> => {
            if (!themeId) return;
            const ratingResource = () => RatingService.getForTheme(parseInt(themeId, 10));
            setRatings(await fetchAll(ratingResource));
        };
        fetchRatings();
    }, [themeId]);

    if (redirect) return <Navigate to={redirect} replace={false} />;

    const handleClick = (submissionId: number): void => {
        if (!contestId || !themeId) return;
        setSubmission(submissionId);
        setRedirect(`/judge/contest/${contestId}/theme/${themeId}/rate?submission=${submissionId}`);
    };

    if (isLoading || !submissions) return <LoadingProgress />;

    return (
        <>
            <Typography variant="h3" align="center" paragraph>
                {theme?.title}
            </Typography>
            <ThemeGallery
                submissions={submissions}
                isSeries={theme?.is_series || false}
                ratings={ratings}
                handleClick={handleClick}
            />
        </>
    );
};

const mapStateToProps = (state: AppState) => ({ ...state.jury });

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    initialize: (contestId: string, themeId: string): void =>
        dispatch(initializeStore(contestId, themeId, undefined)),
    setSubmission: (submissionId: number): void => {
        dispatch(setSubmission(submissionId));
    },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ViewTheme);
