export interface ExchangeType{
    id: string | undefined,
    amount: number,
    created_at?: string,
    price: number,
    product_id?: string | number,
    status: string,
    contract_id: string,
}

export interface GetExchangeType {
    id?: string,
    params: {
        search: string,
        limit: number,
        page: number
    }
}