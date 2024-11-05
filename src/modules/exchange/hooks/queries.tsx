import { useQuery } from "@tanstack/react-query";
import { getExchange } from "../service";
import { GetExchangeType } from "../types";



// ========= GET EXCHANGE =======
export function useGetExchange( data: GetExchangeType) {
    const { id, params } = data
    return useQuery({
        queryKey: ["all_exchanges", id, params],
        queryFn: () => getExchange(data)
    })
}
