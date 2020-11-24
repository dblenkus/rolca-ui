import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import _ from 'lodash';

import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core';

import LoadingProgress from '../../components/LoadingProgress';
import ResultsThemeService from '../../services/ResultsThemeService';
import { Author, ResultsSubmission } from '../../types/api';

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
            setSubmissionsByAuthor(_.values(_.groupBy(data.submissions, 'author.id')));
        };
        fetch();
    }, [themeId]);

    const getAuthor = (submissions: ResultsSubmission[]): Author => submissions[0].author;

    const getReward = (submission: ResultsSubmission): string => {
        if (submission.reward) return submission.reward;
        if (submission.accepted) return 'Accepted';
        return '';
    };

    const isAccepted = (submission: ResultsSubmission): boolean => submission.accepted;

    if (redirect)
        return (
            <Redirect
                to={`/results/contest/${contestId}/theme/${themeId}/submission/${redirect}`}
                push
            />
        );

    if (!submissionsByAuthor) return <LoadingProgress />;

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
                                        <TableCell colSpan={3}>
                                            <b>{`${author.first_name} ${author.last_name}`}</b>
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
                                            <TableCell padding="checkbox" />
                                            <TableCell>{submission.title}</TableCell>
                                            <TableCell align="right">
                                                {getReward(submission)}
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
