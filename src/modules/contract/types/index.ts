export interface ContractType {
    id?: string | number,
    consumer_name?: string,
    consumer_phone_number?: string,
    consumer_address?: string,
    consumer_passport_serial?: string,
    created_at?: string,
    deleted_at?: string,
    duration?: number | undefined,
    passport_image?: string,
    price?: number | string,
    status?: string
    storage_id?: string | number
}

export interface PaginationType {
    current: number;
    total: undefined;
    pageSize: number;
    pageSizeOptions: number[];
    showSizeChanger: boolean;
}