import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Divider,
  CircularProgress,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import SearchField from '../../components/SearchField';
import SearchIcon from '@mui/icons-material/Search';
import TableCard from '../Department/TableCard';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import DialogTextField from '../../components/DialogTextField';
import DialogInfo from '../../components/DialogAddInfo';
import { getDepartments } from '../../services/DepartmentServices/getDepatmentsSlice';
import { getJobVacancies } from '../../services/JobVacanciesSlice/getJobSlice';
import { addJobsVacancies, addJobVacanciesStart, addJobVacanciesSuccess } from '../../services/JobVacanciesSlice/addJobsSlice';
import { editDepartments, editDepartmentsFailure, editDepartmentsSuccess } from '../../services/DepartmentServices/editDepartmentsSlice';
import { deleteDepartments, deleteDepartmentsSuccess, deleteDepartmentsFailure } from '../../services/DepartmentServices/deleteDepartmentsSlice';
import SearchHeader from './../../components/SearchHeader';
import MainButton from '../../components/MainButton';

const JobVacanciesPage = () => {
  const [open, setOpen] = useState(false);
  const [departmentName, setDepartmentName] = useState('');
  const [departmentNumberEmployee, setDepartmentNumberEmployee] = useState('');
  const [departmentDescription, setDepartmentDescription] = useState('');
  const [departmentNameError, setDepartmentNameError] = useState(false);
  const [departmentNumberEmployeeError, setdepartmentNumberEmployeeError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(1);

  const dispatch = useDispatch();

  const departmentsOption = useSelector((state) => state.getDepartment.data);
  const departments = useSelector((state) => state.getJobVacancies.data);

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
      setSelectedDepartmentId(selectedDepartment.dep_id);
      setDepartmentNumberEmployee(selectedDepartment.count);
    } else {
      setDepartmentName('');
      setDepartmentDescription('');
      setSelectedDepartmentId(null);
      setDepartmentNumberEmployee(null);
    }
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setDepartmentName('');
    setDepartmentDescription('');
    setSelectedDepartmentId(null);
    setDepartmentNumberEmployee(null);
    setIsEditing(false);
  };

  //! //////////////// handle get JobVacancies && Department ///////////////////////
  useEffect(() => {
    dispatch(getJobVacancies());
  }, [dispatch])

  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);

  //! //////////////// handle add Department ///////////////////////// 
  const handleAddClick = () => {
    handleOpenDialog(false);
  }
  const handleAutocompleteChange = (event, newValue) => {
    const selectedDepartment = departmentsOption.find((department) => department.name === newValue);
    if (selectedDepartment) {
      setSelectedDepartmentId(selectedDepartment.dep_id);
    } else {
      setSelectedDepartmentId(null);
    }
  };

  const handleAddDepartment = () => {
    if (departmentName.trim() === '') {
      setDepartmentNameError(true);
      setDepartmentNumberEmployee(true);

    } else {
      setDepartmentNameError(false);
      setDepartmentNumberEmployee(false);

      dispatch(addJobVacanciesStart());
      dispatch(
        addJobsVacancies({
          body: {
            dep_id: selectedDepartmentId,
            name: departmentName,
            description: departmentDescription,
            count: departmentNumberEmployee
          },
        })
      )
        .then(() => {
          dispatch(addJobVacanciesSuccess());
          dispatch(getJobVacancies());
          handleCloseDialog();
        })
        .catch((error) => {
          //  dispatch(addJobVacanciesFailure(error));
        });
    }
  };
  const handleAutocompleteFocus = () => {
    if (!departmentsOption) {
      // Fetch departments only if data is not already available
      dispatch(getDepartments());
    }
  };

  //? ////////////////handle Edit Department////////////////////////////
  const handleEditOpenClick = (rowId) => {

    handleEditClick(rowId);
  }
  const handleEditClick = (rowId) => {
    // handleOpenDialog(true, 1);
    // setIsEditing(true)
    // console.log("row id one " + rowId)
    // if (departmentName.trim() === '') {
    //   setDepartmentNameError(true);
    // } else {
    //   setDepartmentNameError(false);
    //   handleOpenDialog(false);
    //   console.log("row id two " + rowId)
    //   dispatch(
    //     editDepartments({
    //       id: rowId,
    //       body: {
    //         name: departmentName,
    //         description: departmentDescription,
    //       },
    //     })
    //   )
    //     .then((response) => {
    //       console.log("row id three" + rowId)
    //       console.log('Edit successful:', response);
    //       dispatch(editDepartmentsSuccess());
    //       handleCloseDialog();
    //       dispatch(getJobVacancies());
    //     })
    //     .catch((error) => {

    //       console.error('Edit error:', error);
    //       dispatch(editDepartmentsFailure(error));
    //     });
    // }
  };

  //? ///////////// handle Delete Department ////////////////////////////
  const handleDeleteClick = async (rowId) => {
    // setDeleteDialogOpen(true);
    // console.log('before row ID:', rowId);

    // dispatch(
    //   deleteDepartments({
    //     id: rowId,
    //   })
    // )
    //   .then((response) => {
    //     // Check the response from the server

    //     console.log('after success row ID:', rowId);

    //     console.log('delete successful:', response);
    //     dispatch(deleteDepartmentsSuccess());
    //     setDeleteDialogOpen(false);
    //     dispatch(getJobVacancies());
    //   })
    //   .catch((error) => {
    //     console.log('after Error row ID:', rowId);

    //     console.error('delete error:', error);
    //     dispatch(deleteDepartmentsFailure(error));
    //   });
  }

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  //! //////////////// inital data table  //////////////////////////
  const columns = [
    {
      id: 'name',
      label: 'اسم الوظيفة',
      align: 'right', minWidth: 170,
    },
    {
      id: 'description',
      label: 'الوصف',
      align: 'right', minWidth: 170,
    },
    {
      id: 'count',
      label: 'عدد الموظفين',
      align: 'right', minWidth: 170,
    },
    {
      id: 'department_name',
      label: 'القسم',
      align: 'right', minWidth: 170,
    },
    {
      id: 'vacancy_status_name',
      label: 'حالة الشاغر',
      align: 'right',
    },

    {
      id: 'operation',
      label: 'العمليات',
      minWidth: 20,
      align: 'right',
    },
  ];


  const rows = departmentList.map((department) => ({
    id: department.dep_id,
    name: department.name,
    description: department.description,
    vacancy_status_name: department.vacancy_status_name,
    count: department.count,
    department_name: department.department_name,
    operation: (
      <>
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
        pr: 10
      }}
    >
      <SearchHeader />

      <TableCard columns={columns} rows={rows} onEditClick={handleEditClick} onDeleteClick={handleDeleteClick} />

      <MainButton
        title= " إضافة شاغر وظيفي"
        color='#2962ff'
        width={{
          xs: '200px',
          sm: '250px',
          md: '300px',
        }
        } onClick={handleAddClick}
      />

      <DialogInfo
        onChnage={isEditing ? handleEditClick : handleAddDepartment}
        onClickOpen={open}
        onClickClose={handleCloseDialog}
        titleDialog={isEditing ? "تعديل شاغر وظيفي" : "إضافة شاغر وظيفي"}
        dialogContent={
          <>
            <DialogTextField
              required={true}
              id="departmentName"
              label="اسم الشاغر"
              type="text"
              fullWidth={true}
              error={departmentNameError}
              helperText={departmentNameError ? ' الحقل مطلوب' : ''}
              onChange={(e) => {
                setDepartmentName(e.target.value);
                if (e.target.value.trim() !== '') {
                  setDepartmentNameError(false);
                }
              }} />
            <Autocomplete
              value={value}
              fullWidth
              onChange={handleAutocompleteChange}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}

              id="departmentsOption"
              options={departmentsOption ? departmentsOption.map((department) => department.name) : []}
              sx={{ pt: 0.5, fontFamily: 'Cairo' }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="اسم القسم"
                  InputLabelProps={{
                    style: {
                      fontFamily: 'Cairo',
                      fontSize: '12px',
                    },
                  }}
                />
              )}
              onFocus={handleAutocompleteFocus}
            />
            <DialogTextField
              required={true}
              id="departmentNumberEmployee"
              label="عدد الموظفين "
              type="number"
              fullWidth={false}
              error={departmentNumberEmployeeError}
              helperText={departmentNumberEmployeeError ? ' الحقل مطلوب' : ''}
              onChange={(e) => {
                setDepartmentNumberEmployee(e.target.value);
                if (e.target.value.trim() !== '') {
                  setdepartmentNumberEmployeeError(false);
                }
              }}
            />
            <DialogTextField
              required={true}
              id="departmentDescription"
              label="وصف القسم"
              type="text"
              fullWidth={true}

              onChange={(e) => {
                setDepartmentDescription(e.target.value);
              }} /></>
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
          <Button onClick={handleDeleteClick} color="error" sx={{
            fontFamily: 'Cairo',
          }}>
            حذف
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default JobVacanciesPage;

