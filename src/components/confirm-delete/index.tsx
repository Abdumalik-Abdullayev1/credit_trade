import { Button, Popconfirm, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
interface ConfirmDelete {
  id: string | undefined;
  deleteItem: (id: string | undefined) => void;
}
const Index = ({ id, deleteItem }: ConfirmDelete) => {
  const handleDelete = () => {
    deleteItem(id);
  };
  return (
    <>
      <Popconfirm
        title="Delete the task"
        description="Are you sure to delete this task?"
        okText="Yes"
        cancelText="No"
        onConfirm={handleDelete}
      >
        <Tooltip title="Delete">
          <Button danger icon={<DeleteOutlined />}></Button>
        </Tooltip>
      </Popconfirm>
    </>
  );
};
export default Index;