import { useQuery } from "@tanstack/react-query";
import { ParamsType } from "@types";
import { getProduct } from "../service";


// ========== GET PRODUCT ==========
export function useGetProducts(params: ParamsType){
    return useQuery({
        queryKey: ["products", params],
        queryFn: ()=> getProduct(params)
    })
}
