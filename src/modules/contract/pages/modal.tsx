import { useForm } from "antd/lib/form/Form"
import { useCreateContract, useUpdateContract } from "../hooks/mutation"
import { useEffect } from "react"
import { ModalPropType } from "@types"
import { ContractType } from "../types"
import { Button, Form, Input, Modal } from "antd"




const modal = ({ open, update, handleCancel }: ModalPropType) => {
    const [form] = useForm()
    const { mutate: createMutate, isPending: isCreateing } = useCreateContract()
    const { mutate: updateMutate, isPending: isUpdating } = useUpdateContract()

    useEffect(() => {
        if (open) {
            if (update) {
                form.setFieldsValue({
                    consumer_name: update.consumer_name,
                })
            } else {
                form.resetFields()
            }
        }
    }, [open, update, form])
    const handleSubmit = (values: ContractType) => {
        if (update) {
            const payload = { ...values, id: update?.id }
            updateMutate(payload, {
                onSuccess: () => {
                    handleCancel()
                }
            })
        } else {
            createMutate(values, {
                onSuccess: () => {
                    handleCancel()
                }
            })
        }
    }
    return (
        <>
            <Modal
                open={open}
                title={update?.id ? "Edit Contract" : "Create Contract"}
                onCancel={handleCancel}
                footer={false}
            >
                <Form
                    form={form}
                    name="categoryForm"
                    style={{ width: "100%", marginTop: "20px" }}
                    onFinish={handleSubmit}
                    layout="vertical"
                >
                    <Form.Item
                        label="Product name"
                        name="name"
                        rules={[{ required: true, message: "Enter category name" }]}
                    >
                        <Input size="large" />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            size="large"
                            style={{ width: "100%" }}
                            type="primary"
                            htmlType="submit"
                            loading={isCreateing || isUpdating}
                        >
                            {update ? "Update" : "Add"}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

        </>
    )
}

export default modal
