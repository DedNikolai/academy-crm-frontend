import { useQuery } from "@tanstack/react-query"
import axios from '../../axios';
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

const fetchStudents = async () => {
    try {
        const response: AxiosResponse = await axios.get(`/student/stats/all`);
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

const useGetAllStudents = () => {
    const {data, isFetching, isLoading, isFetched} = useQuery({
        queryKey: ['students all'],
        queryFn: () => fetchStudents(),
        
    })

    return {data, isFetching, isLoading, isFetched}
};

export default useGetAllStudents;