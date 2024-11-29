import {useMutation, useQueryClient} from '@tanstack/react-query';
import { ITeacher } from '../../../types/teacher';
import axios from '../../axios';
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { IFormStudent, IStudent } from '../../../types/student';

export const updateStudent = async (data: IFormStudent) => {

    try {
        const response: AxiosResponse = await axios.patch(`/student/${data._id}`, data);

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

const useUpdateStudent = (id?: string) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationKey: ['student update'],
        mutationFn: updateStudent,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['students']});
            queryClient.invalidateQueries({queryKey: ['student', id]})
        }
    })

    return mutation;
}

export default useUpdateStudent;