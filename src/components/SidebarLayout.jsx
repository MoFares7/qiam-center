// SidebarLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const SidebarLayout = () => {
        return (
                <div className="container">
                        <Sidebar />
                        <main style={{

                                marginLeft: '250px',
                                padding: '20px'
                        }}>
                                <Outlet />
                        </main>
                </div>
        );
};

export default SidebarLayout;
