import { useQuery } from "@tanstack/react-query"
import axios from '../../axios';
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

const fetchTickets = async (page: number, size: number) => {
    try {
        const response: AxiosResponse = await axios.get(`/ticket?&page=${page}&limit=${size}`);
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

const useGetTickets = (page: number = 0, size: number = 10) => {
    const {data, isFetching, isLoading, isFetched} = useQuery({
        queryKey: ['tickets', page, size],
        queryFn: () => fetchTickets(page, size),
        
    })

    return {data, isFetching, isLoading, isFetched}
};

export default useGetTickets;