import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//create action
export const createDBDA = createAsyncThunk(
  "createDBDA", // modify it to access the uploaded excel sheet
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      "http://localhost:9083/myndkare/v1/dbda",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


//read action
export const showDBDA = createAsyncThunk(
  "showDBDA",
  async (args, { rejectWithValue }) => {
    const response = await fetch(
      "http://localhost:9083/myndkare/v1/dbda",
      { method: "GET" }
    );

    try {
      const result = await response.json();
      console.log(result)
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
//delete action
export const deleteDBDA = createAsyncThunk(
  "deleteDBDA",
  async (id, { rejectWithValue }) => {
    const response = await fetch(
      `http://localhost:9083/myndkare/v1/dbda/${id}`,
      { method: "DELETE" }
    );

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//update action
export const editDBDA = createAsyncThunk(
  "editDBDA",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      `http://localhost:9083/myndkare/v1/dbda`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const dbdaSlice = createSlice({
  name: "dbdaDetail",
  initialState: {
    dbdas: [],
    loading: false,
    error: null,
    searchData: [],
  },

  reducers: {
    searchUser: (state, action) => {
      state.searchData = action.payload;
    },
  },

  extraReducers: {
    [createDBDA.pending]: (state) => {
      state.loading = true;
    },
    [createDBDA.fulfilled]: (state, action) => {
      state.loading = false;
      state.dbdas.push(action.payload);
    },
    [createDBDA.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [showDBDA.pending]: (state) => {
      state.loading = true;
    },
    [showDBDA.fulfilled]: (state, action) => {
      state.loading = false;
      state.dbdas = action.payload;
    },
    [showDBDA.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [deleteDBDA.pending]: (state) => {
      state.loading = true;
    },
    [deleteDBDA.fulfilled]: (state, action) => {
      state.loading = false;
      const { id } = action.payload;
      if (id) {
        state.dbdas = state.dbdas.filter((ele) => ele.id !== id);
      }
    },
    [deleteDBDA.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [editDBDA.pending]: (state) => {
      state.loading = true;
    },
    [editDBDA.fulfilled]: (state, action) => {
      state.loading = false;
      state.dbdas = state.dbdas.map((ele) =>
        ele.id === action.payload.id ? action.payload : ele
      );
    },
    [editDBDA.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default dbdaSlice.reducer;

export const { searchUser } = dbdaSlice.actions;