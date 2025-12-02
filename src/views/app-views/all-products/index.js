import { Button, Card, Col, Row, Table, message, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import React, { useEffect, useState, useCallback, useRef } from "react";
import AvatarStatus from 'components/shared-components/AvatarStatus';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { fetchAllProduct, deleteProduct } from 'redux/features/products';
import Highlighter from 'react-highlight-words';

const formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'IDR',
  maximumSignificantDigits:3
});

export const PRODUCTS = (props) => {
	const [searchText, setSearchText] = useState('');
	const [searchedColumn, setSearchedColumn] = useState('');
	const searchInput = useRef(null);
  
	const history = useHistory()
	const dispatch = useDispatch();
	const { list } = useSelector(state => state.products)

	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	  };

	const handleReset = (clearFilters) => {
		clearFilters();
		setSearchText('');
	};
	
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
	}, [dispatch, params])

	const deleteData = useCallback(async (id) => {
		try {
			await dispatch(deleteProduct(id)).unwrap()
			getData()
		} catch (error) {
			console.log(error)
			message.error(error?.message || 'Failed to delete data')
		}
	}, [dispatch, getData])

	useEffect(() => {
		getData()
	}, [getData])

	const getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
		  <div
			style={{
			  padding: 8,
			}}
			onKeyDown={(e) => e.stopPropagation()}
		  >
			<Input
			  ref={searchInput}
			  placeholder={`Search ${dataIndex}`}
			  value={selectedKeys[0]}
			  onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
			  onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
			  style={{
				marginBottom: 8,
				display: 'block',
			  }}
			/>
			<Space>
			  <Button
				type="primary"
				onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
				icon={<SearchOutlined />}
				size="small"
				style={{
				  width: 90,
				}}
			  >
				Search
			  </Button>
			  <Button
				onClick={() => clearFilters && handleReset(clearFilters)}
				size="small"
				style={{
				  width: 90,
				}}
			  >
				Reset
			  </Button>
			  <Button
				type="link"
				size="small"
				onClick={() => {
				  confirm({
					closeDropdown: false,
				  });
				  setSearchText(selectedKeys[0]);
				  setSearchedColumn(dataIndex);
				}}
			  >
				Filter
			  </Button>
			  <Button
				type="link"
				size="small"
				onClick={() => {
				  close();
				}}
			  >
				close
			  </Button>
			</Space>
		  </div>
		),
		filterIcon: (filtered) => (
		  <SearchOutlined
			style={{
			  color: filtered ? '#1890ff' : undefined,
			}}
		  />
		),
		onFilter: (value, record) =>
		  record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
		onFilterDropdownOpenChange: (visible) => {
		  if (visible) {
			setTimeout(() => searchInput.current?.select(), 100);
		  }
		},
		render: (text) =>
		  searchedColumn === dataIndex ? (
			<Highlighter
			  highlightStyle={{
				backgroundColor: '#ffc069',
				padding: 0,
			  }}
			  searchWords={[searchText]}
			  autoEscape
			  textToHighlight={text ? text.toString() : ''}
			/>
		  ) : (
			text
		  ),
	  });

	const tableColumns = [
		// {
		// 	title: 'ID Produk',
		// 	dataIndex: 'productId',
		// 	key: 'productId',
		// },
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
			sorter: (a, b) => a.productName.length - b.productName.length,
    		width: '26%',
			...getColumnSearchProps('productName'),
		},
		{
			title: 'Stok',
			dataIndex: 'stock',
			key: 'stock',
			sorter: (a, b) => a.stock - b.stock,
			render: (_, record) => (
				<div className="text-left">
					{record.stock || 0}
				</div>
			),
		},
		{
			title: 'Raw Material',
			dataIndex: 'material',
			key: 'material',
			sorter: (a, b) => a.material.length - b.material.length,
			width: '15%',
			render: (_, record) => (
				<div className="text-left">
					{record.material || 0}
				</div>
			),
		},
		{
			title: 'Harga Material',
			dataIndex: 'materialPrice',
			key: 'materialPrice',
			sorter: (a, b) => a.materialPrice - b.materialPrice,
			render: (_, record) => (
				<div className="text-left">
					{record.materialPrice || 0}
				</div>
			),
		},
		{
			title: 'Berat Produk',
			dataIndex: 'weight',
			key: 'weight',
			sorter: (a, b) => a.weight - b.weight,
			render: (_, record) => (
				<div className="text-left">
					{record.weight || 0}
				</div>
			),
		},
		{
			title: 'Harga Produk',
			dataIndex: 'price',
			key: 'price',
			sorter: (a, b) => a.price - b.price,
			render: (_, record) => (
				<div className="text-left">
					{formatter.format(record.price)}
				</div>
			),
		},
		{
			title: () => <div className="text-center">Detail</div>,
			key: 'status',
			render: (_, record) => (
				<div className="text-center">
					<button type="primary" style={{ width: "70%" }} onClick={() => {
						history.push({
							pathname: '/app/detail-product',
							id: record.productId,
							isAddNew:false
						})
					}} >Detail</button>
				</div>
			),
		},
		{
			title: () => <div className="text-center">Delete</div>,
			key: 'status',
			render: (_, record) => (
				<div className="text-center">
					<button style={{ width: "70%", color: 'red' }} onClick={() => {
						deleteData(record.productId)
					}} >Delete</button>
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
					(
					<Col xs={24} sm={24} md={24} lg={24}>
						<h2>Daftar Produk</h2>
						<Row gutter={24}>
							<Col xs={12} sm={12} md={12} lg={12}>
								<p>Daftar semua data yang tersedia.</p>
							</Col>
							{/* <Col xs={12} sm={12} md={12} lg={12}>
								<Search
            						placeholder="Search Product"
            						// onChange={getSearchValue}
           							onSearch={search}
            						enterButton
         							 />
							</Col> */}
						</Row>
					</Col>
					)
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
