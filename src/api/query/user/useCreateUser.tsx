import { useQueryClient, useMutation } from "@tanstack/react-query"
import axios from "../../axios";
import { IUser } from "../../../types/user";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

const createUser = async (data: IUser) => {
    try {
        const response: AxiosResponse = await axios.post<IUser>('/auth/register', data);

        if (response.status === 200) {
            toast.success('Адміністрвтора створено')
            return true;
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

    const mutation = useMutation({
        mutationKey: ['users create'],
        mutationFn: createUser,
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['users']})
            console.log(data)
        }
    })

    return mutation;
}

export default useCreateUser;