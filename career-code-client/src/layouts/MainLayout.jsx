import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../components/pages/NavBar';
import Footer from '../components/pages/Footer';

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