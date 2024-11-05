export interface ProductsType{
    id?: string | undefined
    name: string,
    color: string,
    model: string,
    made_in: string,
    date_of_creation: string,
    image_url?: string,
    storage_id?: string | number
}

export interface PaginationType {
    current: number;
    total: undefined;
    pageSize: number;
    pageSizeOptions: number[];
    showSizeChanger: boolean;
}

export interface RecordType {
    id?: string | number,
    // amount: number | string,
    // created_at: string,
    // price: number | string,
}