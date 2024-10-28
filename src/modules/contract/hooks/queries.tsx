import { useQuery } from "@tanstack/react-query";
import { ParamsType } from "@types";
import { getContract } from "../service";


export function useGetContract(params: ParamsType){
    return useQuery({
        queryKey: ["all_contracts", params],
        queryFn: ()=> getContract(params)
    })
}