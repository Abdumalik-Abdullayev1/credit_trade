import { useState, useEffect } from 'react'
import { ConfirmDelete, GlobalTable, Search } from "@components"
import { useSearchParams } from 'react-router-dom'
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useGetProducts } from '../hooks/queries'
import { Button, Space, Tooltip } from 'antd'
import { ProductsType } from '../types'
import { useDeleteProduct } from '../hooks/mutations';
import PageModal from './modal'

const Index = () => {
  const [update, setUpdate] = useState(null)
  const [open, setOpen] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState({
    limit: 5,
    page: 1,
    search: ""
  })

  const { all_products, count } = useGetProducts(params)?.data || {}
  const { mutate: deleteProduct } = useDeleteProduct()

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
  }, [searchParams]);

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
      title: "Color",
      dataIndex: "color",
      key: "color"
    },
    {
      title: "Made",
      dataIndex: "made_in",
      key: "made_in"
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
