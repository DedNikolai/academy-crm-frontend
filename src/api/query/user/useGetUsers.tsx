import { useQuery } from "@tanstack/react-query"
import axios from '../../axios';
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Roles } from "../../../types/roles";

const fetchUsers = async () => {
    try {
        const response: AxiosResponse = await axios.get(`/auth/users?role=${Roles.ADMIN}`);
        if (response.status === 200) {
            return response.data;
        } else {
            return []
        }
    } catch(error) {
        console.log(error);
        toast.error('Cant get users')
    }
}

const useUsers = () => {
    const {data = [], isFetching, isLoading} = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
        
    })

    return {data, isFetching, isLoading}
};

export default useUsers;