import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//create action
export const createTest = createAsyncThunk(
  "createTest", // modify it to access the uploaded excel sheet
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      "https://myndkare-backend.onrender.com/myndkare/v1/tests",
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
export const showTest = createAsyncThunk(
  "showTest",
  async (args, { rejectWithValue }) => {
    const response = await fetch(
      "https://myndkare-backend.onrender.com/myndkare/v1/tests",
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
export const deleteTest = createAsyncThunk(
  "deleteTest",
  async (id, { rejectWithValue }) => {
    const response = await fetch(
      `https://myndkare-backend.onrender.com/myndkare/v1/tests/${id}`,
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
export const editTest = createAsyncThunk(
  "editTest",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      `https://myndkare-backend.onrender.com/myndkare/v1/tests`,
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

export const testSlice = createSlice({
  name: "testDetail",
  initialState: {
    tests: [],
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
    [createTest.pending]: (state) => {
      state.loading = true;
    },
    [createTest.fulfilled]: (state, action) => {
      state.loading = false;
      state.tests.push(action.payload);
    },
    [createTest.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [showTest.pending]: (state) => {
      state.loading = true;
    },
    [showTest.fulfilled]: (state, action) => {
      state.loading = false;
      state.tests = action.payload;
    },
    [showTest.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [deleteTest.pending]: (state) => {
      state.loading = true;
    },
    [deleteTest.fulfilled]: (state, action) => {
      state.loading = false;
      const { id } = action.payload;
      if (id) {
        state.tests = state.tests.filter((ele) => ele.id !== id);
      }
    },
    [deleteTest.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [editTest.pending]: (state) => {
      state.loading = true;
    },
    [editTest.fulfilled]: (state, action) => {
      state.loading = false;
      state.tests = state.tests.map((ele) =>
        ele.id === action.payload.id ? action.payload : ele
      );
    },
    [editTest.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default testSlice.reducer;

export const { searchUser } = testSlice.actions;