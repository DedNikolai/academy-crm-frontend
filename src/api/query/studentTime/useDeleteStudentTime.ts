import {useMutation, useQueryClient} from '@tanstack/react-query';
import axios from '../../axios';
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

export const deleteTime= async (id: string) => {
    try {
        const response: AxiosResponse = await axios.delete(`/student-time/${id}`);

        if (response.status === 200) {
            toast.success('Час видалено');
            return response.data;
        } else {
            toast.error(response.data.message)
        }
    } catch(error: any) {
        console.log(error);
        toast.error(error.response.data.message);
    }
}

const useDeleteStudentTime = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationKey: ['studentTime delete'],
        mutationFn: deleteTime,
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['teachers']});
            queryClient.invalidateQueries({queryKey: ['student', data.student]});
        }
    })

    return mutation;
}

export default useDeleteStudentTime;