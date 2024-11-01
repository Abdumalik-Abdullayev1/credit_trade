import { useForm } from "antd/lib/form/Form"
import { useContractImage, useCreateContract, useUpdateContract } from "../hooks/mutation"
import { useEffect, useState } from "react"
import { ModalPropType } from "@types"
// import { ContractType } from "../types"
import { Button, Form, Input, Modal } from "antd"




const modal = ({ open, update, handleCancel }: ModalPropType) => {
    const [form] = useForm()
    const [img, setImg] = useState<any>()
    const { mutate: createMutate, isPending: isCreateing } = useCreateContract()
    const { mutate: updateMutate, isPending: isUpdating } = useUpdateContract()
    const { mutate: uploadContractImg} = useContractImage()

    useEffect(() => {
        if (update) {
            form.setFieldsValue({
                duration: parseInt(update.duration),
                consumer_name: update.consumer_name,
                consumer_address: update.consumer_address,
                consumer_phone_number: update.consumer_phone_number,
                consumer_passport_serial: update.consumer_passport_serial,
            })
            setImg(update.passport_image)
        } else {
            form.resetFields()
            setImg("")
        }
    }, [update, form])
    const handleSubmit = (values: any) => {
        const payload = {
            ...values,
            consumer_name: values.consumer_name,
            consumer_address: values.consumer_address,
            consumer_phone_number: values.consumer_phone_number,
            consumer_passport_serial: values.consumer_passport_serial,
            duration: parseInt(values.duration),
            passport_image: img
            
        };

        if (update?.id) {
            updateMutate(
                { id: update.id, ...payload, storage_id: update.storage_id },
                {
                    onSuccess: () => {
                        handleCancel();
                    },
                }
            );
        } else {
            createMutate(payload, {
                onSuccess: () => {
                    handleCancel();
                },
            });
        }
    };
    const handleChange = (e: any) => {
        let fileData = e.target.files[0]
        const formData = new FormData()
        formData.append("file", fileData)
        uploadContractImg(formData, {
            onSuccess: (res: any) => {
                const passportImg = res?.data?.made_url
                setImg(passportImg)
            },
            onError: (error: any) => {
                console.error("File upload failed:", error);
            }
        })
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
                    id="basic"
                    name="basic"
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
                    <Form.Item
                        label="Passport image"
                        name="passport_image"
                        rules={[
                            {
                                required: update?.id ? false : true,
                                message: "Please upload image!",
                            },
                        ]}
                        style={{ marginBottom: 20 }}
                    >
                        <Input type="file" onChange={handleChange} />
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
