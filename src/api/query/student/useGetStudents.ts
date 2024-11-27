import { useQuery } from "@tanstack/react-query"
import axios from '../../axios';
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

const fetchStudents = async (page: number, size: number, paramas: string) => {
    try {
        const response: AxiosResponse = await axios.get(`/student?params=${paramas}&page=${page}&limit=${size}`);
        if (response.status === 200) {
            return response.data;
        } else {
            toast.error('Cant get students')
            return []
        }
    } catch(error) {
        console.log(error);
        toast.error('Cant get teachers')
    }
}

const useGetStudents = (page: number = 0, size: number = 10, params: string = '') => {
    const {data, isFetching, isLoading, isFetched} = useQuery({
        queryKey: ['students', page, size, params],
        queryFn: () => fetchStudents(page, size, params),
        
    })

    return {data, isFetching, isLoading, isFetched}
};

export default useGetStudents;