import React, {useEffect} from 'react';
import {Layout, Menu, message} from 'antd';
import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Settings from "./Settings/Settings";
import ActiveOffers from "./ActiveOffers/ActiveOffers";
import ModerationOffers from "./ModerationOffers/ModerationOffers";
import DisabledOffers from "./DisabledOffers/DisabledOffers";
import RejectedOffers from "./RejectedOffers/RejectedOffers";
import FavoriteOffers from "./FavoriteOffers/FavoriteOffers";
import {logout} from "../../redux/actions/auth";
import {useDispatch, useSelector} from "react-redux";
import Complaints from "./Complaints/Complaints";
import Users from "../Users/Users";
import {getCurrentUser} from "../../redux/actions/users";

const {Content, Sider} = Layout;

const Profile = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getCurrentUser())
            .catch(errorText => {
                message.error(errorText);
            });
    }, []);

    const {isAuthenticated} = useSelector(state => state.auth);
    const {current: currentUser} = useSelector(state => state.users);

    if(!isAuthenticated){
        return <Navigate to={'/login'}/>
    }

    const handleLogout = () => {
        dispatch(logout())
    }



    return (
        <Layout style={{height: 'calc(100vh - 64px)'}}>
            <Sider width={300} className="site-layout-background">
                <Menu
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    style={{
                        height: '100%',
                        paddingTop: '30px',
                        borderRight: 0,
                        textTransform: 'uppercase',
                        fontWeight: '500',
                    }}
                >
                    <Menu.SubMenu title={'my offers'}>
                        <Menu.Item onClick={() => navigate('/profile/offers/active')} key={'/profile/offers/active'}>active</Menu.Item>
                        <Menu.Item onClick={() => navigate('/profile/offers/moderation')} key={'/profile/offers/moderation'}>on moderation</Menu.Item>
                        <Menu.Item onClick={() => navigate('/profile/offers/rejected')} key={'/profile/offers/rejected'}>rejected</Menu.Item>
                        {/*<Menu.Item onClick={() => navigate('/profile/offers/disabled')} key={'/profile/offers/disabled'}>disabled</Menu.Item>*/}
                    </Menu.SubMenu>
                    <Menu.Item onClick={() => navigate('/profile/favorites')} key={'/profile/favorites'}>favorites</Menu.Item>
                    <Menu.Item onClick={() => navigate('/profile/settings')} key={'/profile/settings'}>settings</Menu.Item>
                    {currentUser && currentUser.role.name_en === 'admin' && (
                        <React.Fragment>
                            <Menu.Item onClick={() => navigate('/profile/complaints')} key={'/profile/complaints'}>complaints</Menu.Item>
                            <Menu.Item onClick={() => navigate('/profile/users')} key={'/profile/users'}>users</Menu.Item>
                        </React.Fragment>
                    )}
                    <Menu.Item onClick={handleLogout}>log out</Menu.Item>
                </Menu>
            </Sider>
            <Layout style={{padding: '30px'}}>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: 0,
                        minHeight: 280,
                        backgroundColor: '#fff',
                        overflow: 'scroll'
                    }}
                >
                    <Routes>
                        <Route path={'settings'} element={<Settings/>}/>
                        <Route path={'complaints'} element={<Complaints/>}/>
                        <Route path={'users'} element={<Users/>}/>
                        <Route path={'favorites'} element={<FavoriteOffers/>}/>
                        <Route path={'offers/active'} element={<ActiveOffers/>}/>
                        <Route path={'offers/moderation'} element={<ModerationOffers/>}/>
                        <Route path={'offers/disabled'} element={<DisabledOffers/>}/>
                        <Route path={'offers/rejected'} element={<RejectedOffers/>}/>
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Profile;