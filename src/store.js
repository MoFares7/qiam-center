import { configureStore } from '@reduxjs/toolkit';
import authReducer from './services/AuthServices/authSlice';
import tokenReducer from './services/AuthServices/tokenSlice';
import departmentReducer from './services/DepartmentServices/getDepatmentsSlice';
import addepartmentReducer from './services/DepartmentServices/addDepartmentSlice';
import editdepartmentReducer from './services/DepartmentServices/editDepartmentsSlice';
import deletedepartmentReducer from './services/DepartmentServices/deleteDepartmentsSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        token: tokenReducer,
        getDepartment: departmentReducer,
        addDepartments: addepartmentReducer,
        editDepartments: editdepartmentReducer,
        deleteDepartments: deletedepartmentReducer

    }
});

export default store;