import { useForm } from 'antd/lib/form/Form';
import { useState, useEffect } from 'react'
import { Button, Form, Input, Tabs } from 'antd';
import { contextAuth } from '../../../context';
import { useEmailMutation } from '../hooks/mutations';
import { SignUpType } from '../types';
import { useNavigate } from 'react-router-dom';



const Index = () => {
    const [form] = useForm()
    const navigate = useNavigate()
    const [verify] = useState(false)
    const [text, setText] = useState("");
    const { email } = contextAuth()
    const { mutate: verifyEmail } = useEmailMutation();

    const readClipboard = async () => {
        try {
            const text = await navigator.clipboard.readText();
            if (text.length === 6) {
                setText(text);
            }
        } catch (err) {
            console.error("Failed to read clipboard: ", err);
        }
    };
    useEffect(() => {
        readClipboard()
    }, [verify])
    useEffect(() => {
        if (text) {
            form.setFieldsValue({ verifyToken: text });
        }
    }, [text, form]);

    const handleVerify = (values: SignUpType) => {
        verifyEmail(
            { ...values, email },
            {
                onSuccess: () => {
                    navigate("/");
                },
            }
        );
    };

    const verificationForm = (
        <>
            <p className="text-center text-[#c2410c]">
                We've sent a verification code to your email. Please check your
                email ({email}) and enter the code.
            </p>

        </>
    );

    return (
        <div className='w-screen h-screen flex flex-col justify-center items-center'>
            <p className="text-center w-96 px-8">
                We've sent a verification code to your email. Please check your
                email ({email}) and enter the code.
            </p>
            <Form
                form={form}
                name="verificationForm"
                onFinish={handleVerify}
                className="mt-4 px-5"
            >
                <Form.Item
                    name="verifyToken"
                    className="flex justify-center"
                    rules={[
                        {
                            required: true,
                            message: "Please input your verification code!",
                        },
                    ]}
                >
                    <Input.OTP length={6} />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="w-full mt-4"
                        size="large"
                    >
                        Verify Email
                    </Button>
                </Form.Item>
            </Form>
            {verify ? (
                <>
                    <h2 className="text-2xl font-semibold mb-4">
                        Verify Email
                    </h2>
                    {verificationForm}
                </>
            ) : (
                <Tabs
                    defaultActiveKey="signup"
                    // items={items}
                    centered
                    tabBarGutter={50}
                />
            )}
        </div>
    )
}

export default Index