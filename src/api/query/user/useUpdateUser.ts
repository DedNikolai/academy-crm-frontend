import {useMutation, useQueryClient} from '@tanstack/react-query';
import { IUser } from '../../../types/user';
import { updateUser } from '../../user';


const useUpdateUser = (id?: string) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationKey: ['user update'],
        mutationFn: updateUser,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['users']});
            queryClient.invalidateQueries({queryKey: ['user', id]})
        }
    })

    return mutation;
}

export default useUpdateUser;