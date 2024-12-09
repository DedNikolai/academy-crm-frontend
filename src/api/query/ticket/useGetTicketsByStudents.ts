import { useQuery } from "@tanstack/react-query"
import axios from '../../axios';
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

const fetchTicketsByStudent = async (studentId: string, page: number, size: number) => {
    try {
        const response: AxiosResponse = await axios.get(`/ticket/student/${studentId}?page=${page}&limit=${size}`);
        if (response.status === 200) {
            return response.data;
        } else {
            toast.error('Cant get tickets')
            return []
        }
    } catch(error) {
        console.log(error);
        toast.error('Cant get tickets')
        return []
    }
}

const useGetTicketsByStudent = (studentId: string = '', page: number = 0, size: number = 10) => {
    const {data = [], isFetching, isLoading, isFetched} = useQuery({
        queryKey: ['students', studentId, page, size],
        queryFn: () => fetchTicketsByStudent(studentId, page, size,),
        
    })

    return {data, isFetching, isLoading, isFetched}
};

export default useGetTicketsByStudent;