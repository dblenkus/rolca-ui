import React, { CSSProperties, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import _ from 'lodash';

import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from '@material-ui/core';

import LoadingProgress from '../../components/LoadingProgress';
import ResultsThemeService from '../../services/ResultsThemeService';
import { ResultsAuthor, ResultsSubmission } from '../../types/api';

interface RouteMatchParams {
    contestId: string;
    themeId: string;
}

const ThemeResults: React.FC = () => {
    const [submissionsByAuthor, setSubmissionsByAuthor] = useState<ResultsSubmission[][]>([]);
    const [redirect, setRedirect] = useState<null | number>(null);
    const { contestId, themeId } = useParams<RouteMatchParams>();

    useEffect(() => {
        const fetch = async (): Promise<void> => {
            const { data } = await ResultsThemeService.getResults(themeId);
            setSubmissionsByAuthor(
                _.chain(data.submissions)
                    .groupBy('author.id')
                    .values()
                    .orderBy(['0.author.last_name', '0.author.first_name'])
                    .value(),
            );
        };
        fetch();
    }, [themeId]);

    const getAuthor = (submissions: ResultsSubmission[]): ResultsAuthor => submissions[0].author;

    const getAuthorReward = (author: ResultsAuthor): string => {
        if (author.reward_theme?.toString(10) !== themeId) return '';
        return author.reward || '';
    };
    const getReward = (submission: ResultsSubmission): string => {
        if (submission.reward_label) return submission.reward_label;
        if (submission.accepted) return 'Accepted';
        return '';
    };

    const getRewardStyle = (submission: ResultsSubmission): CSSProperties => {
        const style: CSSProperties = {};

        if (submission.reward_kind === 'Gold') {
            style.backgroundColor = '#FEE101';
        }
        if (submission.reward_kind === 'Silver') {
            style.backgroundColor = '#A7A7AD';
        }
        if (submission.reward_kind === 'Bronze') {
            style.backgroundColor = '#A77044';
        }

        return style;
    };

    const getRewardTextStyle = (submission: ResultsSubmission): CSSProperties => {
        const style: CSSProperties = {};

        if (submission.reward_kind === 'Honorable Mention') {
            style.fontWeight = 'bolder';
        }

        return style;
    };

    const isAccepted = (submission: ResultsSubmission): boolean => submission.accepted;

    if (redirect)
        return (
            <Redirect
                to={`/results/contest/${contestId}/theme/${themeId}/submission/${redirect}`}
                push
            />
        );

    if (!submissionsByAuthor.length) return <LoadingProgress />;

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        {submissionsByAuthor.map((submissions: ResultsSubmission[]) => {
                            const author = getAuthor(submissions);
                            return (
                                <React.Fragment key={author.id}>
                                    <TableRow>
                                        <TableCell colSpan={2}>
                                            <Typography>
                                                <b>{`${author.first_name} ${author.last_name}`}</b>
                                            </Typography>
                                        </TableCell>
                                        <TableCell colSpan={2} align="right">
                                            <Typography>
                                                <b>{getAuthorReward(author)}</b>
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    {submissions.map((submission) => (
                                        <TableRow
                                            key={submission.id}
                                            hover={isAccepted(submission)}
                                            onClick={() =>
                                                isAccepted(submission) && setRedirect(submission.id)
                                            }
                                        >
                                            <TableCell
                                                padding="checkbox"
                                                style={getRewardStyle(submission)}
                                            />
                                            <TableCell style={getRewardStyle(submission)}>
                                                <Typography>{submission.title}</Typography>
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                padding="default"
                                                style={getRewardStyle(submission)}
                                            >
                                                <Typography style={getRewardTextStyle(submission)}>
                                                    {getReward(submission)}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </React.Fragment>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default ThemeResults;
