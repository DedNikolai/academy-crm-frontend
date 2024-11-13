import { useQuery } from "@tanstack/react-query";
import axios from '../../axios';
import { toast } from "react-toastify";

const fetchUser = async (id?: string) => {
    try {
        const response = await axios.get(`/auth/users/${id}`);
        if (response.status === 200) {
            return response.data;
        } else {
            toast.error(response.data.message);
            return null;
        }
    } catch(error) {
        console.log(error);
        toast.error('Cant get User')
    }
};


const useGetUser = (userId?: string) => {
    const {data, isLoading, isFetching, isFetched} = useQuery({
        queryKey: ['user', userId],
        queryFn: () => fetchUser(userId)
    });

    return {data, isLoading, isFetching, isFetched} 
}

export default useGetUser;