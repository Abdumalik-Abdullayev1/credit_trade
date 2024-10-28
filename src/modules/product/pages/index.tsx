import { useState, useEffect } from 'react'
import { ConfirmDelete, GlobalTable, Search } from "@components"
import { useLocation, useNavigate } from 'react-router-dom'
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useGetProducts } from '../hooks/queries'
import { Button, Space, Tooltip } from 'antd'
import { PaginationType, ProductsType } from '../types'
import { useDeleteProduct } from '../hooks/mutations';
import PageModal from './modal'

const Index = () => {
  const [update, setUpdate] = useState(null)
  const [open, setOpen] = useState(false)
  const [params, setParams] = useState({
    limit: 5,
    page: 1,
    search: ""
  })
  const navigate = useNavigate()
  const { search } = useLocation()

  // const {data} = useGetProducts(params)
  const { all_products, count } = useGetProducts(params)?.data || {}
  const { mutate: deleteProduct } = useDeleteProduct()

  useEffect(() => {
    const params = new URLSearchParams(search)
    const page = Number(params.get("page")) || 1;
    const limit = Number(params.get("limit")) || 5;
    const search_val = params.get("search_val") || ""
    setParams((prev) => ({
      ...prev,
      search: search_val,
      page: page,
      limit: limit
    }))
  }, [search])

  const handleTableChange = (pagination: PaginationType) => {
    const { pageSize, current } = pagination;
    setParams((prev) => ({
      ...prev,
      limit: pageSize,
      page: current
    }))
    const current_params = new URLSearchParams(search);
    current_params.set("limit", `${pageSize}`);
    current_params.set("page", `${current}`);
    navigate(`?${current_params}`);
  }
  const editData = (data: any) => {
    setUpdate(data)
    setOpen(true)
  }
  const deleteData = (id: any) => {
    deleteProduct(id)
  }
  const handleCancel = () => {
    setUpdate(null)
    setOpen(false)
  }
  const handleSearch = (value: string) => {
    setParams((prev) => ({
      ...prev,
      search: value
    }))
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
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model"
    },
    {
      title: "Made",
      dataIndex: "made_in",
      key: "made_in"
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color"
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price"
    },
    {
      title: "Action",
      key: "action",
      render: (_text: string, record: ProductsType) => (
        <Space size={"middle"}>
          <Tooltip title="Edit">
            <Button
              type="default"
              onClick={() => editData(record)}
              icon={<EditOutlined />}
              style={{ width: "45px", color: "#d55200", borderColor: "#d55200" }}
            />
          </Tooltip>
          <ConfirmDelete
            title="Delete product?"
            description="Are you sure to delete this product?"
            onConfirm={() => deleteData(record.id)}
          >
            <Tooltip title="Delete">
              <Button style={{ width: "45px", color: "#d55200", borderColor: "#d55200" }}>
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
      <h1>Products</h1>
      <PageModal open={open} handleCancel={handleCancel} update={update} />
      <div className='flex justify-between'>
        <Search placeholder='Search product...' searchParamKey='search' onSearch={handleSearch} />
        <Button type='primary' className='btn' onClick={() => setOpen(true)}>Add Product</Button>
      </div>
      <GlobalTable
        data={all_products}
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
