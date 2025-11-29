import React from 'react'
import LoginForm from '../../components/LoginForm'
import { Card, Row, Col } from "antd";
import { strings } from 'res';
import Loading from "components/shared-components/Loading"
import { connect, useSelector } from "react-redux";
import {
	showLoading,
	showAuthMessage,
	hideAuthMessage,
	authenticated
} from 'redux/features/auth';
import { getAuthBackgroundStyle } from 'utils';

const Login = props => {
	const { authBackground, companyLogo } = useSelector(state => state.theme)
	const { loading } = props

	if (loading) {
		return (<div className="container" style={{ marginTop: "25%" }}>
			<Loading style={{ marginTop: "50%" }}></Loading>
		</div>)
	} else {
		return (
			<div className="h-100" style={getAuthBackgroundStyle(authBackground)}>
				<div className="container d-flex flex-column justify-content-center h-100">
					<Row justify="center">
						<Col xs={20} sm={20} md={20} lg={7}>
							<Card>
								<div className="my-4">
									<div className="text-center">
										<h2>PT. Putra Mahkota Plastik</h2>
										<p>Masuk dengan akun anda</p>
									</div>
									<Row justify="center">
										<Col xs={24} sm={24} md={20} lg={20}>
											<LoginForm {...props} otherSignIn={null} redirect={strings.navigation.main} />
										</Col>
									</Row>
								</div>
							</Card>
						</Col>
					</Row>
				</div>
			</div>
		)
	}

}

const mapStateToProps = ({ auth }) => {
	const { loading, message, showMessage, token, redirect } = auth;
	return { loading, message, showMessage, token, redirect }
}

const mapDispatchToProps = {
	showAuthMessage,
	showLoading,
	hideAuthMessage,
	authenticated
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)