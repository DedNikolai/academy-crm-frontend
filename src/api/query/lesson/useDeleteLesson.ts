import {useMutation, useQueryClient} from '@tanstack/react-query';
import axios from '../../axios';
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

export const deleteLesson = async (id: string) => {
    try {
        const response: AxiosResponse = await axios.delete(`/lesson/${id}`);

        if (response.status === 200) {
            toast.success('Урок видалено');
            return response.data;
        } else {
            toast.error(response.data.message)
        }
    } catch(error) {
        console.log(error);
        toast.error('Помилка при видаленні уроку');
    }
}

const useDeleteLesson = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationKey: ['worktime update'],
        mutationFn: deleteLesson,
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['lessons']});
            queryClient.invalidateQueries({queryKey: ['lessons', 'ticket',  data.ticket._id]});
        }
    })

    return mutation;
}

export default useDeleteLesson;