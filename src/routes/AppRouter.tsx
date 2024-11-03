import { FC } from "react";
import {Routes, Route} from 'react-router-dom';
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";


const AppRouter: FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />  
        </Routes>
    )
}

export default AppRouter;