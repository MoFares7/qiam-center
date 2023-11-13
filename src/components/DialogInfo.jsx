import React, { useState, useEffect } from 'react';
import {
        Button,
        Dialog,
        DialogActions,
        DialogContent,
        DialogTitle,
} from '@mui/material';

const DialogInfo = ({ dialogContent, errorCheck , titleOpenDialogButton , onClick }) => {
        const [open, setOpen] = useState(false);
        const handleOpenDialog = () => {
                setOpen(true); // Open the dialog
        };

        const handleCloseDialog = () => {
                setOpen(false); // Close the dialog
        };
        return (
                <>
                        <Button
                        sx={{
                                width: {
                                        xs: '200px',
                                        sm: '250px',
                                        md: '300px',
                                },
                                backgroundColor: '#2962ff',
                                color: 'white',
                                fontFamily: 'Cairo',
                                m: 4.2,
                                '&:hover': {
                                        backgroundColor: '#303F9F',
                                },
                        }}
                        onClick={handleOpenDialog}
                >
                                  {titleOpenDialogButton}
                        </Button>
                        <Dialog open={open} onClose={handleCloseDialog}>
                                <DialogTitle sx={{ fontFamily: 'Cairo', fontSize: '18px' }}>إضافة قسم</DialogTitle>
                                <DialogContent>
                                        {/* ... */}
                                        {dialogContent}
                                        {/* ... */}
                                </DialogContent>
                                <DialogActions>
                                        <Button onClick={handleCloseDialog} color="secondary" sx={{
                                                fontFamily: 'Cairo',
                                        }}>
                                                إلغاء
                                        </Button>
                                        <Button
                                                onClick={errorCheck}
                                                color="primary"
                                                sx={{
                                                        fontFamily: 'Cairo',
                                                        backgroundColor: '#272356',
                                                        color: 'white',
                                                        '&:hover': {
                                                                backgroundColor: '#303F9F',
                                                        },
                                                }}
                                        >
                                                إضافة
                                        </Button>
                                </DialogActions>
                        </Dialog></>
        )
}

export default DialogInfo
