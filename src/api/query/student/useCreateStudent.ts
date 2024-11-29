import { useQueryClient, useMutation } from "@tanstack/react-query"
import axios from "../../axios";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom";
import { IFormStudent, IStudent } from "../../../types/student";

const createStudent = async (data: IFormStudent) => {
    try {
        const response: AxiosResponse = await axios.post('/student', data);

        if (response.status === 200) {
            toast.success('Учня створено')
            return response.data;
        } else {
            toast.error(response.data.message);
            return false;

        }

    } catch(error) {
        console.log(error);
        toast.error('Помилка при створенні учня')
    }
}

const useCreateStudent = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationKey: ['student create'],
        mutationFn: createStudent,
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['students']});
            if (data._id) {
                navigate(`/dashboard/students/edit/${data._id}`)
            }
        }
    })

    return mutation;
}

export default useCreateStudent;