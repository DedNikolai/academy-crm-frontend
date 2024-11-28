import { useQuery } from "@tanstack/react-query"
import axios from '../../axios';
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

const fetchStudentById = async (id?: string) => {
    try {
        const response: AxiosResponse = await axios.get(`/student/${id}`);
        
        if (response.status === 200) {
            return response.data;
        } else {
            toast.error(response.data.messge)
            return null
        }
    } catch(error) {
        console.log(error);
        toast.error('Cant get student with this id')
    }
}

const useStudent = (studentId?: string) => {
    const {data, isFetching, isLoading, isFetched} = useQuery({
        queryKey: ['student', studentId],
        queryFn: () => fetchStudentById(studentId),
        
    })

    return {data, isFetching, isLoading, isFetched}
};

export default useStudent;