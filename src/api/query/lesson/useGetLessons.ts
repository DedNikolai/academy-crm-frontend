import { useQuery } from "@tanstack/react-query"
import axios from '../../axios';
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Dayjs } from "dayjs";

const fetchLessons = async (page: number, size: number, date?: Dayjs | null) => {
    const currentDate = date ? date?.toDate() : '';
    try {
        const response: AxiosResponse = await axios.get(`/lesson?date=${currentDate}&page=${page}&limit=${size}`);
        if (response.status === 200) {
            return response.data;
        } else {
            toast.error('Cant get Lessons')
            return []
        }
    } catch(error: any) {
        console.log(error);
        toast.error(error.response.data.message);
    }
}

const useGetLessons = (page: number = 0, size: number = 10, date?: Dayjs | null) => {
    const {data, isFetching, isLoading, isFetched} = useQuery({
        queryKey: ['lessons', page, size, date],
        queryFn: () => fetchLessons(page, size, date),
        
    })

    return {data, isFetching, isLoading, isFetched}
};

export default useGetLessons;