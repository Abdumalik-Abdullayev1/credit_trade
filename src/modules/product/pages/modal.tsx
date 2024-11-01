import { useForm } from "antd/lib/form/Form";
import { Button, Form, Input, Modal, DatePicker } from "antd";
import { useEffect, useState } from "react";
import { ModalPropType } from "@types";
import { useCreateProduct, useUpdateProduct, useUploadImage } from "../hooks/mutations";
import moment from "moment";

const PageModal = ({ open, handleCancel, update }: ModalPropType) => {
    const [form] = useForm()
    const [img, setImg] = useState<any>();
    const { mutate: createMutate, isPending: isCreateing } = useCreateProduct()
    const { mutate: updateMutate, isPending: isUpdating } = useUpdateProduct()
    const { mutate: uploadImage } = useUploadImage();
    useEffect(() => {
        if (update?.id) {
            form.setFieldsValue({
                name: update.name,
                made_in: update.made_in,
                model: update.model,
                color: update.color,
                date_of_creation: moment(update.date_of_creation).format("YYYY-MM-DD"),
            });
            setImg(update.image_url);
        } else {
            form.resetFields();
            setImg("");
        }
    }, [update, form]);
    const handleChange = (e: any) => {
        let fileData = e.target.files[0];
        const formData = new FormData();
        formData.append("file", fileData);
        uploadImage(formData, {
            onSuccess: (res: any) => {
                const imageUrl = res?.data?.made_url;
                setImg(imageUrl);
            },
            onError: (error: any) => {
                console.error("File upload failed:", error);
            }
        });
    };
    
    const handleSubmit = (values: any) => {
        const payload = {
            name: values.name,
            model: values.model,
            color: values.color,
            made_in: values.made_in,
            date_of_creation: moment(values.date_of_creation).format("YYYY-MM-DD"),
            image_url: img,
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
    return (
        <div>
            <Modal
                open={open}
                title={update?.id ? "Edit Product" : "Create Product"}
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
                        label="Product name"
                        name="name"
                        rules={[{ required: true, message: "Enter product name" }]}
                    >
                        <Input size="large" />
                    </Form.Item>
                    <Form.Item
                        label="Product model"
                        name="model"
                        rules={[{ required: true, message: "Enter product model" }]}
                    >
                        <Input size="large" />
                    </Form.Item>
                    <Form.Item
                        label="Product color"
                        name="color"
                        rules={[{ required: true, message: "Enter product color" }]}
                    >
                        <Input size="large" />
                    </Form.Item>
                    <Form.Item
                        label="Made in ..."
                        name="made_in"
                        rules={[{ required: true, message: "Enter product country" }]}
                    >
                        <Input size="large" />
                    </Form.Item>
                    <Form.Item
                        label="Date of creation"
                        name="date_of_creation"
                        rules={[{ required: true, message: "Enter date of creation" }]}
                    >
                        <DatePicker
                            size="large"
                            format="DD/MM/YYYY"
                            style={{ width: "100%" }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Image"
                        name="image_url"
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

export default PageModal