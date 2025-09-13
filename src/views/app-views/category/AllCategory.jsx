import { Button, Card, Col, Row, Table, message } from 'antd';
import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllCategory, deleteCategory } from '@/store/features/category';
import { WithRouter } from '@/component/WithRouter';

export const AllCategory = (props) => {
	const navigate = useNavigate()
	const dispatch = useDispatch();
	const { list } = useSelector(state => state.categories)

	const getData = useCallback(async () => {
		try {
			await dispatch(fetchAllCategory()).unwrap()
		} catch (error) {
			console.log(error)
			message.error(error?.message || 'Failed to fetch data')
		}
	}, [dispatch])

	const deleteData = useCallback(async (id) => {
		try {
			await dispatch(deleteCategory(id)).unwrap()
			getData()
		} catch (error) {
			console.log(error)
			message.error(error?.message || 'Failed to delete data')
		}
	}, [dispatch])

	useEffect(() => {
		getData()
	}, [getData])

	const tableColumns = [

		{
			title: 'ID Kategori',
			dataIndex: 'categoryId',
			key: 'categoryId',
		},
		{
			title: 'Nama',
			dataIndex: 'nameCategory',
			key: 'nameCategory',
			sorter: (a, b) => a.nameCategory.length - b.nameCategory.length,
		},
		{
			title: 'Deskripsi',
			dataIndex: 'description',
			key: 'description',
		},
		{
			title: () => <div className="text-center">Detail</div>,
			key: 'status',
			render: (_, record) => (
				<div className="text-center">
					<a style={{ width: "70%", color: 'blue' }} onClick={() => {
						navigate({
							pathname: '/app/detail-category',
							id: record.categoryId,
						})
					}} >Detail</a>
				</div>
			),
		},
		{
			title: () => <div className="text-center">Delete</div>,
			key: 'status',
			render: (_, record) => (
				<div className="text-center">
					<a style={{ width: "70%", color: 'red' }} onClick={() => {
						deleteData(record.categoryId)
					}} >Delete</a>
				</div>
			),
		},
	];

	return (
		<>
			<Row gutter={24}>
				{props.noTitle ? (
					<div></div>
				) : (
					(<Col xs={24} sm={24} md={24} lg={24}>
						<h2>Daftar Kategori</h2>
						<p>Daftar semua data yang tersedia.</p>
					</Col>)
				)}
			</Row>
			<Row gutter={24}>
				<Col xs={24} sm={24} md={24} lg={24}>
					<Card title="Daftar Semua Kategori" >
						<Table
							className="no-border-last"
							columns={tableColumns}
							dataSource={list}
							rowKey='categoryId'
							pagination={{
								pageSize: 8
							}}
						/>
					</Card>
				</Col>
			</Row>
			<Row gutter={24}>
				<Col xs={24} sm={24} md={24} lg={24}>
					<Button type="primary" style={{ width: "100%" }} onClick={() => {
						navigate({
							pathname: '/app/detail-category',
						})
					}}>Tambah Category</Button>
				</Col>
			</Row>
		</>
	)
}


export default WithRouter(CATEGORIES);
