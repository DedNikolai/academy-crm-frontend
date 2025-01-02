import { useQuery } from "@tanstack/react-query"
import axios from '../../axios';
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Dayjs } from "dayjs";

const fetchLessons = async (date?: Dayjs | null) => {
    const currentDate = date?.toDate();
    try {
        const response: AxiosResponse = await axios.get(`/lesson/week/${currentDate}`);
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

const useGetWeekLessons = (date?: Dayjs | null) => {
    const {data, isFetching, isLoading, isFetched} = useQuery({
        queryKey: ['lessons', 'week', date],
        queryFn: () => fetchLessons(date),
        
    })

    return {data, isFetching, isLoading, isFetched}
};

export default useGetWeekLessons;