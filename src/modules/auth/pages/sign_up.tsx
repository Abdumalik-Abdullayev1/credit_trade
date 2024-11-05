import { Button, Form, Input } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom'
import { useSignUpMutation, } from '../hooks/mutations';
import { SignUpType } from '../types';
import logo from '../../../assets/image.jpg'
import { contextAuth } from '../../../context';

const SignUp = () => {
  const navigate = useNavigate()
  const { mutate: signUp } = useSignUpMutation()
  const { setEmail } = contextAuth()
  const onFinish = (values: SignUpType) => {
    signUp(values, {
      onSuccess: () => {
        setEmail(values.email);
        navigate("/verify-email")
      },
    });
  };
  return (
    <div className='flex'>
      <div className='hidden lg:block'>
        <img className='h-screen object-cover' src={logo} alt="logo" />
      </div>
      <div className='flex w-screen lg:w-1/2'>
        <div className='w-screen h-screen flex flex-col justify-center items-center sm:px-14 lg:px-48'>
          <h1 className='flex justify-start mb-4 font-extrabold text-4xl'>Register</h1>
          <Form
            name="basic"
            labelCol={{ span: 100, }}
            wrapperCol={{ span: 500, }}
            style={{ maxWidth: 1000, }}
            initialValues={{ remember: true, }}
            onFinish={onFinish}
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
