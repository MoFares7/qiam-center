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
import DialogInfo from '../../components/DialogAddInfo';
import DialogTextField from '../../components/DialogTextField';

export default function TableCard({ columns, rows, onEditClick, onDeleteClick }) {
        const [page, setPage] = useState(0);
        const [rowsPerPage, setRowsPerPage] = useState(10);
        const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
        const [selectedRowId, setSelectedRowId] = useState(null);

        const handleChangePage = (event, newPage) => {
                setPage(newPage);
        };

        const handleEditClick = (rowId) => {
                // setSelectedRowId(rowId);
                onEditClick(rowId)

        }

        const handleDeleteClick = (rowId) => {
                onDeleteClick(rowId);
                setDeleteDialogOpen(true);
        };

        const handleDeleteConfirmation = () => {
                // Call your delete function here with the selectedRowId
                console.log("selectedRowId " + selectedRowId)
                onDeleteClick(selectedRowId);
                setDeleteDialogOpen(false);
        };

        const handleDeleteDialogClose = () => {
                setDeleteDialogOpen(false);
        };

        return (
                <Paper sx={{ width: '100%', overflow: 'hidden', mt: 4, backgroundColor: '#1d2634' }}>
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
                                                                                        style={{ fontFamily: 'Cairo', color: 'white', }}
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
                                                                                                                        style={{ fontSize: 20, color: 'white' }}
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
            

                        {/* Delete Confirmation Dialog */}
                        <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
                                <DialogTitle sx={{
                                        fontFamily: 'Cairo',
                                }}>عملية حذف نهائية</DialogTitle>
                                <DialogContent>
                                        هل أنت متأكد من إتمام عملية الحذف
                                </DialogContent>
                                <DialogActions>
                                        <Button onClick={handleDeleteDialogClose} color="primary" sx={{
                                                fontFamily: 'Cairo',
                                        }}>
                                                تراجع
                                        </Button>
                                        <Button onClick={handleDeleteConfirmation} color="error" sx={{
                                                fontFamily: 'Cairo',
                                        }}>
                                                حذف
                                        </Button>
                                </DialogActions>
                        </Dialog>
                </Paper >
        );
}
