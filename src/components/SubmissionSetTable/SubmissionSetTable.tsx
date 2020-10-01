import React from 'react';

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

import { SubmissionSet } from '../../types/api';
import SubmissionSetTableRow from './SubmissionSetTableRow';

interface SubmissionSetTableProps {
    contestId: number;
    submissionSets: SubmissionSet[];
    count: number;
    pageSize: number;
    page: number;
    onChangePage: (_: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
    onChangePageSize: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onDelete: (submissionSet: SubmissionSet) => void;
}

const SubmissionSetTable: React.FC<SubmissionSetTableProps> = ({
    contestId,
    submissionSets,
    count,
    pageSize,
    page,
    onChangePage,
    onChangePageSize,
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
                            <TableCell>Number of submissons</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {submissionSets.map((submissionSet) => (
                            <SubmissionSetTableRow
                                key={submissionSet.id}
                                contestId={contestId}
                                submissionSet={submissionSet}
                                onDelete={onDelete}
                            />
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[20, 50, 100]}
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
