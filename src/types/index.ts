export interface ParamsType {
    id?: string,
    search?: string | undefined,
    limit?: number | undefined,
    page?: number | undefined,
}

export interface SecondParamsType extends ParamsType{
    select?: string | number,
}

export interface ModalPropType{
    id?: number | string,
    open: boolean,
    update: any,
    handleCancel: ()=>void
}