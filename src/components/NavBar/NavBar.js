import React from 'react';
import {Layout, Menu} from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

const {Header} = Layout;

const NavBar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <Header>
            <div className="logo"/>
            <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[location.pathname.split('/')[1]]}
            >
                <Menu.Item key={''} onClick={() => navigate('/')}>Home</Menu.Item>
                <Menu.Item key={'cars'} onClick={() => navigate('/cars')}>Cars</Menu.Item>
                <Menu.Item key={'profile'} onClick={() => navigate('/profile/settings')}>Profile</Menu.Item>
                {/*<Menu.Item key={'login'} onClick={() => navigate('/login')}>Login</Menu.Item>*/}
                {/*<Menu.Item key={'registration'} onClick={() => navigate('/registration')}>Registration</Menu.Item>*/}
            </Menu>
        </Header>
    );
}


export default NavBar;