import { useQuery } from "@tanstack/react-query"
import axios from '../../axios';
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

const fetchAccounts = async () => {
    try {
        const response: AxiosResponse = await axios.get(`/payaccount`);
        if (response.status === 200) {
            return response.data;
        } else {
            return []
        }
    } catch(error) {
        console.log(error);
        toast.error('Cant get accounts')
    }
}

const usePayAccounts = () => {
    const {data = [], isFetching, isLoading} = useQuery({
        queryKey: ['payaccounts'],
        queryFn: fetchAccounts,
        
    })

    return {data, isFetching, isLoading}
};

export default usePayAccounts;