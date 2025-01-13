import {useMutation, useQueryClient} from '@tanstack/react-query';
import { IWorktime } from '../../../types/teacher';
import axios from '../../axios';
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { ILesson} from '../../../types/lesson';

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

const useUpdateLessonStatus = (updateStatus: Function, updatePayout: Function) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationKey: ['lesson update status'],
        mutationFn: updateLesson,
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['lessons']});
            queryClient.invalidateQueries({queryKey: ['lessons', 'ticket',  data.ticket]});
            queryClient.invalidateQueries({queryKey: ['ticket',  data.ticket]});
            queryClient.invalidateQueries({queryKey: ['lessons', data.student]});
            updateStatus(data.status);
            updatePayout(data.payout);
        },

    })

    return mutation;
}

export default useUpdateLessonStatus;