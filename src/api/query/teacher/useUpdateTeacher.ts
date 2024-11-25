import {useMutation, useQueryClient} from '@tanstack/react-query';
import { ITeacher } from '../../../types/teacher';
import axios from '../../axios';
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

export const updateTeacher = async (data: ITeacher) => {
    try {
        const response: AxiosResponse = await axios.patch(`/teacher/${data._id}`, data);

        if (response.status === 200) {
            toast.success('Дані оновлено');
            return response.data;
        } else {
            toast.error(response.data.message)
        }
    } catch(error) {
        console.log(error);
        toast.error('Помилка при оновлені даних');
    }
}

const useUpdateTeacher = (id?: string) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationKey: ['user update'],
        mutationFn: updateTeacher,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['teachers']});
            queryClient.invalidateQueries({queryKey: ['teacher', id]})
        }
    })

    return mutation;
}

export default useUpdateTeacher;