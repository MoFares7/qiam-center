import React, { useState } from 'react';
import {
  Box,
  Button,
  Divider,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import SearchField from '../../components/SearchField'
import SearchIcon from '@mui/icons-material/Search';
import TableCard from '../Department/TableCard';
import { createDataEmployee } from '../../utils/Helper';
import DialogTextField from '../../components/DialogTextField';
import Autocomplete from '@mui/material/Autocomplete';
import DialogInfo from '../../components/DialogAddInfo';
const options = ['الموارد البشرية', 'القسم الاعلامي', "قسم الاستقبال", "قسم التعينات"];


const JobVacanciesPage = () => {
  const [open, setOpen] = useState(false);
  const [departmentName, setDepartmentName] = useState('');
  const [departmentNameError, setDepartmentNameError] = useState(false);
  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');

  const handleOpenDialog = () => {
    setOpen(true); // Open the dialog
  };

  const handleCloseDialog = () => {
    setOpen(false); // Close the dialog
  };
  
  const handleAddDepartment = () => {
    // Perform validation
    if (departmentName.trim() === '') {
      setDepartmentNameError(true);
    } else {
      setDepartmentNameError(false);
      // Proceed with adding the department
      // You can handle form submission here
    }
  };

  const columns = [
    {
      id: 'name',
      label: 'اسم الوظيفة',
      align: 'right', minWidth: 170,
    },
    {
      id: 'desciption',
      label: 'الوصف',
      align: 'right', minWidth: 170,
    },
    {
      id: 'numemployee',
      label: 'عدد الموظفين',
      align: 'right', minWidth: 170,
    },
    {
      id: 'department',
      label: 'القسم',
      align: 'right', minWidth: 170,
    },
    {
      id: 'status',
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

  const rows = [
    createDataEmployee('مهندس برمجيات', 'مهندس برمجيات يعمل في قسم البرمجيات لمتابعة الامور التقنية', 3, "قسم الهندسي", "متاح"),
    createDataEmployee('مطور مواقع ويب', 'مهندس برمجيات يعمل في قسم البرمجيات لمتابعة الامور التقنية', 9, "قسم التطوير", "مغلق"),
    createDataEmployee('موظف موارد بشرية', 'مهندس برمجيات يعمل في قسم البرمجيات لمتابعة الامور التقنية', 1, "قسم الموارد", "متاح"),

  ];
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      pt: 5
    }}>
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
        <SearchField placeholder="البحث عن شاغر وظيفي " />
        <Button
          sx={{
            backgroundColor: '#4CAF50',
            color: 'white',
            fontFamily: 'Cairo',
            mb: 0.4,
            mr: 2,
            "&:hover": {
              backgroundColor: '#8BC34A'
            }
          }}
          variant="contained"

        >
          تحديث
        </Button>
      </Box>
      <Divider sx={{ pt: 3 }} />
      <TableCard columns={columns} rows={rows} />

      <DialogInfo titleOpenDialogButton={"إضافة شاغر وظيفي"} errorCheck={handleAddDepartment} dialogContent={
        <>
          <DialogTextField
          required={true}
          id="departmentName"
          label="اسم القسم"
          type="text"
          fullWidth={true}
          error={departmentNameError}
          helperText={departmentNameError ? ' الحقل مطلوب' : ''}
          onChange={(e) => {
            setDepartmentName(e.target.value);
            if (e.target.value.trim() !== '') {
              setDepartmentNameError(false);
            }
          }} /><Autocomplete
            value={value}
            fullWidth
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="controllable-states-demo"
            options={options}
            sx={{ pt: 0.5, fontFamily: 'Cairo' }}
            renderInput={(params) => <TextField {...params}
              label="اسم القسم"
              InputLabelProps={{
                style: {
                  fontFamily: 'Cairo',
                  fontSize: '12px',
                },
              }} />} /><DialogTextField
            required={true}
            id="departmentName"
            label="عدد الموظفين "
            type="text"
            fullWidth={false}
            error={departmentNameError}
            helperText={departmentNameError ? ' الحقل مطلوب' : ''}
            onChange={(e) => {
              setDepartmentName(e.target.value);
              if (e.target.value.trim() !== '') {
                setDepartmentNameError(false);
              }
            }} /><DialogTextField
            required={true}
            id="departmentDescription"
            label="وصف القسم"
            type="text"
            fullWidth={true}

            onChange={(e) => {
            }} /></>
      }
      />
    </Box>
  );
};

export default JobVacanciesPage;
