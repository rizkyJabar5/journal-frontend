import { Button, Card, Col, Row, Table, message } from 'antd';
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import StatisticWidget from 'components/shared-components/StatisticWidget';
import { fetchSumStore, fetchSumLedger } from 'redux/features/reports';

const formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'IDR',
	maximumSignificantDigits: 3
});

export const REPORTS = () => {

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
		} catch (error) {
			message.error(error?.message || 'Failed to fetch data')
		}
	}, [dispatch])

	useEffect(() => {
		getData()
	}, [])

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
							<Col xs={24} sm={24} md={24} lg={24}>
								<Row gutter={16}>
									<Col xs={24} sm={24} md={24} lg={12} xl={12}>
										<Row gutter={12} justify='center'>
											<h2>Store Summary</h2>
										</Row>
										<StatisticWidget
											style={{ textAlign: "center" }}
											title={'Total Products'}
											value={store.totalProducts}
										/>
										<StatisticWidget
											style={{ textAlign: "center" }}
											title={'Gross Sales Today'}
											value={formatter.format(store.grossSalesToday)}
										/>
										<StatisticWidget
											style={{ textAlign: "center" }}
											title={'Total Customers'}
											value={store.totalCustomers}
										/>
										<StatisticWidget
											style={{ textAlign: "center" }}
											title={'Total Products'}
											value={store.totalProducts}
										/>
									</Col>
									<Col xs={24} sm={24} md={24} lg={12} xl={12}>
										<Row gutter={12} justify='center'>
											<h2>Ledger Summary</h2>
										</Row>
										<StatisticWidget
											style={{ textAlign: "center" }}
											title={'Account Receiveable'}
											value={formatter.format(ledger.accountReceivable)}
										/>
										<StatisticWidget
											style={{ textAlign: "center" }}
											title={'Debt Store'}
											value={formatter.format(ledger.debtStore)}
										/>
										<StatisticWidget
											style={{ textAlign: "center" }}
											title={'Total Expense'}
											value={formatter.format(ledger.totalExpense)}
										/>
										<StatisticWidget
											style={{ textAlign: "center" }}
											title={'Total Gross Sales'}
											value={formatter.format(ledger.totalGrossSales)}
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
										/>
									</Col>
								</Row>
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
