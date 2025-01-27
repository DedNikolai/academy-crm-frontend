import { useQuery } from "@tanstack/react-query"
import axios from '../../axios';
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Dayjs } from "dayjs";

const fetchStudentTimes = async (teacherId: string) => {
    try {
        const response: AxiosResponse = await axios.get(`/student-time/teacher/${teacherId}`);
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

const useGetTieacherTimes = (teacherId: string) => {
    const {data, isFetching, isLoading, isFetched} = useQuery({
        queryKey: ['studentTimes', teacherId],
        queryFn: () => fetchStudentTimes(teacherId),
        
    })

    return {data, isFetching, isLoading, isFetched}
};

export default useGetTieacherTimes;