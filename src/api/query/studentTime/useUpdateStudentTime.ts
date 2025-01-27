import {useMutation, useQueryClient} from '@tanstack/react-query';
import axios from '../../axios';
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { IStudentTimeForm } from '../../../types/studentTime';

export const updateTime = async (data: IStudentTimeForm) => {
    try {
        const response: AxiosResponse = await axios.patch(`/student-time/${data._id}`, data);

        if (response.status === 200) {
            toast.success('Час оновлено');
            return response.data;
        } else {
            toast.error(response.data.message)
        }
    } catch(error: any) {
        console.log(error);
        toast.error(error.response.data.message);
    }
}

const useUpdateStudentTime = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationKey: ['studentTime update'],
        mutationFn: updateTime,
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['teachers']});
            queryClient.invalidateQueries({queryKey: ['student', data.student]});
        }
    })

    return mutation;
}

export default useUpdateStudentTime;