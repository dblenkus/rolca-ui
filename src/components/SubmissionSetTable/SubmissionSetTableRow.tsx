import React from 'react';
import { Link } from 'react-router-dom';

import { Button, Checkbox, TableCell, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';

import { editListStyles } from '../../styles/general';
import { Payment, SubmissionSet } from '../../types/api';

interface SubmissionSetTableRowProps {
    contestId: number;
    submissionSet: SubmissionSet;
    payment: Payment | undefined;
    onPaidChange: (submissionSetId: number, paid: boolean) => void;
    onDelete: (submissionSet: SubmissionSet) => void;
}

const CustomButton = ({ navigate, ...rest }: { navigate: Function }): React.ReactElement => {
    // Rendering element with the 'navigate' prop raises an error, so we have
    // to strip it: Warning: Invalid value for prop `navigate` on <a> tag.
    return React.createElement(Button, rest);
};

const getSubmissionSetAuthor = (submissionSet: SubmissionSet): string => {
    if (!submissionSet.submissions.length) return '';

    const { first_name: firstName, last_name: lastName } = submissionSet.submissions[0].author;
    return `${firstName} ${lastName}`;
};

const getViewLink = (contestId: number, submissionSet: SubmissionSet): string => {
    return `/admin/contest/${contestId}/submission/${submissionSet.id}`;
};

const useStyles = makeStyles(editListStyles);

const SubmissionSetTableRow: React.FC<SubmissionSetTableRowProps> = ({
    contestId,
    submissionSet,
    payment,
    onPaidChange,
    onDelete,
}: SubmissionSetTableRowProps) => {
    const classes = useStyles();

    const handlePaidChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        onPaidChange(submissionSet.id, event.target.checked);
    };

    return (
        <TableRow>
            <TableCell component="th" scope="row">
                {getSubmissionSetAuthor(submissionSet)}
            </TableCell>
            <TableCell>{new Date(submissionSet.created).toLocaleString()}</TableCell>
            <TableCell>{submissionSet.submissions.length}</TableCell>
            <TableCell>
                <Checkbox
                    checked={payment && payment.paid}
                    icon={<MoneyOffIcon color="secondary" />}
                    checkedIcon={<AttachMoneyIcon color="primary" />}
                    onChange={handlePaidChange}
                />
            </TableCell>
            <TableCell align="right">
                <Link
                    component={CustomButton}
                    to={getViewLink(contestId, submissionSet)}
                    className={classes.button}
                    color="primary"
                >
                    View
                </Link>
                <Button
                    variant="text"
                    className={classes.button}
                    color="secondary"
                    onClick={(): void => {
                        onDelete(submissionSet);
                    }}
                >
                    Delete
                </Button>
            </TableCell>
        </TableRow>
    );
};

export default SubmissionSetTableRow;
