import { useQueryClient, useMutation } from "@tanstack/react-query"
import axios from "../../axios";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { ILesson } from "../../../types/lesson";

const createLesson = async (data: ILesson) => {
    try {
        const response: AxiosResponse = await axios.post('/lesson', data);

        if (response.status === 200) {
            toast.success('Урок створено')
            return response.data;
        } else {
            toast.error(response.data.message);
            return false;

        }

    } catch(error: any) {
        console.log(error);
        toast.error(error.response.data.message)
    }
}

const useCreateLesson= (func: Function) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationKey: ['lesson create'],
        mutationFn: createLesson,
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['lessons']});
            queryClient.invalidateQueries({queryKey: ['lessons', 'ticket', data.ticket._id]});
            func();
        }
    })

    return mutation;
}

export default useCreateLesson;