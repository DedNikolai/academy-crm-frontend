import { useQuery } from "@tanstack/react-query"
import axios from '../../axios';
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

const fetchStudentsByTeacher = async (teacherId: string, page: number, size: number) => {
    try {
        const response: AxiosResponse = await axios.get(`/student/teacher/${teacherId}?page=${page}&limit=${size}`);
        if (response.status === 200) {
            return response.data;
        } else {
            toast.error('Cant get students')
            return []
        }
    } catch(error) {
        console.log(error);
        toast.error('Cant get teachers')
    }
}

const useGetTeacherStudents = (teacherId: string = '', page: number = 0, size: number = 10) => {
    const {data = [], isFetching, isLoading, isFetched} = useQuery({
        queryKey: ['students', teacherId, page, size],
        queryFn: () => fetchStudentsByTeacher(teacherId, page, size,),
        
    })

    return {data, isFetching, isLoading, isFetched}
};

export default useGetTeacherStudents;