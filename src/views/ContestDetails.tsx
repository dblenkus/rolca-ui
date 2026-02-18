import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Typography } from '@mui/material';

import ContestService from '../services/ContestService';
import { Contest } from '../types/api';

import HeaderImage from '../components/Layout/HeaderImage';
import NoticeHtml from '../components/Upload/NoticeHtml';
import UploadButton from '../components/Upload/UploadButton';

const ContestDetails: React.FC = () => {
    const { contestId } = useParams<'contestId'>();
    const [contest, setContest] = useState<Contest | null>(null);

    useEffect(() => {
        const fetchContest = async (): Promise<void> => {
            if (!contestId) return;
            const { data } = await ContestService.getContest(contestId);
            setContest(data);
        };
        fetchContest();
    }, [contestId]);

    if (contest === null) return null;

    const { header_image: headerImage, notice_html: noticeHtml, title, id } = contest;

    return (
        <>
            {headerImage ? (
                <HeaderImage src={headerImage} />
            ) : (
                <Typography align="center" variant="h2">
                    {title}
                </Typography>
            )}
            <UploadButton contestId={id} />
            <NoticeHtml notice={noticeHtml} />
            <UploadButton contestId={id} />
        </>
    );
};

export default ContestDetails;
