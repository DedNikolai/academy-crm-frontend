import { FC, useContext } from "react";
import { AuthContext } from "../components/AuthProvider";
import Loader from "../components/Loader";
import { Roles } from "../types/roles";
import {Navigate} from 'react-router-dom';

interface IProtectedRouteProps {
    children: JSX.Element;
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({children}) => {
    const authContext = useContext(AuthContext);
    const isAllow = authContext?.user?.roles.some(role => {
        return role === Roles.ADMIN || role === Roles.OWNER
    })

    if (authContext?.isUserLoading) return <Loader /> 

    return (
        isAllow ? children : <Navigate to='/' />
    )
}

export default ProtectedRoute;