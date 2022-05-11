import React from 'react';
import {Layout, Menu} from 'antd';
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Settings from "./Settings/Settings";
import ActiveOffers from "./ActiveOffers/ActiveOffers";
import ModerationOffers from "./ModerationOffers/ModerationOffers";
import DisabledOffers from "./DisabledOffers/DisabledOffers";
import RejectedOffers from "./RejectedOffers/RejectedOffers";
import FavoriteOffers from "./FavoriteOffers/FavoriteOffers";

const {Content, Sider} = Layout;

const Profile = () => {
    const location = useLocation();
    const navigate = useNavigate();

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
                        <Menu.Item onClick={() => navigate('/profile/offers/disabled')} key={'/profile/offers/disabled'}>disabled</Menu.Item>
                    </Menu.SubMenu>
                    <Menu.Item onClick={() => navigate('/profile/favorites')} key={'/profile/favorites'}>favorites</Menu.Item>
                    <Menu.Item onClick={() => navigate('/profile/settings')} key={'/profile/settings'}>settings</Menu.Item>
                    <Menu.Item>log out</Menu.Item>
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