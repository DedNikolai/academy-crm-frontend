import {useMutation, useQueryClient} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import axios from '../../axios';

const deleteStudent = async (id: string) => {
    try {
        const response: AxiosResponse = await axios.delete(`/student/${id}`);

        if (response.status === 200) {
            toast.success('Учня видалено')
            return true
        } else {
            toast.error(response.data.message);
            return false;
        }

    } catch(error: any) {
        console.log(error);
        toast.error(error.response.data.message)
    }
};


const useDeleteStudent = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationKey: ['student delete'],
        mutationFn: deleteStudent,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['students']})
        }
    })

    return mutation;
}

export default useDeleteStudent;