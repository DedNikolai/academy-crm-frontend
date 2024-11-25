import {useMutation, useQueryClient} from '@tanstack/react-query';
import { ITeacher, IWorktime } from '../../../types/teacher';
import axios from '../../axios';
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

export const createWorkTime = async (data: IWorktime) => {
    try {
        const response: AxiosResponse = await axios.post(`/worktime`, data);

        if (response.status === 200) {
            toast.success('Робочий час створено');
            return response.data;
        } else {
            toast.error(response.data.message)
        }
    } catch(error) {
        console.log(error);
        toast.error('Помилка при створенні робочого часу');
    }
}

const useCreateWorktime = (func: Function) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationKey: ['user update'],
        mutationFn: createWorkTime,
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['teachers']});
            queryClient.invalidateQueries({queryKey: ['teacher', data.teacher]});
            func();
        }
    })

    return mutation;
}

export default useCreateWorktime;