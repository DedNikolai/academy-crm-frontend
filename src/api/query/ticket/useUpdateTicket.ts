import {useMutation, useQueryClient} from '@tanstack/react-query';
import axios from '../../axios';
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { ITicket } from '../../../types/ticket';

export const updateTicket = async (data: ITicket) => {

    try {
        const response: AxiosResponse = await axios.patch(`/ticket/${data._id}`, data);

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

const useUpdateTicket = (id?: string) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationKey: ['ticket update'],
        mutationFn: updateTicket,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['tickets']});
            queryClient.invalidateQueries({queryKey: ['ticket', id]})
        }
    })

    return mutation;
}

export default useUpdateTicket;