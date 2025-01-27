import {useMutation, useQueryClient} from '@tanstack/react-query';
import axios from '../../axios';
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

export const deleteWorktime = async (id: string) => {
    try {
        const response: AxiosResponse = await axios.delete(`/worktime/${id}`);

        if (response.status === 200) {
            toast.success('Робочий час видалено');
            return response.data;
        } else {
            toast.error(response.data.message)
        }
    } catch(error) {
        console.log(error);
        toast.error('Помилка при видаленні робочого часу');
    }
}

const useDeleteWorktime = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationKey: ['worktime update'],
        mutationFn: deleteWorktime,
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['teachers']});
            queryClient.invalidateQueries({queryKey: ['teacher', data.teacher]});
        }
    })

    return mutation;
}

export default useDeleteWorktime;