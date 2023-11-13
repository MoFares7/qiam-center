import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const DialogInfo = ({ dialogContent, errorCheck, onClickOpen, onClickClose }) => {
        const [open, setOpen] = useState(false);

        const handleCloseDialog = () => {
                setOpen(false); // Close the dialog
        };
        return (
                <>
                        <Dialog open={onClickOpen} onClose={onClickClose}>
                                <DialogTitle sx={{ fontFamily: 'Cairo', fontSize: '18px' }}>إضافة قسم</DialogTitle>
                                <DialogContent>
                                        {dialogContent}
                                </DialogContent>
                                <DialogActions>
                                        <Button onClick={onClickClose} color="secondary" sx={{ fontFamily: 'Cairo' }}>
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
                        </Dialog>
                </>
        );
};

export default DialogInfo;
