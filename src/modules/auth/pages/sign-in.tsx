import { Button, Form, Input } from 'antd';
import { NavLink } from 'react-router-dom'
import { SignInType } from '../types';
import { useSignIn } from '../hooks/mutations';

// import logo from '../../../../assets/erp_logo.png'

const SignIn = () => {
  const { mutate } = useSignIn()
  
  
  const onFinish = async (values: SignInType) => {
    mutate(values)
  };
  const onFinishFailed = () => {
    console.log('Failed:');
  };
  return (
    <div className='bg-gradient-to-t from-sky-300 to-indigo-900 flex justify-center'>
        <div className='w-2/4'>
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
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!', },]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!', },]}
              >
                <Input.Password className='' />
              </Form.Item>
              <Form.Item
                wrapperCol={{ offset: 0 }}
              >
                <Button className='w-full' type="primary" htmlType="submit">  Submit </Button>
                <p>Don't you have an account? <NavLink to="/sign_up" className="font-bold pt-1">Register</NavLink></p>

              </Form.Item>
            </Form>
          </div>
        </div>
    </div>
  )
}

export default SignIn