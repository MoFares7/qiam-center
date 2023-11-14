import { Build, BuildCircleOutlined, CenterFocusStrongOutlined, CenterFocusStrongTwoTone, DepartureBoardTwoTone, GiteOutlined, Home, HouseOutlined, Rule, Title, Unarchive, Work } from '@mui/icons-material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
        FaBars,
        FaBuilding,
        FaCodeBranch
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
                        icon: <GiteOutlined />
                },
                {
                        path: "/jobVacancies",
                        name: t("Job Vacancies"),
                        icon: <Work />
                },
                {
                        path: "/jobsTitle",
                        name: t("Jobs Title"),
                        icon: <Title />
                },
        ]
        return (
                <div>

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

                        </div>
                        <main>{children}</main>
                </div>
        );
};

export default Sidebar;

