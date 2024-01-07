import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//create action
export const createMBTI = createAsyncThunk(
  "createMBTI", // modify it to access the uploaded excel sheet
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      "http://localhost:9083/myndkare/v1/mbti",
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
export const showMBTI = createAsyncThunk(
  "showMBTI",
  async (args, { rejectWithValue }) => {
    const response = await fetch(
      "http://localhost:9083/myndkare/v1/mbti",
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

//read action
export const getMBTIsCount = createAsyncThunk(
  "getMBTIsCount",
  async (args, { rejectWithValue }) => {
    const response = await fetch(
      "http://localhost:9083/myndkare/v1/mbtiCount",
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
export const deleteMBTI = createAsyncThunk(
  "deleteMBTI",
  async (id, { rejectWithValue }) => {
    const response = await fetch(
      `http://localhost:9083/myndkare/v1/mbti/${id}`,
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
export const editMBTI = createAsyncThunk(
  "editMBTI",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      `http://localhost:9083/myndkare/v1/mbti`,
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

export const mbtiSlice = createSlice({
  name: "mbtiDetail",
  initialState: {
    mbtis: [],
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
    [createMBTI.pending]: (state) => {
      state.loading = true;
    },
    [createMBTI.fulfilled]: (state, action) => {
      state.loading = false;
      state.mbtis.push(action.payload);
    },
    [createMBTI.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [showMBTI.pending]: (state) => {
      state.loading = true;
    },
    [showMBTI.fulfilled]: (state, action) => {
      state.loading = false;
      state.mbtis = action.payload;
    },
    [showMBTI.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [deleteMBTI.pending]: (state) => {
      state.loading = true;
    },
    [deleteMBTI.fulfilled]: (state, action) => {
      state.loading = false;
      const { id } = action.payload;
      if (id) {
        state.mbtis = state.mbtis.filter((ele) => ele.id !== id);
      }
    },
    [deleteMBTI.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [editMBTI.pending]: (state) => {
      state.loading = true;
    },
    [editMBTI.fulfilled]: (state, action) => {
      state.loading = false;
      state.mbtis = state.mbtis.map((ele) =>
        ele.id === action.payload.id ? action.payload : ele
      );
    },
    [editMBTI.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default mbtiSlice.reducer;

export const { searchUser } = mbtiSlice.actions;