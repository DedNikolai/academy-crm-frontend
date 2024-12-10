import { useQuery } from "@tanstack/react-query"
import axios from '../../axios';
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

const fetchLessonsByTicket = async (ticketId: string) => {
    try {
        const response: AxiosResponse = await axios.get(`/lesson/ticket/${ticketId}`);
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

const useGetLessonsByTicket = (ticketId: string) => {
    const {data = [], isFetching, isLoading, isFetched} = useQuery({
        queryKey: ['lessons', 'ticket',  ticketId],
        queryFn: () => fetchLessonsByTicket(ticketId),
        
    })

    return {data, isFetching, isLoading, isFetched}
};

export default useGetLessonsByTicket;