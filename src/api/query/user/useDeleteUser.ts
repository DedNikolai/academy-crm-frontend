import {useMutation, useQueryClient} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import axios from '../../axios';

const deleteUser = async (id: string) => {
    try {
        const response: AxiosResponse = await axios.delete(`/auth/user/${id}`);

        if (response.status === 200) {
            toast.success('Адміністратора видалено')
            return true
        } else {
            toast.error(response.data.message);
            return false;
        }

    } catch(error) {
        console.log(error);
        toast.error('Не вдалося видалити адміністратора')
    }
};


const useDeleteUser = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationKey: ['user delete'],
        mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['users']})
        }
    })

    return mutation;
}

export default useDeleteUser;