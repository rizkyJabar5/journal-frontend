import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import URLS from 'redux/urls'
import request from 'redux/utils/request'
import { apiRequest } from 'redux/utils/api';

export const getStoreSum = async () =>
	apiRequest({
		path: `/summaries/store`,
		method: "GET",
	});

export const getLedgerSum = async () =>
	apiRequest({
		path: `/summaries/ledger`,
		method: "GET",
	});

export const fetchSumStore = createAsyncThunk(
	'Report/fetchSumStore',
	async (_, { rejectWithValue }) => {
		return await getStoreSum()
			.then((res) => {
				return res.data.data
			})
			.catch((err) => {
				return rejectWithValue(err)
			})
	}
)

export const fetchSumLedger = createAsyncThunk(
	'Report/fetchSumLedger',
	async (_, { rejectWithValue }) => {
		return await getLedgerSum()
			.then((res) => {
				return res.data.data
			})
			.catch((err) => {
				return rejectWithValue(err)
			})
	}
)


export const fetchAllReport = createAsyncThunk(
	'Report/fetchAllReport',
	async (_, { rejectWithValue }) => {
		try {
			const response = await request('get', URLS.Report)
			return response.data.Report
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

export const fetchOneReport = createAsyncThunk(
	'Report/fetchOneReport',
	async (id, { rejectWithValue }) => {
		try {
			const response = await request('get', `${URLS.Report}/${id}`)
			return response.data
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

export const updateReport = createAsyncThunk(
	'Report/updateReport',
	async (credentials, { rejectWithValue }) => {
		try {
			const response = await request('patch', `${URLS.Report}/${credentials.id}`, credentials)
			return response.data
		} catch (error) {
			console.log(error)
			return rejectWithValue(error)
		}
	}
)

export const deleteReport = createAsyncThunk(
	'Report/deleteReport',
	async (id, { rejectWithValue }) => {
		try {
			const response = await request('delete', `${URLS.Report}/${id}`)
			return response.data
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

const initialState = {
	loading: {
		query: false,
		mutation: false
	},
	filter: {
		q: ''
	},
	list: [],
	message: "",
	selected: {},
	selectedRows: [],
	store: [],
	ledger: []
}

const loadingReducer = (fieldName, status) => (state) => {
	state.loading[fieldName] = status
}

const startLoadingQuery = loadingReducer('query', true)
const stopLoadingQuery = loadingReducer('query', false)
const startLoadingMutation = loadingReducer('mutation', true)
const stopLoadingMutation = loadingReducer('mutation', false)

export const ReportSlice = createSlice({
	name: 'Report',
	initialState,
	reducers: {
		setAppliedSearchText: (state, action) => {
			state.filter.q = action.payload
		},
		setSelectedRows: (state, action) => {
			state.selectedRows = action.payload
		}
	},
	extraReducers: builder => {
		builder
			.addCase(fetchAllReport.pending, startLoadingQuery)
			.addCase(fetchAllReport.fulfilled, (state, action) => {
				state.list = action.payload
				state.loading.query = false
			})
			.addCase(fetchAllReport.rejected, stopLoadingQuery)

		builder
			.addCase(fetchSumStore.pending, startLoadingQuery)
			.addCase(fetchSumStore.fulfilled, (state, action) => {
				state.store = action.payload
				state.loading.query = false
			})
			.addCase(fetchSumStore.rejected, stopLoadingQuery)

		builder
			.addCase(fetchSumLedger.pending, startLoadingQuery)
			.addCase(fetchSumLedger.fulfilled, (state, action) => {
				state.ledger = action.payload
				state.loading.query = false
			})
			.addCase(fetchSumLedger.rejected, stopLoadingQuery)

		builder
			.addCase(fetchOneReport.pending, startLoadingQuery)
			.addCase(fetchOneReport.rejected, stopLoadingQuery)
			.addCase(fetchOneReport.fulfilled, (state, action) => {
				state.loading.query = false
				state.selected = action.payload
			})
		builder
			.addCase(updateReport.pending, startLoadingQuery)
			.addCase(updateReport.rejected, stopLoadingQuery)
			.addCase(updateReport.fulfilled, (state, action) => {
				state.loading.query = false
				state.selected = action.payload
				state.message = "Success"
			})

		builder
			.addCase(deleteReport.pending, startLoadingMutation)
			.addCase(deleteReport.fulfilled, stopLoadingMutation)
			.addCase(deleteReport.rejected, stopLoadingMutation)
	}
});


export const { setSelectedRows, setAppliedSearchText } = ReportSlice.actions;

export default ReportSlice.reducer;