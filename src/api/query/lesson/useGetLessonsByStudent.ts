import { useQuery } from "@tanstack/react-query"
import axios from '../../axios';
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Dayjs } from "dayjs";

const fetchLessons = async (page: number, size: number, studentId: string) => {
    try {
        const response: AxiosResponse = await axios.get(`/lesson/student/${studentId}?page=${page}&limit=${size}`);
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

const useGetLessonsByStudent = (page: number = 0, size: number = 10, studentId: string) => {
    const {data, isFetching, isLoading, isFetched} = useQuery({
        queryKey: ['lessons', studentId],
        queryFn: () => fetchLessons(page, size, studentId),
        
    })

    return {data, isFetching, isLoading, isFetched}
};

export default useGetLessonsByStudent;