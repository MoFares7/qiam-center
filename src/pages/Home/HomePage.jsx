import { Box, Divider, Typography } from '@mui/material';
import React, { useState } from 'react';
import StatisticsCard from './StatisticsCard';
import { useTranslation } from 'react-i18next';
import {
        ResponsiveContainer,
        BarChart,
        CartesianGrid,
        XAxis,
        YAxis,
        Tooltip,
        Legend,
        Bar,
        LineChart,
        Line,
} from 'recharts';



const HomePage = () => {

        const data = [
                {
                        name: 'Page A',
                        uv: 4000,
                        pv: 2400,
                        amt: 2400,
                },
                {
                        name: 'Page B',
                        uv: 3000,
                        pv: 1398,
                        amt: 2210,
                },
                {
                        name: 'Page C',
                        uv: 2000,
                        pv: 9800,
                        amt: 2290,
                },
                {
                        name: 'Page D',
                        uv: 2780,
                        pv: 3908,
                        amt: 2000,
                },
                {
                        name: 'Page E',
                        uv: 1890,
                        pv: 4800,
                        amt: 2181,
                },
                {
                        name: 'Page F',
                        uv: 2390,
                        pv: 3800,
                        amt: 2500,
                },
                {
                        name: 'Page G',
                        uv: 3490,
                        pv: 4300,
                        amt: 2100,
                },
        ];
        const { i18n } = useTranslation();

        const changeLanguage = (lng) => {
                i18n.changeLanguage(lng);
        };

        return (
                <Box sx={{ display: 'block' }}>
                        <div>
                                <button onClick={() => changeLanguage('en')}>English</button>
                                <button onClick={() => changeLanguage('ar')}>العربية</button>
                        </div>
                        <main className='main-container'>
                                <div className='main-cards'>
                                        {/* <div className='card'>
                                                <div className='card-inner'>
                                                        <StatisticsCard icon={<BsFillArchiveFill className='card_icon' />} numberCounter={300} title="المستفيدين" />
                                                        <StatisticsCard icon={<BsFillGrid3X3GapFill className='card_icon' />} numberCounter={100} title="الموظفين" />
                                                        <StatisticsCard icon={<BsPeopleFill className='card_icon' />} numberCounter={43} title="مستخدمي التطبيق" />
                                                        <StatisticsCard icon={<BsFillBellFill className='card_icon' />} numberCounter={8} title="الموظفين النشطين" />
                                                        <StatisticsCard icon={<BsPeopleFill className='card_icon' />} numberCounter={98} title="المستفيدين الموثقين" />
                                                        <StatisticsCard icon={<BsFillArchiveFill className='card_icon' />} numberCounter={6} title="مستخدمي التطبيق الموثقين" />
                                                </div>
                                        </div> */}
                                        <StatisticsCard />
                                </div>
                                <Divider sx={{

                                        backgroundColor: '#fff'
                                }} />
                                <div className='charts'>
                                        <ResponsiveContainer width="100%" height="100%">
                                                <BarChart
                                                        width={500}
                                                        height={300}
                                                        data={data}
                                                        margin={{
                                                                top: 5,
                                                                right: 30,
                                                                left: 20,
                                                                bottom: 5,
                                                        }}
                                                >
                                                        <CartesianGrid strokeDasharray="3 3" />
                                                        <XAxis dataKey="name" />
                                                        <YAxis />
                                                        <Tooltip />
                                                        <Legend />
                                                        <Bar dataKey="pv" fill="#8884d8" />
                                                        <Bar dataKey="uv" fill="#82ca9d" />
                                                </BarChart>
                                        </ResponsiveContainer>

                                        <ResponsiveContainer width="100%" height="100%">
                                                <LineChart
                                                        width={500}
                                                        height={300}
                                                        data={data}
                                                        margin={{
                                                                top: 5,
                                                                right: 30,
                                                                left: 20,
                                                                bottom: 5,
                                                        }}
                                                >
                                                        <CartesianGrid strokeDasharray="3 3" />
                                                        <XAxis dataKey="name" />
                                                        <YAxis />
                                                        <Tooltip />
                                                        <Legend />
                                                        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                                                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                                                </LineChart>
                                        </ResponsiveContainer>

                                </div>
                        </main>
                </Box>
        );
};

export default HomePage;
