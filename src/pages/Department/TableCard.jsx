import React, { useState } from 'react';
import {
        Paper,
        Table,
        TableBody,
        TableCell,
        TableContainer,
        TableHead,
        TableRow,
        Stack,
        Pagination,
        PaginationItem,
        IconButton,
        Dialog,
        DialogTitle,
        DialogContent,
        DialogActions,
        Button,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function TableCard({ columns, rows, onEditClick, onDeleteClick }) {
        const [page, setPage] = useState(0);
        const [rowsPerPage, setRowsPerPage] = useState(10);
       
        const handleChangePage = (event, newPage) => {
                setPage(newPage);
        };

        const handleEditClick = (rowId) => {
                onEditClick(rowId)
               
        }

        const handleDeleteClick = (rowId) => {
                onDeleteClick(rowId);
        };

        return (
                <Paper sx={{ width: '100%', overflow: 'hidden', mt: 4 }}>
                        <TableContainer sx={{ maxHeight: 640 }}>
                                <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                                <TableRow>
                                                        {columns.map((column) => (
                                                                <TableCell
                                                                        key={column.id}
                                                                        align={column.align}
                                                                        style={{
                                                                                minWidth: column.minWidth,
                                                                                fontFamily: 'Cairo', // Apply 'Cairo' font family
                                                                        }}
                                                                >
                                                                        {column.label}
                                                                </TableCell>
                                                        ))}
                                                </TableRow>
                                        </TableHead>
                                        <TableBody>
                                                {rows
                                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                        .map((row) => (
                                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                                        {columns.map((column) => (
                                                                                <TableCell
                                                                                        key={column.id}
                                                                                        align={column.align}
                                                                                        style={{ fontFamily: 'Cairo' }}
                                                                                >
                                                                                        {column.id === 'operation' ? (
                                                                                                <>

                                                                                                        <IconButton
                                                                                                                aria-label="Delete"
                                                                                                                onClick={() => handleDeleteClick(row.id)
                                                                                                                }
                                                                                                        >
                                                                                                                <DeleteIcon
                                                                                                                        style={{ fontSize: 20, color: 'red' }}
                                                                                                                />
                                                                                                        </IconButton>
                                                                                                        <IconButton
                                                                                                                aria-label="Edit"
                                                                                                                onClick={() => handleEditClick(row.id)}
                                                                                                        >
                                                                                                                <EditIcon
                                                                                                                        style={{ fontSize: 20, color: '#1d2634' }}
                                                                                                                />
                                                                                                        </IconButton>
                                                                                                </>
                                                                                        ) : (
                                                                                                row[column.id]

                                                                                        )}
                                                                                </TableCell>
                                                                        ))}
                                                                </TableRow>
                                                        ))}
                                        </TableBody>
                                </Table>
                        </TableContainer>
                        <Stack spacing={2} sx={{ p: 3 }}>
                                <Pagination
                                        count={10}
                                        renderItem={(item) => (
                                                <PaginationItem
                                                        slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                                                        {...item}
                                                />
                                        )}
                                        onChange={handleChangePage}
                                />
                        </Stack>

               
                </Paper >
        );
}
