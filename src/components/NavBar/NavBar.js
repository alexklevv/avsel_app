import React from 'react';
import {Layout, Menu} from 'antd';
import {useLocation, useNavigate} from 'react-router-dom';
import {useSelector} from "react-redux";

const {Header} = Layout;

const NavBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {isAuthenticated} = useSelector(state => state.auth);

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
                {isAuthenticated ? (
                    <Menu.Item key={'profile'} onClick={() => navigate('/profile/settings')}>Profile</Menu.Item>
                ) : (
                    <React.Fragment>
                        <Menu.Item key={'login'} onClick={() => navigate('/login')}>Login</Menu.Item>
                        <Menu.Item key={'registration'} onClick={() => navigate('/registration')}>Registration</Menu.Item>
                    </React.Fragment>
                )}
            </Menu>
        </Header>
    );
}


export default NavBar;