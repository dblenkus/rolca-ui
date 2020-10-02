import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

import { Card, Grid } from '@material-ui/core';

import { Contest, SubmissionSet } from '../../types/api';

import SubmissionSetService from '../../services/SubmissionSetService';
import ContestService from '../../services/ContestService';

interface RouteMatchParams {
    contestId: string;
    submissionSetId: string;
}

interface SubmissionListState {
    contest: Contest | null;
    submissionSet: SubmissionSet | null;
}

class SubmissionList extends React.Component<
    RouteComponentProps<RouteMatchParams>,
    SubmissionListState
> {
    constructor(props: RouteComponentProps<RouteMatchParams>) {
        super(props);

        this.state = {
            contest: null,
            submissionSet: null,
        };
    }

    async componentDidMount(): Promise<void> {
        await this.fetchData();
    }

    getSubmissionSetAuthor = (submissionSet: SubmissionSet): string => {
        if (!submissionSet.submissions.length) return '';

        const { first_name: firstName, last_name: lastName } = submissionSet.submissions[0].author;
        return `${firstName} ${lastName}`;
    };

    async fetchData(): Promise<void> {
        const {
            match: {
                params: { contestId, submissionSetId },
            },
        } = this.props;

        const { data: contest } = await ContestService.getContest(contestId);
        const { data: submissionSet } = await SubmissionSetService.getSubmissionSet(
            submissionSetId,
        );
        this.setState({ contest, submissionSet });
    }

    render(): React.ReactNode {
        const { contest, submissionSet } = this.state;
        console.log(contest?.themes);
        return (
            <>
                <Grid item xs={12}>
                    <b>Contest:</b> {contest?.title}
                    <br />
                    <b>Author:</b> {submissionSet ? this.getSubmissionSetAuthor(submissionSet) : ''}
                    <br />
                    <br />
                </Grid>
                <Grid container spacing={2}>
                    {submissionSet?.submissions.map((submission) => {
                        const theme = contest?.themes.find((t) => t.id === submission.theme);
                        return (
                            <Grid key={submission.id} item xs={12} sm={6} md={4}>
                                <Card raised>
                                    <img
                                        alt={submission.title}
                                        src={submission.files[0].file}
                                        style={{
                                            border: '1px solid #ddd',
                                            borderRadius: '4px',
                                            maxHeight: '100%',
                                            padding: '5px',
                                            width: '100%',
                                        }}
                                    />
                                    <br />
                                    <b>Title:</b> {submission.title}
                                    <br />
                                    <b>Theme:</b> {theme?.title}
                                    {submission.description && (
                                        <>
                                            <br />
                                            <b>Description:</b> {submission.description}
                                        </>
                                    )}
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            </>
        );
    }
}

export default withRouter(SubmissionList);
