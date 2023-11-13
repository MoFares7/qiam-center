import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const MySnackbar = ({ open, message, handleClose }) => {
        return (
                <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="info">
                                {message}
                        </Alert>
                </Snackbar>
        );
};
