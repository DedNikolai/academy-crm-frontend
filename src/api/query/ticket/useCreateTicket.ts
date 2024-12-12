import { useQueryClient, useMutation } from "@tanstack/react-query"
import axios from "../../axios";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom";
import { ITicket } from "../../../types/ticket";

const createTicket = async (data: ITicket) => {
    try {
        const response: AxiosResponse = await axios.post('/ticket', data);

        if (response.status === 200) {
            toast.success('Абонемент створено')
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

const useCreateTicket = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationKey: ['ticket create'],
        mutationFn: createTicket,
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['tickets']});
            if (data._id) {
                navigate(`/dashboard/tickets/edit/${data._id}`)
            }
        }
    })

    return mutation;
}

export default useCreateTicket;