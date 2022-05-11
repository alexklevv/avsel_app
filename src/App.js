import {Routes, Route} from 'react-router-dom';
import './App.css';
import Home from "./views/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import {Layout} from "antd";
import Cars from "./views/Cars/Cars";
import Offer from "./views/Offer/Offer";
import Profile from "./views/Profile/Profile";
import Login from "./views/Login/Login";
import Registration from "./views/Registration/Registration";
import CreateOffer from "./views/CreateOffer/CreateOffer";
import {useEffect} from "react";
import axios from "axios";

const { Content } = Layout;

function App() {
    useEffect(() => {
        // axios.post('https://cloud.eyedea.cz/api/v2/cardetect.json?', {});

    }, [])
    return (
        <Layout>
            <NavBar/>
            <Content>
                <Routes>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'/cars'} element={<Cars/>}/>
                    <Route path={'/cars/add'} element={<CreateOffer/>}/>
                    <Route path={'/cars/:offerId'} element={<Offer/>}/>
                    <Route path={'/profile/*'} element={<Profile/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/registration'} element={<Registration/>}/>
                </Routes>
            </Content>
        </Layout>
    );
}

export default App;
