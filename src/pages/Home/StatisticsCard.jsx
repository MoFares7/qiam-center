import { Box, Typography } from '@mui/material';
import React from 'react';
import '../../App.css';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill }
        from 'react-icons/bs'
const StatisticsCard = () => {
        return (
                <div className='main-cards'>
                        <div className='card'>
                                <div className='card-inner'>
                                        <h3>المستفيدين</h3>
                                        <BsFillArchiveFill className='card_icon' />
                                </div>
                                <Typography sx={{ fontFamily: 'Cairo', color: 'white', fontSize: '30px' }}>300</Typography>
                        </div>
                        <div className='card'>
                                <div className='card-inner'>
                                        <h3>الموظفين</h3>
                                        <BsFillGrid3X3GapFill className='card_icon' />
                                </div>
                                <Typography sx={{ fontFamily: 'Cairo', color: 'white', fontSize: '30px' }}>68</Typography>

                        </div>
                        <div className='card'>
                                <div className='card-inner'>
                                        <h3>مستخدمي التطبيق'</h3>
                                        <BsPeopleFill className='card_icon' />
                                </div>
                                <Typography sx={{ fontFamily: 'Cairo', color: 'white', fontSize: '30px' }}>20</Typography>

                        </div>
                        <div className='card'>
                                <div className='card-inner'>
                                        <h3>الموظفين النشطين</h3>
                                        <BsFillBellFill className='card_icon' />
                                </div>
                                <Typography sx={{ fontFamily: 'Cairo', color: 'white', fontSize: '30px' }}>120</Typography>
                        </div>
                        <div className='card'>
                                <div className='card-inner'>
                                        <h3>الموظفين النشطين</h3>
                                        <BsFillBellFill className='card_icon' />
                                </div>
                                <Typography sx={{ fontFamily: 'Cairo', color: 'white', fontSize: '30px' }}>120</Typography>
                        </div>
                        <div className='card'>
                                <div className='card-inner'>
                                        <h3>الموظفين النشطين</h3>
                                        <BsFillBellFill className='card_icon' />
                                </div>
                                <Typography sx={{ fontFamily: 'Cairo', color: 'white', fontSize: '30px' }}>120</Typography>
                        </div>
                </div>
        );
};

export default StatisticsCard;
