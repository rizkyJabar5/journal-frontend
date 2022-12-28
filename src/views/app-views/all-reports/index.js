import { Button, Card, Col, Row, Table, message } from 'antd';
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import StatisticWidget from 'components/shared-components/StatisticWidget';
import { Area } from '@ant-design/plots';
import { fetchSumStore, fetchSumLedger, fetchExpenseSuppliers } from 'redux/features/reports';

const formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'IDR',
	maximumSignificantDigits: 3
});

export const REPORTS = () => {

	const [data, setData] = useState([]);

	//   const expense = useCallback(async (id) => {
	// 	try {
	// 		const resp = await dispatch(fetchExpenseSuppliers(id)).unwrap()
	// 		setData(resp)
	// 	} catch (error) {
	// 		console.log(error)
	// 		message.error(error?.message || 'Failed to delete data')
	// 	}
	// }, [dispatch])

	const dispatch = useDispatch();
	const {
		store,
		ledger,
		selectedRows,
		filter: { q: searchTerm },
		loading: {
			query: loadingQuery,
			mutation: loadingMutation
		}
	} = useSelector(state => state.reports)

	const getData = useCallback(async () => {
		try {
			await dispatch(fetchSumStore()).unwrap()
			await dispatch(fetchSumLedger()).unwrap()
			const resp = await dispatch(fetchExpenseSuppliers()).unwrap()
			setData(resp)
		} catch (error) {
			message.error(error?.message || 'Failed to fetch data')
		}
	}, [dispatch])

	useEffect(() => {
		getData()
		// asyncFetch()
	}, [])

	const config = {
		data,
		xField: 'date',
		yField: 'amount',
		xAxis: {
		  range: [0, 1],
		  tickCount: 30,
		},
		areaStyle: () => {
		  return {
			fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
		  };
		},
		slider: {
			start: 0.1,
			end: 0.9,
		  },
		// seriesField: 'date',
		smooth: true,
		// isStack: true,
		// meta:{
		// 	amount: {
		// 		min: 0,
		// 		max: 999
		// 	}
		// }
	  };

	return (
		<>
			{
				!loadingQuery && store && ledger && (
					<>
						<Row gutter={24}>
							<Col xs={24} sm={24} md={24} lg={24}>
								<h2>Summary</h2>
								<p>Daftar semua data yang tersedia.</p>
							</Col>
						</Row>
						<Row gutter={24}>
							<Col xs={24} sm={24} md={24} lg={24} xl={24}>
								<h2>Info Store</h2>
							</Col>
							<Col xs={24} sm={24} md={24} lg={24}>
								
								<Row gutter={16}>
									<Col xs={12} sm={12} md={12} lg={12} xl={12}>
										<StatisticWidget
											style={{ textAlign: "Left" }}
											title={'Total Products'}
											value={store.totalProducts}
										/>
									</Col>
									<Col xs={12} sm={12} md={12} lg={12} xl={12}>
										<StatisticWidget
											style={{ textAlign: "center" }}
											title={'Total Customers'}
											value={store.totalCustomers}
										/>
									</Col>								
								</Row>
							</Col>
						</Row>
						<Row gutter={24}>
							<Col xs={24} sm={24} md={24} lg={24} xl={24}>
								<h2>Debts & Receivables</h2>
							</Col>
							<Col xs={12} sm={12} md={12} lg={12} xl={12}>
								<StatisticWidget
									style={{ textAlign: "center" }}
									title={'Account Receiveable'}
									value={formatter.format(ledger.accountReceivable)}
								/>
								<StatisticWidget
									style={{ textAlign: "center" }}
									title={'Gross Sales Today'}
									value={formatter.format(store.grossSalesToday)}
								/>
							</Col>
							<Col xs={12} sm={12} md={12} lg={12} xl={12}>
								<StatisticWidget
									style={{ textAlign: "center" }}
									title={'Debt Store'}
									value={formatter.format(ledger.debtStore)}
								/>
								<StatisticWidget
									style={{ textAlign: "center" }}
									title={'Total Gross Sales'}
									value={formatter.format(ledger.totalGrossSales)}
								/>
							</Col>
										
										
										{/* <StatisticWidget
											style={{ textAlign: "center" }}
											title={'Total Expense'}
											value={formatter.format(ledger.totalExpense)}
										/>
										
										<StatisticWidget
											style={{ textAlign: "center" }}
											title={'Total Net Sales'}
											value={formatter.format(ledger.totalNetSales)}
										/>
										<StatisticWidget
											style={{ textAlign: "center" }}
											title={'Total Revenue'}
											value={formatter.format(ledger.totalRevenue)}
										/> */}
						</Row>
						<Row gutter={24}>
							<Col xs={12} sm={12} md={12} lg={12}>
								<StatisticWidget
											style={{ textAlign: "left" }}
											title={'Net Sales in Month'}
											value={<Area {...config} />}
										/>
									
							</Col>
							<Col xs={12} sm={12} md={12} lg={12}>
								<StatisticWidget
											style={{ textAlign: "left" }}
											title={'Expense in month'}
											value={<Area {...config} />}
										/>
									
							</Col>
						</Row>
						<Row gutter={24}>
							<Col xs={24} sm={24} md={24} lg={24}>
								<StatisticWidget
											style={{ textAlign: "left" }}
											title={'Total Revenue'}
											value={<Area {...config} />}
										/>
									
							</Col>
						</Row>
					</>
				)
			}
			{
				loadingQuery && 'Loading...'
			}
		</>
	)
}


export default withRouter(REPORTS);
