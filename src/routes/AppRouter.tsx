import { FC } from "react";
import {Routes, Route, Navigate} from 'react-router-dom';
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ForgotPassword from "../pages/ForgotPassword";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import ResetPassword from "../pages/ResetPassword";
import VerifyEmail from "../pages/VerifyEmail";

const AppRouter: FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard/*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> 
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-pass/:id" element={<ResetPassword />} />
            <Route path="/auth/verify/:id" element={<VerifyEmail />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />     
        </Routes>
    )
}

export default AppRouter;