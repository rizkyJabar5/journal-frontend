import { LockOutlined, MailOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react';
import { Alert, Button, Form, Input } from "antd";
import { motion } from "framer-motion";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, showAuthMessage, showLoading} from '@/store/features/auth';

export const LoginForm = ({ showForgetPassword = true, extra,  }) => {
	const dispatch = useDispatch();
	const { loading, message, showMessage } = useSelector(state => state.auth);
	const navigate = useNavigate();

	const getUserData = async (token) => {
		try {
			localStorage.setItem('token', token)
			// const response = await dispatch(getUserProfile(token)).unwrap()
			// dispatch(authenticated({ token, user: response.doc }))
			console.log(token)
			navigate("/app/dashboard/");
		} catch {
			localStorage.removeItem('token')
			navigate("/auth");
		}
	}

	// handleValidSubmit
	const handleValidSubmit = async (values) => {
		try{
			dispatch(showLoading())
			const credentials = {
				username: values.username,
				password: values.password
			}

			const user = await dispatch(login(credentials)).unwrap()
			const token = user.accessToken

			console.log(token)

			if(token){
				getUserData(token)
			}else{
				dispatch(showAuthMessage(user.message))
			}
		}catch(err){
			dispatch(showAuthMessage(err.message))
		}
	}

	useEffect(() => {
		if (localStorage.getItem('token') !== null) {
			dispatch(showLoading())
			navigate("/app/dashboard/");
		}
	});

	return (
		<>
			<motion.div
				initial={{ opacity: 0, marginBottom: 0 }}
				animate={{
					opacity: showMessage ? 1 : 0,
					marginBottom: showMessage ? 20 : 0
				}}>
				<Alert showIcon message={message}></Alert>
			</motion.div>
			<Form
				layout="vertical"
				name="login-form"
				onFinish={handleValidSubmit}
			>
				<Form.Item
					name="username"
					label="Username"
				>
					<Input prefix={<MailOutlined className="text-primary" />} />
				</Form.Item>
				<Form.Item
					name="password"
					label={
						<div className={`${showForgetPassword ? 'd-flex justify-content-between w-100 align-items-center' : ''}`}>
							<span>Password</span>
							{
								showForgetPassword &&
								<span
									onClick={() => navigate.push("/auth/forgot-password")}
									className="cursor-pointer font-size-sm font-weight-normal text-muted"
								>
									Lupa Kata Sandi?
								</span>
							}
						</div>
					}
					rules={[
						{
							required: true,
							message: 'Please input your password',
						}
					]}
				>
					<Input.Password prefix={<LockOutlined className="text-primary" />} />
				</Form.Item>
				<Form.Item>
					<Button type="primary" style={{ border: "0px" }} htmlType="submit" block loading={loading}>
						Masuk
					</Button>
				</Form.Item>

				{extra}
			</Form>
		</>
	)
}

LoginForm.propTypes = {
	otherSignIn: PropTypes.bool,
	showForgetPassword: PropTypes.bool,
	extra: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
};

export default LoginForm