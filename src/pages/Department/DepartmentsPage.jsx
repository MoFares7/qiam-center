import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Divider,
  CircularProgress,
  IconButton,
} from '@mui/material';
import SearchField from '../../components/SearchField';
import SearchIcon from '@mui/icons-material/Search';
import TableCard from './TableCard';
import { useDispatch, useSelector } from 'react-redux';
import { getDepartments } from '../../services/DepartmentServices/getDepatmentsSlice';
import { deleteDepartments } from '../../services/DepartmentServices/deleteDepartmentsSlice';
import DialogTextField from '../../components/DialogTextField';
import DialogInfo from '../../components/DialogAddInfo';
import addDepartmentSlice, { addDepartments } from '../../services/DepartmentServices/addDepartmentSlice';
import { addDepartmentsStart, addDepartmentsSuccess, addDepartmentsFailure } from '../../services/DepartmentServices/addDepartmentSlice';

const DepartmentsPage = () => {
  const [open, setOpen] = useState(false);
  const [departmentName, setDepartmentName] = useState('');
  const [departmentDescription, setDepartmentDescription] = useState('');
  const [departmentNameError, setDepartmentNameError] = useState(false);

  const dispatch = useDispatch();
  const departments = useSelector((state) => state.getDepartment.data);

  // Ensure that departments is always an array, if not set it to an empty array
  const departmentList = Array.isArray(departments) ? departments : [];

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);


  //?  open dialog add department
  const handleOpenDialog = () => {
    setOpen(true); // Open the dialog
  };
  const handleCloseDialog = () => {
    setOpen(false); // Close the dialog
  };


  //? ////////////////handle get Department///////////////////////
  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);


  //? ////////////////handle add Department///////////////////////// 
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
        })
        .catch((error) => {
          dispatch(addDepartmentsFailure(error));
        });
    }
  };

  //? ////////////////handle Edit Department////////////////////////////
  const handleEditClick = (departmentId) => {
    // const departmentToEdit = departmentList.find((department) => department.id === departmentId);
    // Dispatch action to open dialog and pass data to it
    // dispatch(editDepartments(2));
    // dispatch(setEditDialogOpen(true));

  };

  const handleDeleteConfirmation = async () => {
    try {
      const action = await dispatch(deleteDepartments({ id: 1 }));
      const response = action.payload;

      console.log('Response:', response);

      if (response && response.message) {
        alert(response.message);
      } else {
        alert('Unexpected response structure');
      }

      setDeleteDialogOpen(false);
    } catch (error) {
      console.error('Error deleting department:', error);
    }
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
            handleDeleteConfirmation(department.dep_id);
            console.log("department.name " + department.name);
          }}
        >
          {/* Your icon component here */}
        </IconButton>
        <IconButton
          aria-label="Edit"
          onClick={() => handleEditClick(department.id)}
        >
          {/* <EditIcon style={{ fontSize: 20, color: '#1d2634' }} /> */}
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

      <TableCard columns={columns} rows={rows} onEditClick={handleEditClick} onDeleteClick={handleDeleteConfirmation} />

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
        إضافة قسم
      </Button>

      <DialogInfo
        errorCheck={handleAddDepartment}
        onClickOpen={open}
        onClickClose={handleCloseDialog}
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
    </Box>
  );
};

export default DepartmentsPage;
