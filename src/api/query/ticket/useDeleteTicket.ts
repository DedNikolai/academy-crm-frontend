import {useMutation, useQueryClient} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import axios from '../../axios';

const deleteTicket = async (id: string) => {
    try {
        const response: AxiosResponse = await axios.delete(`/ticket/${id}`);

        if (response.status === 200) {
            toast.success('Абонемент видалено')
            return true
        } else {
            toast.error(response.data.message);
            return false;
        }

    } catch(error) {
        console.log(error);
        toast.error('Не вдалося видалити абонемент')
    }
};


const useDeleteTicket = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationKey: ['abonement delete'],
        mutationFn: deleteTicket,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['tickets']})
        }
    })

    return mutation;
}

export default useDeleteTicket;