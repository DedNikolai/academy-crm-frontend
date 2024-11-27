import { FC } from "react";
import {Routes, Route, Navigate} from 'react-router-dom';
import Home from "../pages/DashboardPages/Home";
import Teachers from "../pages/DashboardPages/Teacher/Teachers";
import Students from "../pages/DashboardPages/Student/Students";
import Admins from "../pages/DashboardPages/Admins";
import Profile from "../pages/DashboardPages/Profile";
import CreateUser from "../pages/DashboardPages/CreateUser";
import EditUser from "../pages/DashboardPages/EditUser";
import NotFound from "../pages/NotFound";
import TimeTable from "../pages/DashboardPages/TimeTable";
import Journal from "../pages/DashboardPages/Journal";
import Lessons from "../pages/DashboardPages/Lessons";
import Abonements from "../pages/DashboardPages/Abonements";
import TeacherPage from "../pages/DashboardPages/Teacher/TeacherPage";
import CreateTeacher from "../pages/DashboardPages/Teacher/CreateTeacher";

const AdminRouter: FC = () => {
    return (
        <Routes>
            <Route path="/main" element={<Home />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/teachers/create" element={<CreateTeacher />} />
            <Route path="/teachers/edit/:id" element={<TeacherPage />} />
            <Route path="/students" element={<Students />} />
            <Route path="/admins" element={<Admins />} />
            <Route path="/admins/create" element={<CreateUser />} /> 
            <Route path="/admins/edit/:id" element={<EditUser />} /> 
            <Route path="/profile" element={<Profile />} /> 
            <Route path="/timetable" element={<TimeTable />} /> 
            <Route path="/journal" element={<Journal />} /> 
            <Route path="/lessons" element={<Lessons />} /> 
            <Route path="/abonements" element={<Abonements />} /> 
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />     
        </Routes>
    )
}

export default AdminRouter;