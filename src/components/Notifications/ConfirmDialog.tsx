import React from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

interface ConfirmDialogProps {
    children: React.ReactChild;
    title: string;
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = (props) => {
    const { title, children, open, onClose, onConfirm } = props;

    const handleConfirm = () => {
        onClose();
        onConfirm();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={onClose} color="secondary">
                    No
                </Button>
                <Button variant="contained" onClick={handleConfirm} color="primary">
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default ConfirmDialog;
