import React from 'react';
import TextField from '@mui/material/TextField';

const DialogTextField = (props) => {
        const {
                id,
                required,
                label,
                type,
                fullWidth,
                error,
                helperText,
                onChange,
        } = props;

        return (
                <TextField
                        id={id}
                        required={required}
                        label={label}
                        type={type}
                        fullWidth={fullWidth}
                        error={error}
                        helperText={helperText}
                        onChange={onChange}
                        autoFocus
                        margin="dense"
                        InputProps={{
                                style: {
                                        fontFamily: 'Cairo',
                                        textAlign: 'right',
                                        height: '40px',
                                },
                        }}
                        InputLabelProps={{
                                style: {
                                        fontFamily: 'Cairo',
                                        textAlign: 'right',
                                        fontSize: '12px',
                                        alignItems: 'center', // Align vertically to the center
                                        display: 'flex', // Use flex display to center vertically
                                        justifyContent: 'center', // Align horizontally to the center
                                },
                        }}
                />
        );
};

export default DialogTextField;
