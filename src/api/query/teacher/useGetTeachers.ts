import { useQuery } from "@tanstack/react-query"
import axios from '../../axios';
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

const fetchTeachers = async () => {
    try {
        const response: AxiosResponse = await axios.get(`/teacher`);
        if (response.status === 200) {
            return response.data;
        } else {
            return []
        }
    } catch(error) {
        console.log(error);
        toast.error('Cant get teachers')
    }
}

const useTeachers = () => {
    const {data = [], isFetching, isLoading} = useQuery({
        queryKey: ['teachers'],
        queryFn: fetchTeachers,
        
    })

    return {data, isFetching, isLoading}
};

export default useTeachers;