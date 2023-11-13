import { Build, BuildCircleOutlined, CenterFocusStrongOutlined, CenterFocusStrongTwoTone, DepartureBoardTwoTone, Home, HouseOutlined, Unarchive, Work } from '@mui/icons-material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
        FaBars,
        FaBuilding
} from "react-icons/fa";
import { NavLink } from 'react-router-dom';


const Sidebar = ({ children }) => {
        const { t } = useTranslation();
        const [isOpen, setIsOpen] = useState(false);
        const toggle = () => setIsOpen(!isOpen);
        const menuItem = [
                {
                        path: "/",
                        name: t('Home'),
                        icon: <Home />
                },
                {
                        path: "/department",
                        name: t("Department"),
                        icon: <FaBuilding />
                },
                {
                        path: "/jobVacancies",
                        name: t("Job Vacancies"),
                        icon: <Work />
                },
        ]
        return (
                <div className="container">
                        <div style={{ width: isOpen ? "250px" : "70px" }} className="sidebar">
                                <div className="top_section">
                                        <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">{t('qiam')}</h1>
                                        <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
                                                <FaBars onClick={toggle} />
                                        </div>
                                </div>
                                {
                                        menuItem.map((item, index) => (
                                                <NavLink to={item.path} key={index} className="link" activeclassName="active">
                                                        <div className="icon">{item.icon}</div>
                                                        <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                                                </NavLink>
                                        ))
                                }
                        </div>
                        <main>{children}</main>
                </div>
        );
};

export default Sidebar;


// import React from 'react'
// import {
// BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill,
// BsListCheck, BsMenuButtonWideFill, BsFillGearFill
// }
//         from 'react-icons/bs'

// function Sidebar({ openSidebarToggle, OpenSidebar }) {
//         return (
//                 <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
//                         <div className='sidebar-title'>
//                                 <div className='sidebar-brand'>
//                                         <BsCart3 className='icon_header' /> SHOP
//                                 </div>
//                                 <span className='icon close_icon' onClick={OpenSidebar}>X</span>
//                         </div>

//                         <ul className='sidebar-list'>
//                                 <li className='sidebar-list-item'>
//                                         <a href="">
//                                                 <BsGrid1X2Fill className='icon' /> Dashboard
//                                         </a>
//                                 </li>
//                                 <li className='sidebar-list-item'>
//                                         <a href="">
//                                                 <BsFillArchiveFill className='icon' /> Products
//                                         </a>
//                                 </li>
//                                 <li className='sidebar-list-item'>
//                                         <a href="">
//                                                 <BsFillGrid3X3GapFill className='icon' /> Categories
//                                         </a>
//                                 </li>
//                                 <li className='sidebar-list-item'>
//                                         <a href="">
//                                                 <BsPeopleFill className='icon' /> Customers
//                                         </a>
//                                 </li>
//                                 <li className='sidebar-list-item'>
//                                         <a href="">
//                                                 <BsListCheck className='icon' /> Inventory
//                                         </a>
//                                 </li>
//                                 <li className='sidebar-list-item'>
//                                         <a href="">
//                                                 <BsMenuButtonWideFill className='icon' /> Reports
//                                         </a>
//                                 </li>
//                                 <li className='sidebar-list-item'>
//                                         <a href="">
//                                                 <BsFillGearFill className='icon' /> Setting
//                                         </a>
//                                 </li>
//                         </ul>
//                 </aside>
//         )
// }

// export default Sidebar