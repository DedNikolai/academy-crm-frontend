import {useMutation, useQueryClient} from '@tanstack/react-query';
import axios from '../../axios';
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

export const deleteExpense= async (id: string) => {
    try {
        const response: AxiosResponse = await axios.delete(`/expense/${id}`);

        if (response.status === 200) {
            toast.success('Витрату видалено');
            return response.data;
        } else {
            toast.error(response.data.message)
        }
    } catch(error) {
        console.log(error);
        toast.error('Помилка при видаленні витрати');
    }
}

const useDeleteExpense = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationKey: ['expense delete'],
        mutationFn: deleteExpense,
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['payaccounts']});
            queryClient.invalidateQueries({queryKey: ['expenses']});
        }
    })

    return mutation;
}

export default useDeleteExpense;