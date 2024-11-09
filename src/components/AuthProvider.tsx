import {createContext, FC, useState} from 'react';
import { IUser } from '../types/user';

export interface IAuthContextUserState {
    user: IUser | null;
    setUser: Function;
}

export interface IAuthContextLoaderState {
    isUserLoading: boolean;
    setIsUserLoading: Function;
}


interface IAuthProviderProps {
    children: React.ReactNode;
}

export const AuthContext = createContext<IAuthContextUserState & IAuthContextLoaderState | null>(null)

const AuthProvider: FC<IAuthProviderProps> = ({children}) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [isUserLoading, setIsUserLoading] = useState<boolean>(true)
    return (
        <AuthContext.Provider value={{user, setUser, isUserLoading, setIsUserLoading}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider