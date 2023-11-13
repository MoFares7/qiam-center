import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function SearchField({ placeholder }) {
        return (
                <Box
                        sx={{
                                width: {
                                        xs: 300,
                                        sm: 350,
                                        md: 400,
                                        lg: 500
                                },
                                maxWidth: '100%',
                                height: '60px',
                                border: '1px solid white',
                                '&:hover': {
                                        borderColor: 'blue' // Change border color on hover
                                }
                        }}
                >
                        <TextField
                                fullWidth
                                label={placeholder}
                                id="fullWidth"
                                InputLabelProps={{
                                        style: {
                                                color: 'white',
                                                fontFamily: 'Cairo', // Apply the fontFamily style to the label text
                                                textAlign: 'right', // Align the label text to the right
                                        },
                                }}
                                InputProps={{
                                        sx: {
                                                color: 'white',
                                                fontFamily: 'Cairo',
                                                borderTopRightRadius: 4,
                                                borderBottomRightRadius: 4,// Add borderRadius to InputProps
                                        },

                                }}
                        />
                </Box>
        );
}
