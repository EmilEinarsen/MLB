import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import React, { useEffect, useRef } from 'react'
import App from '..'
import './Auth.sass'
import 'antd/dist/antd.css'
import { Box, Card, Link, makeStyles } from '@material-ui/core'
import GoogleLogin from 'react-google-login'
import { EAuthState } from '../../Providers/AuthProvider'
import LoadingScreen from '../LoadingScreen'
import { FormInstance } from 'antd/lib/form'

interface Props {
	authState: EAuthState
	toggleForm: () => void
	handleFinish: (values: any) => void
	submitState: any
	refMounted: any
	error: { customErrors: any, removeError: any }
}

const useStyles = makeStyles(theme => ({
	root: {
		display: 'grid',
		placeContent: 'center',
		height: '90vh'
	},
	card: {
		padding: theme.spacing(3, 2),
		maxWidth: '80ch',
	},
}))

const responseGoogle = (response: any) => {
	console.log(response)
}

const formItemValidator = (value: any) => ({ validator: () => value ? Promise.reject(value) : Promise.resolve() })

const Auth: React.FC<Props> = ({ 
	authState, 
	toggleForm, 
	handleFinish, 
	submitState, 
	refMounted,
	error: { customErrors, removeError }
}) => {
	const 
		refForm = useRef<FormInstance<any> | undefined>(undefined),
		classes = useStyles()

	const handleValuesChanged = (changedValues: any) =>
		Object.keys(changedValues).forEach(key=>removeError(key))

	useEffect(() => {
		refForm.current && refForm.current.validateFields(Object.keys(customErrors))
	}, [customErrors])

	handleFinish = async (values: any) => {
		console.log(await refForm.current?.validateFields())
		handleFinish(values)
	}

	const formProps = { refForm, handleFinish, toggleForm, submitState, refMounted, customErrors, onValuesChange: handleValuesChanged }

	return authState === EAuthState.authorized ? <App refMounted={refMounted} />
		: authState === EAuthState.loading ? <LoadingScreen loading={refMounted} />
		:
		<Box className={classes.root}>
			<Card className={classes.card}>
				{ authState === EAuthState.login && <Login {...formProps} /> }
				
				{ authState === EAuthState.register && <Register {...formProps} /> }
			</Card>
		</Box>
}

const Login: React.FC<{
	refForm:any
	handleFinish: (values: any) => void 
	toggleForm?: () => void
	submitState: any
	refMounted: any
	customErrors: any
	onValuesChange: any
}> = ({ 
	refForm,
	handleFinish,
	toggleForm,
	submitState,
	refMounted,
	customErrors,
	onValuesChange
}) => {
	const [form] = Form.useForm()

	refForm.current = form

	return (
		<Form
			form={form}
			name="normal_login"
			className="form"
			onFinish={handleFinish}
			ref={refMounted}
		>
			<Form.Item
				name="email"
				rules={[{ required: true, message: 'Please input your Email!' }]}
			>
				<Input prefix={<MailOutlined />} placeholder="Email" />
			</Form.Item>
			<Form.Item
				name="password"
				rules={[{ required: true, message: 'Please input your Password!' }]}
			>
				<Input.Password
					prefix={<LockOutlined />}
					type="password"
					placeholder="Password"
				/>
			</Form.Item>
			{/* <Form.Item>
				<Form.Item name="remember" valuePropName="checked" noStyle>
					<Checkbox>Remember me</Checkbox>
				</Form.Item>

				<a className="form-forgot" href="">
					Forgot password
				</a>
			</Form.Item> */}

			<Form.Item>
				<Button type="primary" htmlType="submit" className="form-button" loading={submitState.pending}>
					Log in
				</Button>
				{ toggleForm && <Box>Or <Link onClick={toggleForm}>register now!</Link></Box>}
			</Form.Item>
			<Form.Item style={{ display: 'grid', placeContent: 'center' }}>
				<GoogleLogin
					clientId="597147752554-jjahlt7diu2b3v48gbldo8hq1bl2ovu3.apps.googleusercontent.com"
					buttonText="Login"
					onSuccess={responseGoogle}
					onFailure={responseGoogle}
					cookiePolicy={'single_host_origin'}
					disabled
				/>
			</Form.Item>
		</Form>
	)
}


const Register: React.FC<{ 
	refForm: any
	handleFinish: (values: any) => void
	toggleForm: () => void
	submitState: any
	refMounted: any
	customErrors: any
	onValuesChange: any
}> = ({
	refForm,
	handleFinish,
	toggleForm,
	submitState,
	refMounted,
	customErrors,
	onValuesChange
}) =>{ 
	const [form] = Form.useForm()

	refForm.current = form
	
	return (
		<Form
			form={form}
			name="register"
			initialValues={{ remember: true }}
			onFinish={handleFinish}
			layout='vertical'
			className='form-register'
			ref={refMounted}
			onValuesChange={onValuesChange}
		>
			<Form.Item
				name="email"
				label="E-mail"
				rules={[
					{ type: 'email', message: 'The input is not valid E-mail!' },
					{ required: true, message: 'Please input your E-mail!' },
					formItemValidator(customErrors?.email)
				]}
			>
				<Input prefix={<MailOutlined />} />
			</Form.Item>

			<Form.Item
				name="username"
				label="Username"
				rules={[
					{ required: true, message: 'Please input an username!' },
					formItemValidator(customErrors?.username)
				]}
			>
				<Input prefix={<UserOutlined />} />
			</Form.Item>

			<Form.Item
				name="password"
				label="Password"
				rules={[
					{ required: true, message: 'Please input your password!' },
					formItemValidator(customErrors?.password)
				]}
				hasFeedback
			>
				<Input.Password prefix={<LockOutlined />} />
			</Form.Item>

			<Form.Item
				name="confirm"
				label="Confirm Password"
				dependencies={['password']}
				hasFeedback
				rules={[
					{
						required: true,
						message: 'Please confirm your password!',
					},
					({ getFieldValue }) => ({
						validator: (_, value) => !(!value || getFieldValue('password') === value) 
							? Promise.reject('The two passwords that you entered do not match!')
							: Promise.resolve()
						,
					}),
				]}
			>
				<Input.Password prefix={<LockOutlined />} />
			</Form.Item>

			<Form.Item>
				<Button type="primary" htmlType="submit" className="form-button">
					Register
				</Button>
				Or <Link onClick={toggleForm}>login</Link>
			</Form.Item>
		</Form>
	)
}

export default Auth
