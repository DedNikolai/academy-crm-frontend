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
import Shedule from "../pages/DashboardPages/Shedule/Shedule";
import Journal from "../pages/DashboardPages/Jornals/Journal";
import Tickets from "../pages/DashboardPages/Tickets/Tickets";
import TeacherPage from "../pages/DashboardPages/Teacher/TeacherPage";
import CreateTeacher from "../pages/DashboardPages/Teacher/CreateTeacher";
import StudentPage from "../pages/DashboardPages/Student/StudentPage";
import CreateStudent from "../pages/DashboardPages/Student/CreateStudent";
import Archive from "../pages/DashboardPages/Student/Archive";
import TicketPage from "../pages/DashboardPages/Tickets/TicketPage";
import Lessons from "../pages/DashboardPages/Lessons/Lessons";
import Salary from "../pages/DashboardPages/Salary/Salaries";
import CreateSalary from "../pages/DashboardPages/Salary/CreateSalary";
import Expenses from "../pages/DashboardPages/Expenses/Expenses";
import CreateExpense from "../pages/DashboardPages/Expenses/CreateExpense";

const AdminRouter: FC = () => {
    return (
        <Routes>
            <Route path="/main" element={<Home />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/teachers/create" element={<CreateTeacher />} />
            <Route path="/teachers/edit/:id" element={<TeacherPage />} />
            <Route path="/students" element={<Students />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/students/create" element={<CreateStudent />} />
            <Route path="/students/edit/:id" element={<StudentPage />} />
            <Route path="/admins" element={<Admins />} />
            <Route path="/admins/create" element={<CreateUser />} /> 
            <Route path="/admins/edit/:id" element={<EditUser />} /> 
            <Route path="/profile" element={<Profile />} /> 
            <Route path="/timetable" element={<Shedule />} /> 
            <Route path="/journal" element={<Journal />} /> 
            <Route path="/lessons" element={<Lessons />} /> 
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/tickets/edit/:id" element={<TicketPage />} />
            <Route path="/abonements" element={<Tickets />} /> 
            <Route path="/salary" element={<Salary />} /> 
            <Route path="/salary/create" element={<CreateSalary />} />  
            <Route path="/expense" element={<Expenses />} /> 
            <Route path="/expense/create" element={<CreateExpense />} />  
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />     
        </Routes>
    )
}

export default AdminRouter;