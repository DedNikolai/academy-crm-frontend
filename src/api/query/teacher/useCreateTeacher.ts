import { useQueryClient, useMutation } from "@tanstack/react-query"
import axios from "../../axios";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom";
import { ITeacher } from "../../../types/teacher";

const createTeacher = async (data: ITeacher) => {
    try {
        const response: AxiosResponse = await axios.post('/teacher', data);

        if (response.status === 200) {
            toast.success('Вчителя створено')
            return response.data;
        } else {
            toast.error(response.data.message);
            return false;

        }

    } catch(error) {
        console.log(error);
        toast.error('Помилка при створенні вчителя')
    }
}

const useCreateTeacher = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationKey: ['teacher create'],
        mutationFn: createTeacher,
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['teachers']});
            if (data._id) {
                navigate(`/dashboard/teachers/edit/${data._id}`)
            }
        }
    })

    return mutation;
}

export default useCreateTeacher;