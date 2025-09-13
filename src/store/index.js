import { configureStore } from '@reduxjs/toolkit'
import themeReducer from '@/store/features/theme'
import authReducer from '@/store/features/auth'
import productsReducer from '@/store/features/products'
import supplierReducer from '@/store/features/suppliers'
import expenseReducer from '@/store/features/expenses'
import reportReducer from '@/store/features/reports'
import customerReducer from '@/store/features/customers'
import orderReducer from '@/store/features/orders'
import categoriesReducer from '@/store/features/category'
import purchaseReducer from '@/store/features/purchase'
import userReducer from '@/store/features/user'

const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    products:productsReducer,
    orders:orderReducer,
    customers:customerReducer,
    purchases:purchaseReducer,
    reports:reportReducer,
    suppliers:supplierReducer,
    expenses:expenseReducer,
    categories:categoriesReducer,
    user:userReducer,
  }
});

export default store;

