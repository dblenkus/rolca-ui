import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

import { withStyles, WithStyles } from '@material-ui/core/styles';

import {
    Button,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from '@material-ui/core';

import ConfirmDialog from '../../components/Notifications/ConfirmDialog';

import { editListStyles } from '../../styles/general';
import SubmissionSetService from '../../services/SubmissionSetService';
import ContestService from '../../services/ContestService';
import { Contest, SubmissionSet } from '../../types/api';

interface RouteMatchParams {
    contestId: string;
}

interface PaginationState {
    count: number;
    page: number;
    pageSize: number;
}

interface SubmissionListState {
    contest: Contest | null;
    submissionSets: SubmissionSet[];
    pagination: PaginationState;
    pendingSubmissionSet: SubmissionSet | null;
    showDialog: boolean;
}

interface SubmissionListProps
    extends WithStyles<typeof editListStyles>,
        RouteComponentProps<RouteMatchParams> {}

const CustomButton = ({ navigate, ...rest }: { navigate: Function }): React.ReactElement => {
    // Rendering element with the 'navigate' prop raises an error, so we have
    // to strip it: Warning: Invalid value for prop `navigate` on <a> tag.
    return React.createElement(Button, rest);
};

class SubmissionList extends React.Component<SubmissionListProps, SubmissionListState> {
    constructor(props: SubmissionListProps) {
        super(props);

        this.state = {
            contest: null,
            submissionSets: [],
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
        const { data: response } = await SubmissionSetService.getByContest(
            contestId,
            page + 1,
            pageSize,
        );
        this.setState((state) => ({
            contest,
            submissionSets: response.results,
            pagination: { ...state.pagination, count: response.count },
        }));
    };

    getSubmissionSetAuthor = (submissionSet: SubmissionSet): string => {
        if (!submissionSet.submissions.length) return '';

        const { first_name: firstName, last_name: lastName } = submissionSet.submissions[0].author;
        return `${firstName} ${lastName}`;
    };

    changePage = (_: React.MouseEvent<HTMLButtonElement> | null, page: number): void => {
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
        this.setState(
            (state) => ({
                pagination: {
                    ...state.pagination,
                    pageSize: parseInt(event.target.value, 10),
                    page: 0,
                },
            }),
            () => {
                this.fetchData();
            },
        );
    };

    openDialog = (pendingSubmissionSet: SubmissionSet) => (): void => {
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
        const { contest, pagination, showDialog, submissionSets } = this.state;
        const { classes } = this.props;

        const getViewLink = (submissionSet: SubmissionSet): string => {
            const contestId = contest ? contest.id : '';
            return `/admin/contest/${contestId}/submission/${submissionSet.id}`;
        };

        return (
            <>
                <Typography align="center" variant="h2">
                    {contest?.title}
                </Typography>

                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Submited</TableCell>
                                    <TableCell>Number of submissons</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {submissionSets.map((submissionSet) => (
                                    <TableRow key={submissionSet.id}>
                                        <TableCell component="th" scope="row">
                                            {this.getSubmissionSetAuthor(submissionSet)}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(submissionSet.created).toLocaleString()}
                                        </TableCell>
                                        <TableCell>{submissionSet.submissions.length}</TableCell>
                                        <TableCell align="right">
                                            <Link
                                                component={CustomButton}
                                                to={getViewLink(submissionSet)}
                                                className={classes.button}
                                                color="primary"
                                            >
                                                View
                                            </Link>
                                            <Button
                                                variant="text"
                                                className={classes.button}
                                                color="secondary"
                                                onClick={this.openDialog(submissionSet)}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[20, 50, 100]}
                                        count={pagination.count}
                                        rowsPerPage={pagination.pageSize}
                                        page={pagination.page}
                                        onChangePage={this.changePage}
                                        onChangeRowsPerPage={this.changePageSize}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                    <ConfirmDialog
                        open={showDialog}
                        title="Delete confirmation"
                        onClose={this.closeDialog}
                        onConfirm={this.processDelete}
                    >
                        Do you really want to delete the submission?
                    </ConfirmDialog>
                </Grid>
            </>
        );
    }
}

export default withStyles(editListStyles)(withRouter(SubmissionList));
