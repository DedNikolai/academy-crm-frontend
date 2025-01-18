import {useMutation, useQueryClient} from '@tanstack/react-query';
import { IWorktime } from '../../../types/teacher';
import axios from '../../axios';
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { IPayment } from '../../../types/payment';

export const updateAccount= async (data: IPayment) => {
    try {
        const response: AxiosResponse = await axios.patch(`/payaccount/${data._id}`, data);

        if (response.status === 200) {
            toast.success('Акаунт оновлено');
            return response.data;
        } else {
            toast.error(response.data.message)
        }
    } catch(error) {
        console.log(error);
        toast.error('Помилка при оновлені акаунта');
    }
}

const useUpdatePayAccount = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationKey: ['payaccount update'],
        mutationFn: updateAccount,
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['payaccounts']});
        }
    })

    return mutation;
}

export default useUpdatePayAccount;