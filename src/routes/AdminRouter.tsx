
import { FC } from "react";
import {Routes, Route, Navigate} from 'react-router-dom';
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/DashboardPages/Home";
import Teachers from "../pages/DashboardPages/Teachers";
import Students from "../pages/DashboardPages/Students";



const AdminRouter: FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/students" element={<Students />} /> 
        </Routes>
    )
}

export default AdminRouter;