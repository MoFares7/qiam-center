import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Divider,
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import SearchField from '../../components/SearchField';
import SearchIcon from '@mui/icons-material/Search';
import TableCard from './TableCard';
import { useDispatch, useSelector } from 'react-redux';
import DialogTextField from '../../components/DialogTextField';
import DialogInfo from '../../components/DialogAddInfo';
import { getDepartments } from '../../services/DepartmentServices/getDepatmentsSlice';
import { addDepartments, addDepartmentsStart, addDepartmentsSuccess, addDepartmentsFailure } from '../../services/DepartmentServices/addDepartmentSlice';
import { editDepartments, editDepartmentsFailure, editDepartmentsSuccess } from '../../services/DepartmentServices/editDepartmentsSlice';
import { deleteDepartments, deleteDepartmentsSuccess, deleteDepartmentsFailure } from '../../services/DepartmentServices/deleteDepartmentsSlice';

const DepartmentsPage = () => {
  const [open, setOpen] = useState(false);
  const [departmentName, setDepartmentName] = useState('');
  const [departmentDescription, setDepartmentDescription] = useState('');
  const [departmentNameError, setDepartmentNameError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);

  const dispatch = useDispatch();
  const departments = useSelector((state) => state.getDepartment.data);

  // Ensure that departments is always an array, if not set it to an empty array
  const departmentList = Array.isArray(departments) ? departments : [];


  //?  ////////// open dialog add department ////////////////
  const handleOpenDialog = (editing = false, rowId = 1) => {
    setIsEditing(editing);
    setOpen(true);

    // If editing, populate the input fields with department details
    if (editing && rowId !== null) {
      const selectedDepartment = departmentList.find((department) => department.dep_id === rowId);
      setDepartmentName(selectedDepartment.name);
      setDepartmentDescription(selectedDepartment.description);
      setSelectedDepartmentId(rowId);
    } else {
      setDepartmentName('');
      setDepartmentDescription('');
      setSelectedDepartmentId(null);
    }
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setDepartmentName('');
    setDepartmentDescription('');
    setSelectedDepartmentId(null);
    setIsEditing(false);
  };

  //? ////////////////handle get Department///////////////////////
  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);

  //? ////////////////handle add Department///////////////////////// 
  const handleAddClick = () => {
    handleOpenDialog(false);
  }

  const handleAddDepartment = () => {
    if (departmentName.trim() === '') {
      setDepartmentNameError(true);

    } else {
      setDepartmentNameError(false);

      dispatch(addDepartmentsStart());
      dispatch(
        addDepartments({
          body: {
            name: departmentName,
            description: departmentDescription,
          },
        })
      )
        .then(() => {
          // On success, you can perform any additional actions here
          dispatch(addDepartmentsSuccess());
          dispatch(getDepartments());
          handleCloseDialog();
        })
        .catch((error) => {
          dispatch(addDepartmentsFailure(error));
        });
    }
  };

  //? ////////////////handle Edit Department////////////////////////////
  const handleEditClick = (rowId) => {
    handleOpenDialog(false);
    setIsEditing(true)

    if (departmentName.trim() === '') {
      setDepartmentNameError(true);
    } else {
      setDepartmentNameError(false);

      dispatch(
        editDepartments({
          id: rowId,
          body: {
            name: departmentName,
            description: departmentDescription,
          },
        })
      )
        .then((response) => {

          console.log('Edit successful:', response);
          dispatch(editDepartmentsSuccess());
          handleCloseDialog();
          dispatch(getDepartments());
        })
        .catch((error) => {

          console.error('Edit error:', error);
          dispatch(editDepartmentsFailure(error));
        });
    }
  };

  //? ///////////// handle Delete Department ////////////////////////////
  const handleDeleteClick = async (rowId) => {
    setDeleteDialogOpen(true);
    console.log('before row ID:', rowId);

    dispatch(
      deleteDepartments({
        id: rowId,
      })
    )
      .then((response) => {
        // Check the response from the server

        console.log('after success row ID:', rowId);

        console.log('delete successful:', response);
        dispatch(deleteDepartmentsSuccess());
        setDeleteDialogOpen(false);
        dispatch(getDepartments());
      })
      .catch((error) => {
        console.log('after Error row ID:', rowId);

        console.error('delete error:', error);
        dispatch(deleteDepartmentsFailure(error));
      });
  }

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const columns = [
    {
      id: 'name',
      label: 'الاسم',
      minWidth: 200,
      align: 'right',
    },
    {
      id: 'description',
      label: 'الوصف',
      minWidth: 200,
      align: 'right',
    },
    {
      id: 'numemployee',
      label: 'عدد الموظفين',
      minWidth: 200,
      align: 'right',
    },
    {
      id: 'operation',
      label: 'العمليات',
      minWidth: 200,
      align: 'right',
    },
  ];

  const rows = departmentList.map((department) => ({
    id: department.dep_id,
    name: department.name,
    description: department.description,
    numemployee: department.employees_count,
    operation: (
      <>
        <IconButton
          aria-label="Delete"
          onClick={() => {
            handleDeleteClick(department.dep_id);
            console.log("department.name " + department.name);
          }}
        >

        </IconButton>
        <IconButton
          aria-label="Edit"
          onClick={() => handleEditClick(department.dep_id)}
        >
        </IconButton>
      </>
    ),
  }));

  if (!departmentList || !departmentList.length) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: 5,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: 5,
      }}
    >
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
      <Divider sx={{ pt: 3 }} />

      <TableCard columns={columns} rows={rows} onEditClick={handleEditClick} onDeleteClick={handleDeleteClick} />

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
        onClick={handleAddClick}
      >
        إضافة قسم
      </Button>


      <DialogInfo
        onChnage={isEditing ? handleEditClick : handleAddDepartment}
        onClickOpen={open}
        onClickClose={handleCloseDialog}
        titleDialog={isEditing ? "تعديل قسم" : "إضافة قسم"}
        dialogContent={
          <>
            <DialogTextField
              required
              autoFocus
              margin="dense"
              id="departmentName"
              label="اسم القسم"
              fontFamily="Cairo"
              type="text"
              fullWidth
              InputProps={{
                style: {
                  textAlign: 'right',
                  fontFamily: 'Cairo',
                },
              }}
              InputLabelProps={{
                style: {
                  fontFamily: 'Cairo',
                  textAlign: 'right',
                },
              }}
              error={departmentNameError}
              helperText={departmentNameError ? ' الحقل مطلوب' : ''}
              onChange={(e) => {
                setDepartmentName(e.target.value);
                if (e.target.value.trim() !== '') {
                  setDepartmentNameError(false);
                }
              }}
            />
            <DialogTextField
              autoFocus
              margin="dense"
              id="departmentDescription"
              label="وصف القسم"
              fullWidth
              InputProps={{
                style: {
                  fontFamily: 'Cairo',
                  textAlign: 'right',
                },
              }}
              InputLabelProps={{
                style: {
                  fontFamily: 'Cairo',
                  textAlign: 'right',
                },
              }}
              error={departmentNameError}
              helperText={departmentNameError ? ' الحقل مطلوب' : ''}
              onChange={(e) => {
                setDepartmentDescription(e.target.value);
              }}
            />
          </>
        }
      />

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
          <Button onClick={() => handleDeleteClick(rowId)} color="error" sx={{
            fontFamily: 'Cairo',
          }}>
            حذف
          </Button>

        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DepartmentsPage;
