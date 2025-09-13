import { Button, Card, Col, Row, Table, message } from 'antd';
import { WithRouter } from '@/component/WithRouter';
import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllUser } from '@/store/features/user';

export const AllUser = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch();
	const { list } = useSelector(state => state.user)

	const getData = useCallback(async () => {
		try {
			await dispatch(fetchAllUser()).unwrap()
			console.log(list)
		} catch (error) {
			message.error(error?.message || 'Failed to fetch data')
		}
	}, [dispatch])

	useEffect(() => {
		getData()
	}, [])

	const tableColumns = [
		{
			title: 'User ID',
			dataIndex: 'userId',
			key: 'userId',
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'Username',
			dataIndex: 'username',
			key: 'username',
		},
		{
			title: 'Full Name',
			dataIndex: 'fullName',
			key: 'fullName',
		},
		{
			title: () => <div className="text-center">Join Date</div>,
			key: 'status',
			render: (_, record) => (
				<div className="text-center">
					{
						new Date(record.joinDate).toDateString()
					}
				</div>
			),
		},
		{
			title: () => <div className="text-center">Authority</div>,
			key: 'status',
			render: (_, record) => (
				<div className="text-center">
					{
						record.authorities.map((item, index) => {
							return <div key={index}> {item.authority}</div>
						})
					}
				</div>
			),
		},
	];

	return (
		<>
			<Row gutter={24}>
				<Col xs={24} sm={24} md={24} lg={24}>
					<h2>Daftar Pengguna</h2>
					<p>Daftar semua data yang tersedia.</p>
				</Col>
			</Row>
			<Row gutter={24}>
				<Col xs={24} sm={24} md={24} lg={24}>
					<Card title="Daftar Semua Pengguna" >
						<Table
							className="no-border-last"
							columns={tableColumns}
							dataSource={list}
							rowKey='userId'
							pagination={false}
						/>
					</Card>
				</Col>
			</Row>
			<Row gutter={24}>
				<Col xs={24} sm={24} md={24} lg={24}>
					<Button type="primary" style={{ width: "100%" }} onClick={() => {
						navigate({
							pathname: '/app/user',
							isAddNew: true
						})
					}}>Tambah Pengguna</Button>
				</Col>
			</Row>
		</>
	)
}

export default WithRouter(AllUser);
