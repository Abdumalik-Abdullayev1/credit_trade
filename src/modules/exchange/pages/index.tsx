import { useState, useEffect } from "react"
import { Button, Tooltip, Space } from 'antd'
import { EditOutlined } from "@ant-design/icons";
import { useGetExchange } from "../hooks/queries"
import { ConfirmDelete, GlobalTable, Search } from "@components"
import { useParams, useSearchParams } from "react-router-dom"
import { ExchangeType, GetExchangeType } from "../types"
import { useDeleteExchange } from "../hooks/mutation";
import ModalExcahnge from './modal'

const Index = () => {
  const [open, setOpen] = useState(false)
  const [update, setUpdate] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [params, setParams] = useState({
    limit: 5,
    page: 1,
    search: "",
  })
  const { id } = useParams()
  const payload:GetExchangeType = {params:{...params}, id}
  const { exchange, count } = useGetExchange(payload)?.data || {}
  const { mutate } = useDeleteExchange()

  useEffect(() => {
    const pageFromParams = searchParams.get("page") || "1";
    const limitFromParams = searchParams.get("limit") || "5";
    const searchFromParams = searchParams.get("search") || "";
    setParams((prev) => ({
      ...prev,
      page: Number(pageFromParams),
      limit: Number(limitFromParams),
      search: searchFromParams,
    }));
  }, [searchParams])

  const editData = (data: any) => {
    setUpdate(data)
    setOpen(true)
  }
  const handleTableChange = (pagination: any) => {
    const { current = 1, pageSize = 5 } = pagination;
    setParams((prev) => ({
      ...prev,
      page: current,
      limit: pageSize,
    }));
    setSearchParams({
      page: String(current),
      limit: String(pageSize),
    });
  };
  const handleCancel = () => {
    setUpdate(null)
    setOpen(false)
  }
  const columns = [
    {
      title: "№",
      dataIndex: "index",
      key: "index",
      render: (_text: string, _record: any, index: number) => `${(params.page - 1) * params.limit + index + 1}`
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Created at",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Action",
      key: "action",
      render: (_text: string, record: ExchangeType) => (
        <Space size={"middle"}>
          <Tooltip title="Edit">
            <Button
              type="default"
              onClick={() => editData(record)}
              icon={<EditOutlined />}
              style={{ width: "45px", color: "blue", borderColor: "blue" }}
            />
          </Tooltip>
          <ConfirmDelete id={record.id} deleteItem={(id:string | undefined)=>mutate(id)} />
        </Space>
      ),
    }
  ]
  

  return (
    <div>
      <ModalExcahnge open={open} handleCancel={handleCancel} update={update} id={id} />
      <div className='flex justify-between'>
        <Search params={params} setParams={setParams} />
        <Button type='primary' className='btn' onClick={() => setOpen(true)}>Add Product</Button>
      </div>
      <GlobalTable
        data={exchange}
        columns={columns}
        pagination={{
          current: params.page,
          total: count,
          pageSize: params.limit,
          showSizeChanger: true,
          pageSizeOption: ['2', '5', '7', '10']
        }}
        onChange={handleTableChange}
      />
    </div>
  )
}

export default Index
