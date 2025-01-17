import {useMutation, useQueryClient} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import axios from '../../axios';

const deleteTicket = async (id: string) => {
    try {
        const response: AxiosResponse = await axios.delete(`/ticket/${id}`);

        if (response.status === 200) {
            toast.success('Абонемент видалено')
            return response.data
        } else {
            toast.error(response.data.message);
            return false;
        }

    } catch(error: any) {
        console.log(error);
        toast.error(error.response.data.message)
    }
};


const useDeleteTicket = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationKey: ['abonement delete'],
        mutationFn: deleteTicket,
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['tickets']});
            queryClient.invalidateQueries({queryKey: ['tickets', 'students' , data.student, 0, 10]})
        }
    })

    return mutation;
}

export default useDeleteTicket;