import {useMutation, useQueryClient} from '@tanstack/react-query';
import { IWorktime } from '../../../types/teacher';
import axios from '../../axios';
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

export const updateWorktime = async (data: IWorktime) => {
    try {
        const response: AxiosResponse = await axios.patch(`/worktime/${data._id}`, data);

        if (response.status === 200) {
            toast.success('Робочий час оновлено');
            return response.data;
        } else {
            toast.error(response.data.message)
        }
    } catch(error) {
        console.log(error);
        toast.error('Помилка при оновлені робочого часу');
    }
}

const useUpdateWorktime = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationKey: ['worktime update'],
        mutationFn: updateWorktime,
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['teachers']});
            queryClient.invalidateQueries({queryKey: ['teacher', data.teacher]});
        }
    })

    return mutation;
}

export default useUpdateWorktime;