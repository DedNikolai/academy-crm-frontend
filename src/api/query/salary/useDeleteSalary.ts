import {useMutation, useQueryClient} from '@tanstack/react-query';
import axios from '../../axios';
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

export const deleteSalary = async (id: string) => {
    try {
        const response: AxiosResponse = await axios.delete(`/salary/${id}`);

        if (response.status === 200) {
            toast.success('Зарпоату видалено');
            return response.data;
        } else {
            toast.error(response.data.message)
        }
    } catch(error) {
        console.log(error);
        toast.error('Помилка при видаленні зарплати');
    }
}

const useDeleteSalary= () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationKey: ['worktime update'],
        mutationFn: deleteSalary,
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['payaccounts']});
            queryClient.invalidateQueries({queryKey: ['salaries']});
        }
    })

    return mutation;
}

export default useDeleteSalary;