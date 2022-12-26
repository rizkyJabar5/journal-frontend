import { Button, Card, Col, Row, Table, message, } from 'antd';
import React, { useEffect, useState, useCallback } from "react";
import AvatarStatus from 'components/shared-components/AvatarStatus';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { fetchAllProduct, deleteProduct } from 'redux/features/products';

const formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'IDR',
  maximumSignificantDigits:3
});

export const PRODUCTS = (props) => {
	const history = useHistory()
	const dispatch = useDispatch();
	const {
		list,
		selectedRows,
		filter: { q: searchTerm },
		loading: {
			query: loadingQuery,
			mutation: loadingMutation
		}
	} = useSelector(state => state.products)

	const deleteData = useCallback(async (id) => {
		try {
			const resp = await dispatch(deleteProduct(id)).unwrap()
			message.success(resp.message)
		} catch (error) {
			console.log(error)
			message.error(error?.message || 'Failed to delete data')
		}
	}, [dispatch])

	const params = {
		page: 1,
		limit: 30
	}

	const getData = useCallback(async () => {
		try {
			await dispatch(fetchAllProduct(params)).unwrap()
		} catch (error) {
			console.log(error)
			message.error(error?.message || 'Failed to fetch data')
		}
	}, [dispatch])

	useEffect(() => {
		getData()
	}, [])

	const tableColumns = [
		{
			title: 'ID Produk',
			dataIndex: 'productId',
			key: 'productId',
		},
		{
			title: 'Gambar',
			key: 'status',
			render: (_, record) => (
				<div className="text-center">
					<AvatarStatus size={60} type="square" src={record.picture} name={record.productName}/>
				</div>
			),
		},
		{
			title: 'Nama',
			dataIndex: 'productName',
			key: 'productName',
		},
		{
			title: 'Harga',
			dataIndex: 'price',
			key: 'price',
			render: (_, record) => (
				<div className="text-left">
					{formatter.format(record.price)}
				</div>
			),
		},
		{
			title: 'Category',
			dataIndex: 'categoryName',
			key: 'categoryName',
		},
		{
			title: () => <div className="text-center">Detail</div>,
			key: 'status',
			render: (_, record) => (
				<div className="text-center">
					<a type="primary" style={{ width: "70%" }} onClick={() => {
						history.push({
							pathname: '/app/detail-product',
							id: record.productId,
							isAddNew:false
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
						deleteData(record.productId)
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
						<h2>Daftar Produk</h2>
						<p>Daftar semua data yang tersedia.</p>
					</Col>)
				)}
			</Row>
			<Row gutter={24}>
				<Col xs={24} sm={24} md={24} lg={24}>
					<Card title="Daftar Semua Produk" >
						<Table
							className="no-border-last"
							columns={tableColumns}
							dataSource={list}
							rowKey='productId'
							pagination={{
								pageSize:10
							  }}
						/>
					</Card>
				</Col>
			</Row>
			<Row gutter={24}>
				<Col xs={24} sm={24} md={24} lg={24}>
				<Button type="primary" style={{width:"100%"}} onClick={()=>{
						history.push({
							pathname: '/app/detail-product',
							isAddNew:true
						})
					}}>Tambah Produk</Button>
				</Col>
			</Row>
		</>
	)
}


export default withRouter(PRODUCTS);
