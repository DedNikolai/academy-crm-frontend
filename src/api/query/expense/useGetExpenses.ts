import { useQuery } from "@tanstack/react-query"
import axios from '../../axios';
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Dayjs } from "dayjs";

const fetchExpenses = async (page: number, size: number) => {

    try {
        const response: AxiosResponse = await axios.get(`/expense?page=${page}&limit=${size}`);
        if (response.status === 200) {
            return response.data;
        } else {
            toast.error('Cant get Expenses')
            return []
        }
    } catch(error: any) {
        console.log(error);
        toast.error(error.response.data.message);
    }
}

const useGetExpenses = (page: number = 0, size: number = 10) => {
    const {data, isFetching, isLoading, isFetched} = useQuery({
        queryKey: ['expenses', page, size],
        queryFn: () => fetchExpenses(page, size),
        
    })

    return {data, isFetching, isLoading, isFetched}
};

export default useGetExpenses;