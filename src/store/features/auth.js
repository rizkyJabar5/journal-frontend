import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import URLS from '@/store/urls'
import request from '@/store/util/request'

const AUTH_TOKEN = 'auth_token'

export const login = createAsyncThunk(
	'auth/signIn',
	async (credentials) => {
    return await request('post', URLS.LOGIN, credentials)
	}
)

export const getUserProfile = createAsyncThunk(
	'auth/getUserProfile',
	async (data) => {
    return await request('get', `/users/${data}`)
	}
)

export const register = createAsyncThunk(
	'auth/register',
	async (data) => {
    return await request('post', URLS.REGISTER, data)
	}
)

export const sendActivation = createAsyncThunk(
	'auth/sendActivation',
	async (data) => {
    return await request('get', `${URLS.ACTIVATION}/${data.id}/${data.email}`)
	}
)
createAsyncThunk(
  'auth/storeGoogleAccountToken',
  async (tokenId) => {
    return await request('post', URLS.STORE_GOOGLE_ACCOUNT, { tokenId })
  }
);
export const resetPassword = createAsyncThunk(
	'auth/resetPassword',
	async (email, { rejectWithValue }) => {
		try {
      return await request('post', URLS.RESET_PASSWORD, { email })
		} catch(error) {
			return rejectWithValue(error)
		}
	}
)

export const resendActivation = createAsyncThunk(
	'auth/resendActivation',
	async (email, { rejectWithValue }) => {
		try {
      return await request('post', URLS.RESEND_ACTIVATION, { email })
		} catch(error) {
			return rejectWithValue(error)
		}
	}
)

const initialState = {
  loading: false,
  message: '',
  showMessage: false,
  redirect: '',
  token: localStorage.getItem(AUTH_TOKEN),
  user: {}
}

const loadingReducer = (status) => (state) => {
	state.loading = status
}

const startLoading = loadingReducer(true)
const stopLoading = loadingReducer(false)

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		authenticated: (state, action) => {
			state.loading = false;
			state.redirect = '/';
			state.token = action.payload.token;
			state.user = action.payload.user;
		},
		showAuthMessage: (state, action) => {
			state.message = action.payload;
			state.showMessage = true;
			state.loading = false;
		},
		hideAuthMessage: (state) => {
			state.message = '';
			state.showMessage = false;
		},
		signOutSuccess: (state) => {
			state.token = null;
			state.redirect = '/';
			state.loading = false;
			state.user = {};
		},
    showLoading: (state) => {
			state.loading = true;
		}
  },
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, startLoading)
			.addCase(register.fulfilled, stopLoading)
			.addCase(register.rejected, stopLoading)
		builder
			.addCase(sendActivation.pending, startLoading)
			.addCase(sendActivation.fulfilled, stopLoading)
			.addCase(sendActivation.rejected, stopLoading)
		builder
			.addCase(getUserProfile.pending, startLoading)
			.addCase(getUserProfile.fulfilled, (state, action) => {
				state.user = action.payload
			})
			.addCase(getUserProfile.rejected, stopLoading)
		builder
			.addCase(resetPassword.pending, startLoading)
			.addCase(resetPassword.fulfilled, stopLoading)
			.addCase(resetPassword.rejected, stopLoading)
		builder
			.addCase(resendActivation.pending, startLoading)
			.addCase(resendActivation.fulfilled, stopLoading)
			.addCase(resendActivation.rejected, stopLoading)
	}
});

export const {
	authenticated,
	showAuthMessage,
	hideAuthMessage,
	signOutSuccess,
  showLoading
} = authSlice.actions;

export default authSlice.reducer;