import { useQueryClient, useMutation } from "@tanstack/react-query"
import axios from "../../axios";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom";
import { IFormDataExpense } from "../../../types/expense";

const createExpense = async (data: IFormDataExpense) => {
    try {
        const response: AxiosResponse = await axios.post('/expense', data);

        if (response.status === 200) {
            toast.success('Витрату зафіксовано')
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

const useCreateExpense= () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationKey: ['expense create'],
        mutationFn: createExpense,
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['payaccounts']});
            if (data._id) {
                navigate(`/dashboard/expense`)
            }
        }
    })

    return mutation;
}

export default useCreateExpense;