import {useMutation, useQueryClient} from '@tanstack/react-query';
import axios from '../../axios';
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { IStudentTimeForm } from '../../../types/studentTime';

export const createTime = async (data: IStudentTimeForm) => {
    try {
        const response: AxiosResponse = await axios.post(`/student-time`, data);

        if (response.status === 200) {
            toast.success('Час створено');
            return response.data;
        } else {
            toast.error(response.data.message)
        }
    } catch(error: any) {
        console.log(error);
        toast.error(error.response.data.message)

    }
}

const useCreateStudentTime = (func: Function) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationKey: ['studentTime create'],
        mutationFn: createTime,
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['teachers']});
            queryClient.invalidateQueries({queryKey: ['student', data.student]});
            func();
        }
    })

    return mutation;
}

export default useCreateStudentTime;