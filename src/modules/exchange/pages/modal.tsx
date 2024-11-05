import { useForm } from "antd/lib/form/Form"
import { Button, Form, Input, Modal, Select } from "antd";
import { ModalPropType } from "@types"
import { useCreateExchange, useUpdateExchange } from "../hooks/mutation"
import { useGetContract } from "../../contract/hooks/queries";
import { useEffect, useState } from "react"
import { ExchangeType } from "../types";

const modalExchange = ({ open, update, handleCancel, id }: ModalPropType) => {
    const [form] = useForm()
    const [isContractDisabled, setIsContractDisabled] = useState(true);
    const { mutate: createExchange, isPending: isCreating } = useCreateExchange()
    const { mutate: updateExchange, isPending: isUpdating } = useUpdateExchange()
    const { all_contracts } = useGetContract({})?.data || {}
    useEffect(() => {
        if (update?.id) {
            form.setFieldsValue({
                amount: parseInt(update.amount),
                price: parseInt(update.price),
                status: update.status,
                contract_id: update.contract_id,
                product_id: update.product_id,
                exchange_id: update.exchange_id
            })
            setIsContractDisabled(update.status !== "buy");
        } else {
            form.resetFields()
            setIsContractDisabled(true);
        }
    }, [update, form])

    const handleSubmit = (values: ExchangeType) => {
        const payload: ExchangeType = {
            id: values.id,
            amount: Number(values.amount),
            price: Number(values.price),
            status: values.status,
            contract_id: values.contract_id,
            product_id: id,
        };
        

        if (update) {
            updateExchange(
                payload,
                {
                    onSuccess: () => {
                        handleCancel();
                    },
                }
            );
        } else {
            createExchange(
                [payload],
                {
                    onSuccess: () => {
                        handleCancel()
                    }
                }
            );
        }
    };


    const handlePriceChange = (event: any) => {
        const value = event.target.value;
        if (!isNaN(value)) {
            form.setFieldsValue({ price: Number(value) });
        }
    };
    const handleAmountChange = (e: any) => {
        const value = e.target.value;
        if (!isNaN(value)) {
            form.setFieldsValue({ amount: Number(value) });
        }
    };
    const handleStatusChange = (value: string) => {
        form.setFieldsValue({ status: value });
        setIsContractDisabled(value !== "sell");
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
                        label="Amount"
                        name="amount"
                        rules={[{ required: true, message: "Please enter amount" }]}
                    >
                        <Input size="large" onChange={handleAmountChange} />
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: "Please enter price" }]}
                    >
                        <Input size="large" onChange={handlePriceChange} />
                    </Form.Item>
                    <Form.Item
                        label="Status"
                        name="status"
                        rules={[{ required: true, message: "Please select status!" }]}
                    >
                        <Select size="large" placeholder="Select status" onChange={handleStatusChange}>
                            <Select.Option value="sell">Sell</Select.Option>
                            <Select.Option value="buy">Buy</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Contract"
                        name="contract_id"
                        rules={[{ required: !isContractDisabled, message: "Please select contract!" }]}
                    >
                        <Select size="large" allowClear showSearch placeholder="Select a Contract" disabled={isContractDisabled}>
                            {all_contracts?.map((item: any) => (
                                <Select.Option value={item.id} key={item.id}>
                                    {item.consumer_passport_serial}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            size="large"
                            style={{ width: "100%" }}
                            type="primary"
                            htmlType="submit"
                            loading={isCreating || isUpdating}
                        >
                            {update ? "Update" : "Add"}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default modalExchange
