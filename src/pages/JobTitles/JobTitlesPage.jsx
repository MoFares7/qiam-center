import { Box, Card, CardContent, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchHeader from '../../components/SearchHeader'
import TableCard from '../Department/TableCard'
import { useSelector, useDispatch } from 'react-redux';
import { getJobTitles } from '../../services/JobTitleSlice/getJobTitleSlice';
import MainButton from '../../components/MainButton';
import MultipleSelectChip from './MultipleSelectChip';
import DialogTextField from '../../components/DialogTextField';
import DialogInfo from '../../components/DialogAddInfo';

const JobTitlesPage = () => {
        const [open, setOpen] = useState(false);
        const [jobTitleName, setjobTitleName] = useState('');
        const [jobTitleDesriotion, setjobTitleDesriotion] = useState('');
        const [jobTitleNameError, setJobTitletNameError] = useState(false);
        const [jobTitleDesriotionError, setdJobTitleDesriotionError] = useState(false);
        const [isEditing, setIsEditing] = useState(false);
        const [selectedJobTitleId, setSelectedJobTitleId] = useState(1);

        const dispatch = useDispatch();
        const jobsTitle = useSelector((state) => state.getJobTitles.data);
        const jobsTitleList = Array.isArray(jobsTitle) ? jobsTitle : [];

        //!  ////////// open dialog add department ////////////////
        const handleOpenDialog = (editing = false, rowId = 1) => {
                setIsEditing(editing);
                setOpen(true);

                // If editing, populate the input fields with department details
                if (editing && rowId !== null) {
                        const selectJobTitleId = jobsTitleList.find((jobTitle) => jobTitle.job_title_id === rowId);
                        setjobTitleName(selectJobTitleId.name);
                        setjobTitleDesriotion(selectJobTitleId.description);
                        // setSelectedDepartmentId(selectedDepartment.dep_id);

                } else {
                        setjobTitleName('');
                        setjobTitleDesriotion('');
                        setSelectedJobTitleId(null);
                }
        };

        const handleCloseDialog = () => {
                setOpen(false);
                setjobTitleName('');
                setjobTitleDesriotion('');
                setSelectedJobTitleId(null);
                setIsEditing(false);
        };

        //! //////////////// Get Jobs Title ///////////////////////////
        const handleAddClick = () => {
                handleOpenDialog(false);
        }

        useEffect(() => {
                dispatch(getJobTitles());
        }, [dispatch])

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
                        id: 'employees_count',
                        label: 'عدد الموظفين',
                        align: 'right', minWidth: 170,
                },
                {
                        id: 'permissions',
                        label: 'الصلاحيات',
                        align: 'right', minWidth: 170,
                },
                {
                        id: 'operation',
                        label: 'العمليات',
                        minWidth: 20,
                        align: 'right',
                },
        ];


        const rows = jobsTitleList.map((jobTitle) => ({
                id: jobTitle.dep_id,
                name: jobTitle.name,
                description: jobTitle.description,
                permissions: (
                        <Box display="flex" flexDirection="row" flexWrap="wrap">
                                {jobTitle.permissions.map((permission) => (
                                        <Card key={permission.perm_id} sx={{ height: '20px', display: 'flex', alignItems: 'center', textAlign: 'center', borderRadius: 7, m: 0.4, p: 1 }}>
                                                <Typography sx={{ fontSize: '10px', fontFamily: 'Cairo', textAlign: 'center' }}>{permission.name}</Typography>
                                        </Card>
                                ))}
                        </Box>
                ), employees_count: jobTitle.employees_count,
                operation: (
                        <>

                        </>
                ),
        }));

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
                        <TableCard columns={columns} rows={rows} />
                        <MainButton
                                title="إضافة مسمى وظيفي "
                                color='#2962ff'
                                width={{
                                        xs: '200px',
                                        sm: '250px',
                                        md: '300px',
                                }
                                }
                                onClick={handleAddClick}
                        />

                        <DialogInfo
                                // onChnage={isEditing ? handleEditClick : handleAddDepartment}
                                onClickOpen={open}
                                onClickClose={handleCloseDialog}
                                titleDialog={isEditing ? "تعديل مسمى وظيفي" : "إضافة مسمى وظيفي"}
                                dialogContent={
                                        <>
                                                <DialogTextField
                                                        required={true}
                                                        id="departmentName"
                                                        label="اسم الشاغر"
                                                        type="text"
                                                        fullWidth={true}
                                                        error={jobTitleNameError}
                                                        helperText={jobTitleNameError ? ' الحقل مطلوب' : ''}
                                                        onChange={(e) => {
                                                                setjobTitleName(e.target.value);
                                                                if (e.target.value.trim() !== '') {
                                                                        setJobTitletNameError(false);
                                                                }
                                                        }} />
                                                <MultipleSelectChip />
                                                <DialogTextField
                                                        required={true}
                                                        id="departmentDescription"
                                                        label="وصف القسم"
                                                        type="text"
                                                        fullWidth={true}

                                                        onChange={(e) => {
                                                                setjobTitleDesriotion(e.target.value);
                                                                if (e.target.value.trim() !== '') {
                                                                        setdJobTitleDesriotionError(false);
                                                                }
                                                        }} />
                                        </>
                                }
                        />

                </Box>
        )
}

export default JobTitlesPage
