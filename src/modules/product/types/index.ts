export interface ProductsType{
    id: string | undefined
    name: string | undefined,
    color: string | undefined,
    model: string | undefined,
    made_in: string | undefined,
    date_of_creation: string | undefined,
    storage_id: string | undefined,
    created_at: string | undefined,
    updated_at: string | undefined,
    deleted_at: string | undefined,
}

export interface PaginationType {
    current: number;
    total: undefined;
    pageSize: number;
    pageSizeOptions: number[];
    showSizeChanger: boolean;
}