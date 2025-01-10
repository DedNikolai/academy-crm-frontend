import { useQuery } from "@tanstack/react-query"
import axios from '../../axios';
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

const fetchTickets = async () => {
    try {
        const response: AxiosResponse = await axios.get(`/ticket/stats/subject`);
        if (response.status === 200) {
            return response.data;
        } else {
            toast.error('Cant get tickets')
            return []
        }
    } catch(error: any) {
        console.log(error);
        toast.error('Cant get tickets')
    }
}

const useGetTicketsStats = () => {
    const {data, isFetching, isLoading, isFetched} = useQuery({
        queryKey: ['tickets stats'],
        queryFn: () => fetchTickets(),
        
    })

    return {data, isFetching, isLoading, isFetched}
};

export default useGetTicketsStats;