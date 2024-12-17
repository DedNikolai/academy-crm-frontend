import {useMutation, useQueryClient} from '@tanstack/react-query';
import { IWorktime } from '../../../types/teacher';
import axios from '../../axios';
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { ILesson, ILessonFromServer, ILessonStatus } from '../../../types/lesson';

export const updateLesson = async (data: ILesson) => {
    try {
        const response: AxiosResponse = await axios.patch(`/lesson/${data._id}`, data);

        if (response.status === 200) {
            toast.success('Урок оновлено');
            return response.data;
        } else {
            toast.error(response.data.message)
        }
    } catch(error: any) {
        console.log(error);
        toast.error(error.response.data.message);
    }
}

const useUpdateLessonStatus = (func: Function) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationKey: ['lesson update status'],
        mutationFn: updateLesson,
        onSuccess: (data) => {
            console.log(data.ticket)
            queryClient.invalidateQueries({queryKey: ['lessons']});
            queryClient.invalidateQueries({queryKey: ['lessons', 'ticket',  data.ticket]});
            queryClient.invalidateQueries({queryKey: ['ticket',  data.ticket]});
            func(data.status)
        },

    })

    return mutation;
}

export default useUpdateLessonStatus;