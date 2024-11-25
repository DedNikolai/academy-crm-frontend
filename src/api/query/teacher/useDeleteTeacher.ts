import {useMutation, useQueryClient} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import axios from '../../axios';

const deleteTeacher = async (id: string) => {
    try {
        const response: AxiosResponse = await axios.delete(`/teacher/${id}`);

        if (response.status === 200) {
            toast.success('Вчителя видалено')
            return true
        } else {
            toast.error(response.data.message);
            return false;
        }

    } catch(error) {
        console.log(error);
        toast.error('Не вдалося видалити вчителя')
    }
};


const useDeleteTeacher = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationKey: ['teacher delete'],
        mutationFn: deleteTeacher,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['teachers']})
        }
    })

    return mutation;
}

export default useDeleteTeacher;