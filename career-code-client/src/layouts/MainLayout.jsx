import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../components/pages/Shared/NavBar';
import Footer from '../components/pages/Shared/Footer';

const MainLayout = () => {
    return (
        <div>            
            <div className='max-w-7xl mx-auto'>
                <NavBar/>
                <Outlet/>
                <Footer/>
            </div>            
        </div>
    );
};

export default MainLayout;