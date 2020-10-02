import _ from 'lodash';
import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

import { withStyles, WithStyles } from '@material-ui/core/styles';

import { Grid, Typography } from '@material-ui/core';

import ConfirmDialog from '../../components/Notifications/ConfirmDialog';

import { editListStyles } from '../../styles/general';
import SubmissionSetService from '../../services/SubmissionSetService';
import ContestService from '../../services/ContestService';
import PaymentService from '../../services/PaymentService';
import { Contest, Payment, SubmissionSet } from '../../types/api';
import SubmissionSetTable from '../../components/SubmissionSetTable/SubmissionSetTable';

interface RouteMatchParams {
    contestId: string;
}

interface PaginationState {
    count: number;
    page: number;
    pageSize: number;
}

interface SubmissionSetListState {
    contest: Contest | null;
    submissionSets: SubmissionSet[];
    payments: Payment[];
    pagination: PaginationState;
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
            submissionSets: [],
            payments: [],
            pagination: {
                count: 0,
                page: 0,
                pageSize: 20,
            },
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
        const {
            pagination: { page, pageSize },
        } = this.state;

        const { data: contest } = await ContestService.getContest(contestId);
        const { data: submissionSets } = await SubmissionSetService.getByContest(
            contestId,
            page + 1,
            pageSize,
        );

        const submissionSetIds = _.map(submissionSets.results, 'id');

        const {
            data: { results: payments },
        } = await PaymentService.getBySubmissionSets(submissionSetIds);

        this.setState((state) => ({
            contest,
            submissionSets: submissionSets.results,
            payments,
            pagination: { ...state.pagination, count: submissionSets.count },
        }));
    };

    changePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number): void => {
        this.setState(
            (state) => ({
                pagination: { ...state.pagination, page },
            }),
            () => {
                this.fetchData();
            },
        );
    };

    changePageSize = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const pageSize = parseInt(event.target.value, 10);
        this.setState(
            (state) => ({
                pagination: { ...state.pagination, pageSize, page: 0 },
            }),
            () => {
                this.fetchData();
            },
        );
    };

    updatePaid = async (submissionSetId: number, paid: boolean): Promise<void> => {
        await PaymentService.updatePayment(submissionSetId, paid);
        await this.fetchData();
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
        const { contest, pagination, showDialog, submissionSets, payments } = this.state;

        return (
            <>
                <Typography align="center" variant="h2">
                    {contest?.title}
                </Typography>

                <Grid item xs={12}>
                    <SubmissionSetTable
                        contestId={contest ? contest.id : 0}
                        submissionSets={submissionSets}
                        payments={payments}
                        count={pagination.count}
                        pageSize={pagination.pageSize}
                        page={pagination.page}
                        onChangePage={this.changePage}
                        onChangePageSize={this.changePageSize}
                        onPaidChange={this.updatePaid}
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
