import { useQuery } from "@tanstack/react-query"
import axios from '../../axios';
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

const fetchTeacherById = async (id?: string) => {
    try {
        const response: AxiosResponse = await axios.get(`/teacher/${id}`);
        
        if (response.status === 200) {
            return response.data;
        } else {
            toast.error(response.data.messge)
            return null
        }
    } catch(error) {
        console.log(error);
        toast.error('Cant get teacher with this id')
    }
}

const useTeacher = (teacherId?: string) => {
    const {data, isFetching, isLoading, isFetched} = useQuery({
        queryKey: ['teacher', teacherId],
        queryFn: () => fetchTeacherById(teacherId),
        
    })

    return {data, isFetching, isLoading, isFetched}
};

export default useTeacher;