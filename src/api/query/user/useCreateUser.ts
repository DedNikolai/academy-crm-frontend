import { useQueryClient, useMutation } from "@tanstack/react-query"
import axios from "../../axios";
import { IUser } from "../../../types/user";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom";

const createUser = async (data: IUser) => {
    try {
        const response: AxiosResponse = await axios.post<IUser>('/auth/register', data);

        if (response.status === 200) {
            toast.success('Адміністрвтора створено')
            return response.data;
        } else {
            toast.error(response.data.message);
            return false;

        }

    } catch(error) {
        console.log(error);
        toast.error('Помилка при створенні адміністратора')
    }
}

const useCreateUser = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationKey: ['users create'],
        mutationFn: createUser,
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['users']});
            if (data._id) {
                navigate(`/dashboard/admins/edit/${data._id}`)
            }
        }
    })

    return mutation;
}

export default useCreateUser;