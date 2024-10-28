import { Button, Form, Input } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom'
import { FormProps } from 'antd';
import { useSignUpMutation } from '../hooks/mutations';
import { SignUpType } from '../types';
// import logo from '../../../../assets/erp_logo.png'

const SignUp = () => {
  const navigate = useNavigate()
  const { mutate } = useSignUpMutation()
  const onFinish: FormProps<SignUpType>["onFinish"] = async (values: any) => {
    mutate({
      full_name: values.full_name,
      phone_number: values.phone_number,
      email: values.email,
      address: values.address,
      username: values.username,
      password: values.password,
    },
      {
        onSuccess: (response: any) => {
          if (response.status === 201) {
            navigate('/')
          }
        }
      })
  };
  const onFinishFailed: FormProps<SignUpType>["onFinishFailed"] = () => {
    console.log('Failed:');
  };
  return (
    <div className='bg-gradient-to-t from-sky-300 to-indigo-900 flex justify-center'>
      <div className='w-1/2'>
        <div className='h-screen flex flex-col justify-center px-48'>
          <h1 className='flex justify-start mb-8 font-extrabold text-4xl text-white'>Login</h1>
          <Form
            name="basic"
            labelCol={{ span: 10, }}
            wrapperCol={{ span: 500, }}
            style={{ maxWidth: 1000, }}
            initialValues={{ remember: true, }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout='vertical'
          >
            <Form.Item
              label="Full name"
              name="full_name"
              rules={[{ required: true, message: 'Please input your first name!', },]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Phone number"
              name="phone_number"
              rules={[{ required: true, message: 'Please input your last name!', },]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email address!', },]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: 'Please input your phone number!', },]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your phone number!', },]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!', },]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              wrapperCol={{ offset: 0 }}
            >
              <Button className='w-full' type="primary" htmlType="submit">  Submit </Button>
              <p>Already have an account? <NavLink to="/" className="font-bold pt-1">LogIn</NavLink></p>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default SignUp
