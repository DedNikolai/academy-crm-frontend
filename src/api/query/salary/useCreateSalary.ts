import { useQueryClient, useMutation } from "@tanstack/react-query"
import axios from "../../axios";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { IFormDataSalary } from "../../../types/salary";
import {useNavigate} from "react-router-dom";

const createSalary = async (data: IFormDataSalary) => {
    try {
        const response: AxiosResponse = await axios.post('/salary', data);

        if (response.status === 200) {
            toast.success('Виплату зафіксовано')
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

const useCreateSalary= () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationKey: ['salary create'],
        mutationFn: createSalary,
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['payaccounts']});
            if (data._id) {
                navigate(`/dashboard/salary`)
            }
        }
    })

    return mutation;
}

export default useCreateSalary;