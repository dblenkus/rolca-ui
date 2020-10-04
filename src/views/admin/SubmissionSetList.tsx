import React from 'react';
import { AxiosPromise } from 'axios';
import { withRouter, RouteComponentProps } from 'react-router';

import { withStyles, WithStyles } from '@material-ui/core/styles';

import { Grid, Typography } from '@material-ui/core';

import ConfirmDialog from '../../components/Notifications/ConfirmDialog';

import { editListStyles } from '../../styles/general';
import SubmissionSetService from '../../services/SubmissionSetService';
import ContestService from '../../services/ContestService';
import { Contest, PaginatedResponse, SubmissionSet } from '../../types/api';
import SubmissionSetTable from '../../components/SubmissionSetTable/SubmissionSetTable';

interface RouteMatchParams {
    contestId: string;
}

interface SubmissionSetListState {
    contest: Contest | null;
    pendingSubmissionSet: SubmissionSet | null;
    showDialog: boolean;
}

interface SubmissionSetListProps
    extends WithStyles<typeof editListStyles>,
        RouteComponentProps<RouteMatchParams> {}

class SubmissionSetList extends React.Component<SubmissionSetListProps, SubmissionSetListState> {
    constructor(props: SubmissionSetListProps) {
        super(props);

        this.state = {
            contest: null,
            pendingSubmissionSet: null,
            showDialog: false,
        };
    }

    async componentDidMount(): Promise<void> {
        await this.fetchData();
    }

    fetchData = async (): Promise<void> => {
        const {
            match: {
                params: { contestId },
            },
        } = this.props;

        const { data: contest } = await ContestService.getContest(contestId);

        this.setState({ contest });
    };

    handleDelete = (pendingSubmissionSet: SubmissionSet): void => {
        this.setState({ pendingSubmissionSet, showDialog: true });
    };

    closeDialog = (): void => this.setState({ pendingSubmissionSet: null, showDialog: false });

    processDelete = async (): Promise<void> => {
        const { pendingSubmissionSet } = this.state;
        if (!pendingSubmissionSet) return;

        await SubmissionSetService.deleteSubmissionSet(pendingSubmissionSet.id);
        await this.fetchData();
    };

    render(): React.ReactNode {
        const { contest, showDialog } = this.state;

        const dataSource = (
            page: number,
            pageSize: number,
        ): AxiosPromise<PaginatedResponse<SubmissionSet>> =>
            SubmissionSetService.getByContest(
                contest ? contest.id.toString() : '-1',
                page,
                pageSize,
            );

        return (
            <>
                <Typography align="center" variant="h2">
                    {contest?.title}
                </Typography>

                <Grid item xs={12}>
                    <SubmissionSetTable
                        contestId={contest ? contest.id : 0}
                        dataSource={dataSource}
                        onDelete={this.handleDelete}
                    />
                </Grid>

                <ConfirmDialog
                    open={showDialog}
                    title="Delete confirmation"
                    onClose={this.closeDialog}
                    onConfirm={this.processDelete}
                >
                    Do you really want to delete the submission?
                </ConfirmDialog>
            </>
        );
    }
}

export default withStyles(editListStyles)(withRouter(SubmissionSetList));
