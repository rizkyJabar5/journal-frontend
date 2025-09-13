import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import URLS from "@/store/urls";
import request from "@/store/util/request";

// -------------------
// Async thunks
// -------------------
export const fetchAllSupplier = createAsyncThunk(
  "Supplier/fetchAllSupplier",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await request("get", URLS.SUPPLIER);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchOneSupplier = createAsyncThunk(
  "Supplier/fetchOneSupplier",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await request("get", `${URLS.SUPPLIER}/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateSupplier = createAsyncThunk(
  "Supplier/updateSupplier",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await request(
        "patch",
        `${URLS.SUPPLIER}/${credentials.id}`,
        credentials
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createSupplier = createAsyncThunk(
  "Supplier/createSupplier",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await request(
        "post",
        `${URLS.SUPPLIER}/add-supplier`,
        credentials
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteSupplier = createAsyncThunk(
  "Supplier/deleteSupplier",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await request("delete", `${URLS.SUPPLIER}/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// -------------------
// Initial state
// -------------------
const initialState = {
  loading: {
    query: false,
    mutation: false,
  },
  filter: {
    q: "",
  },
  list: [],
  message: "",
  selected: {},
  selectedRows: [],
};

// -------------------
// Slice
// -------------------
const SupplierSlice = createSlice({
  name: "Supplier",
  initialState,
  reducers: {
    setAppliedSearchText: (state, action) => {
      state.filter.q = action.payload;
    },
    setSelectedRows: (state, action) => {
      state.selectedRows = action.payload;
    },
    resetMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    const setLoading = (field, value) => (state) => {
      state.loading[field] = value;
    };

    builder
      // fetchAllSupplier
      .addCase(fetchAllSupplier.pending, setLoading("query", true))
      .addCase(fetchAllSupplier.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading.query = false;
      })
      .addCase(fetchAllSupplier.rejected, setLoading("query", false))

      // fetchOneSupplier
      .addCase(fetchOneSupplier.pending, setLoading("query", true))
      .addCase(fetchOneSupplier.fulfilled, (state, action) => {
        state.selected = action.payload;
        state.loading.query = false;
      })
      .addCase(fetchOneSupplier.rejected, setLoading("query", false))

      // updateSupplier
      .addCase(updateSupplier.pending, setLoading("mutation", true))
      .addCase(updateSupplier.fulfilled, (state, action) => {
        state.selected = action.payload;
        state.message = "Success";
        state.loading.mutation = false;
      })
      .addCase(updateSupplier.rejected, setLoading("mutation", false))

      // createSupplier
      .addCase(createSupplier.pending, setLoading("mutation", true))
      .addCase(createSupplier.fulfilled, (state, action) => {
        state.selected = action.payload;
        state.message = "Success";
        state.loading.mutation = false;
      })
      .addCase(createSupplier.rejected, setLoading("mutation", false))

      // deleteSupplier
      .addCase(deleteSupplier.pending, setLoading("mutation", true))
      .addCase(deleteSupplier.fulfilled, setLoading("mutation", false))
      .addCase(deleteSupplier.rejected, setLoading("mutation", false));
  },
});

// -------------------
// Exports
// -------------------
export const {
  setSelectedRows,
  setAppliedSearchText,
  resetMessage,
} = SupplierSlice.actions;

export default SupplierSlice.reducer;
