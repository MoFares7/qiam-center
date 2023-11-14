import { Button } from '@mui/material'
import React from 'react'

const MainButton = ({ width, color, title, onClick }) => {
        return (
                <Button
                        sx={{
                                width: 
                                        width
                                ,
                                backgroundColor: color,
                                color: 'white',
                                fontFamily: 'Cairo',
                                m: 4.2,
                                '&:hover': {
                                        backgroundColor: '#303F9F',
                                },
                        }}
                        onClick={onClick}
                >
                        {title}
                </Button>
        )
}

export default MainButton;
