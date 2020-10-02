import React from 'react';
import _ from 'lodash';

import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
} from '@material-ui/core';

import { Payment, SubmissionSet } from '../../types/api';
import SubmissionSetTableRow from './SubmissionSetTableRow';

interface SubmissionSetTableProps {
    contestId: number;
    submissionSets: SubmissionSet[];
    payments: Payment[];
    count: number;
    pageSize: number;
    page: number;
    onChangePage: (_: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
    onChangePageSize: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onPaidChange: (submissionSetId: number, paid: boolean) => void;
    onDelete: (submissionSet: SubmissionSet) => void;
}

const SubmissionSetTable: React.FC<SubmissionSetTableProps> = ({
    contestId,
    submissionSets,
    payments,
    count,
    pageSize,
    page,
    onChangePage,
    onChangePageSize,
    onPaidChange,
    onDelete,
}: SubmissionSetTableProps) => {
    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Submited</TableCell>
                            <TableCell>Number of themes</TableCell>
                            <TableCell>Number of submissons</TableCell>
                            <TableCell>Paid?</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {submissionSets.map((submissionSet) => {
                            const payment = _.find(
                                payments,
                                (p) => p.submissionset === submissionSet.id,
                            );
                            return (
                                <SubmissionSetTableRow
                                    key={submissionSet.id}
                                    contestId={contestId}
                                    submissionSet={submissionSet}
                                    payment={payment}
                                    onPaidChange={onPaidChange}
                                    onDelete={onDelete}
                                />
                            );
                        })}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[1, 20, 50, 100]}
                                count={count}
                                rowsPerPage={pageSize}
                                page={page}
                                onChangePage={onChangePage}
                                onChangeRowsPerPage={onChangePageSize}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    );
};

export default SubmissionSetTable;
