
import { FC } from "react";
import {Routes, Route} from 'react-router-dom';
import Home from "../pages/DashboardPages/Home";
import Teachers from "../pages/DashboardPages/Teachers";
import Students from "../pages/DashboardPages/Students";
import Admins from "../pages/DashboardPages/Admins";
import Profile from "../pages/DashboardPages/Profile";



const AdminRouter: FC = () => {
    return (
        <Routes>
            <Route path="/main" element={<Home />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/students" element={<Students />} />
            <Route path="/admins" element={<Admins />} /> 
            <Route path="/profile" element={<Profile />} /> 
        </Routes>
    )
}

export default AdminRouter;