import { useEffect, useState } from "react"
import { Button, Space, Tooltip } from "antd"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ConfirmDelete, GlobalTable, Search, Select } from "@components"
import { useGetContract } from "../hooks/queries"
import { useSearchParams } from "react-router-dom";
import { ContractType } from "../types";
import { useDeleteContract } from "../hooks/mutation";
import PageModal from "./modal";

const Index = () => {
  const [open, setOpen] = useState(false)
  const [update, setUpdate] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [params, setParams] = useState({
    limit: 5,
    page: 1,
    search: ""
  })

  const { all_contracts, count } = useGetContract(params)?.data || {}
  const {mutate: deleteContract} = useDeleteContract()

  useEffect(() => {
    const pageFormParams = searchParams.get("page") || "1";
    const limitFormParams = searchParams.get("limit") || "5";
    const searchFormParams = searchParams.get("search") || "";
    setParams((prev) => ({
      ...prev,
      page: Number(pageFormParams),
      limit: Number(limitFormParams),
      search: searchFormParams
    }))
  }, [searchParams])

  const handleTableChange = (pagination: any) => {
    const { current = 1, pageSize = 5 } = pagination;
    setParams((prev) => ({
      ...prev,
      page: current,
      limit: pageSize
    }))
    setSearchParams({
      page: String(current),
      limit: String(pageSize)
    })
  }
  const editData = (data: any) => {
    setUpdate(data)
    setOpen(true)
  }
  const deleteData = (id: any) => {
    deleteContract(id)
  }
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
      title: "Name",
      dataIndex: "consumer_name",
      key: "consumer_name"
    },
    {
      title: "Passport seria",
      dataIndex: "consumer_passport_serial",
      key: "consumer_passport_serial"
    },
    {
      title: "Address",
      dataIndex: "consumer_address",
      key: "consumer_address"
    },
    {
      title: "Phone number",
      dataIndex: "consumer_phone_number",
      key: "consumer_phone_number"
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price"
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration"
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status"
    },
    {
      title: "Action",
      key: "action",
      render: (_text: string, record: ContractType) => (
        <Space size={"middle"}>
          <Tooltip title="Edit">
            <Button
              type="default"
              onClick={() => editData(record)}
              icon={<EditOutlined />}
              style={{ width: "45px", color: "blue", borderColor: "blue" }}
            />
          </Tooltip>
          <ConfirmDelete
            title="Delete product?"
            description="Are you sure to delete this product?"
            onConfirm={() => deleteData(record.id)}
          >
            <Tooltip title="Delete">
              <Button style={{ width: "45px", color: "blue", borderColor: "blue" }}>
                <DeleteOutlined />
              </Button>
            </Tooltip>
          </ConfirmDelete>
        </Space>
      ),
    }
  ]

  return (
    <div>
      <PageModal open={open} handleCancel={handleCancel} update={update} />
      <div className='flex justify-between'>
        <Search params={params} setParams={setParams} />
        <Select />
        <Button type='primary' className='btn' onClick={() => setOpen(true)}>Add Contract</Button>
      </div>
      <GlobalTable
        data={all_contracts}
        columns={columns}
        pagination={{
          current: params.page,
          pageSize: params.limit,
          total: count,
          showSizeChanger: true,
          pageSizeOption: ['2', '5', '7', '10']
        }}
        onChange={handleTableChange}
      />
    </div>
  )
}

export default Index
