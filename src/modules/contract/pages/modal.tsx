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
                    duration: Number(update.duration),
                    consumer_name: update.consumer_name,
                    consumer_address: update.consumer_address,
                    consumer_phone_number: update.consumer_phone_number,
                    consumer_passport_serial: update.consumer_passport_serial,
                })
            } else {
                form.resetFields()
            }
        }
    }, [open, update, form])
    const handleSubmit = (values: ContractType) => {
        const payload = {
            ...values,
            duration: Number(values.duration),
            ...(update && { id: update.id })
        }

        if (update) {
            updateMutate(payload, {
                onSuccess: () => handleCancel()
            })
        } else {
            createMutate(payload, {
                onSuccess: () => handleCancel()
            })
        }
    }
    return (
        <div>
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
                        label="Consumer name"
                        name="consumer_name"
                        rules={[{ required: true, message: "Enter category name" }]}
                    >
                        <Input size="large" />
                    </Form.Item>
                    <Form.Item
                        label="Consumer phone"
                        name="consumer_phone_number"
                        rules={[{ required: true, message: "Enter category name" }]}
                    >
                        <Input size="large" />
                    </Form.Item>
                    <Form.Item
                        label="Consumer address"
                        name="consumer_address"
                        rules={[{ required: true, message: "Enter category name" }]}
                    >
                        <Input size="large" />
                    </Form.Item>
                    <Form.Item
                        label="Duration"
                        name="duration"
                        rules={[{ required: true, message: "Enter category name" }]}
                    >
                        <Input size="large" />
                    </Form.Item>
                    <Form.Item
                        label="Consumer passport number"
                        name="consumer_passport_serial"
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

        </div>
    )
}

export default modal
