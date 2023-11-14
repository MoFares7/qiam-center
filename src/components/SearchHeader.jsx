import React from 'react'
import { Box, Button } from '@mui/material';
import SearchField from './SearchField';
import SearchIcon from '@mui/icons-material/Search';

const SearchHeader = ({onRefresh, onSearch}) => {
        return (
                <Box
                        sx={{
                                display: {
                                        xs: 'block',
                                        sm: 'flex',
                                        md: 'flex',
                                        lg: 'flex',
                                },
                        }}
                >
                        <Button
                                onClick={onSearch}
                                sx={{
                                        backgroundColor: '#2962ff',
                                        color: 'white',
                                        fontFamily: 'Cairo',
                                        mb: 0.4,
                                        ml: 2,
                                        '&:hover': {
                                                backgroundColor: '#303F9F',
                                        },
                                }}
                                variant="contained"
                                endIcon={<SearchIcon sx={{ pr: 1 }} />}
                        >
                                ابحث
                        </Button>
                        <SearchField placeholder="البحث عن قسم ما" />
                        <Button
                                onClick={onRefresh}
                                sx={{
                                        backgroundColor: '#4CAF50',
                                        color: 'white',
                                        fontFamily: 'Cairo',
                                        mb: 0.4,
                                        mr: 2,
                                        '&:hover': {
                                                backgroundColor: '#8BC34A',
                                        },
                                }}
                                variant="contained"
                        >
                                تحديث
                        </Button>
                </Box>
        )
}

export default SearchHeader
