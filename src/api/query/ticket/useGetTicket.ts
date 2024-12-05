import { useQuery } from "@tanstack/react-query"
import axios from '../../axios';
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

const fetchTicketById = async (id?: string) => {
    try {
        const response: AxiosResponse = await axios.get(`/ticket/${id}`);
        
        if (response.status === 200) {
            return response.data;
        } else {
            toast.error(response.data.messge)
            return null
        }
    } catch(error) {
        console.log(error);
        toast.error('Cant get ticket with this id')
    }
}

const useTicket = (ticketId?: string) => {
    const {data, isFetching, isLoading, isFetched} = useQuery({
        queryKey: ['ticket', ticketId],
        queryFn: () => fetchTicketById(ticketId),
        
    })

    return {data, isFetching, isLoading, isFetched}
};

export default useTicket;