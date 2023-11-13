import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import DepartmentsPage from './pages/Department/DepartmentsPage';
import LoginPage from './pages/Auth/LoginPage';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from '@mui/material/styles';
import theme from './utils/theme';
import JobVacanciesPage from './pages/JobVacancies/JobVacanciesPage';
import SidebarLayout from './components/SidebarLayout';
import '@fontsource/cairo/400.css';
import i18n from './assets/Translate/i18n';
import enTranslation from './assets/Translate/english.json';
import arTranslation from './assets/Translate/arbic.json';

function App() {
  const { i18n } = useTranslation();

  document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<SidebarLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/department" element={<DepartmentsPage />} />
            <Route path="/jobVacancies" element={<JobVacanciesPage />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}


export default App;
