import React, { useCallback, useEffect, useState } from 'react';
import { AxiosPromise } from 'axios';
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

import { PaginatedResponse, Payment, SubmissionSet } from '../../types/api';
import SubmissionSetTableRow from './SubmissionSetTableRow';
import usePagination from '../../services/usePagination';
import PaymentService from '../../services/PaymentService';

interface SubmissionSetTableProps {
    contestId: number;
    dataSource: (page: number, pageSize: number) => AxiosPromise<PaginatedResponse<SubmissionSet>>;
    onDelete: (submissionSet: SubmissionSet) => void;
}

const SubmissionSetTable: React.FC<SubmissionSetTableProps> = ({
    contestId,
    dataSource,
    onDelete,
}: SubmissionSetTableProps) => {
    const [payments, setPayments] = useState<Payment[]>([]);
    const {
        data: submissionSets,
        count,
        page,
        pageSize,
        changePage,
        changePageSize,
    } = usePagination<SubmissionSet>({ source: dataSource });

    const fetchPayments = useCallback(async (): Promise<void> => {
        if (submissionSets.length === 0) {
            setPayments([]);
            return;
        }

        const submissionSetIds = _.map(submissionSets, 'id');
        const { data } = await PaymentService.getBySubmissionSets(submissionSetIds);
        setPayments(data.results);
    }, [submissionSets]);

    useEffect(() => {
        fetchPayments();
    }, [fetchPayments]);

    const handlePageChange = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ): void => {
        changePage(newPage + 1);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ): void => {
        changePageSize(parseInt(event.target.value, 10));
    };

    const handlePaidChange = async (submissionSetId: number, paid: boolean): Promise<void> => {
        await PaymentService.updatePayment(submissionSetId, paid);
        await fetchPayments();
    };

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
                                    onPaidChange={handlePaidChange}
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
                                page={page - 1}
                                onChangePage={handlePageChange}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    );
};

export default SubmissionSetTable;
