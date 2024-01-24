import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//create action
export const createDBDAScore = createAsyncThunk(
  "createDBDAScore", // modify it to access the uploaded excel sheet
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      "https://myndkare-backend.onrender.com/myndkare/v1/dbdaScore",
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
export const showDBDAScore = createAsyncThunk(
  "showDBDAScore",
  async (args, { rejectWithValue }) => {
    const response = await fetch(
      "https://myndkare-backend.onrender.com/myndkare/v1/dbdaScore",
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
export const getDBDAScoresCount = createAsyncThunk(
  "getDBDAScoresCount",
  async (args, { rejectWithValue }) => {
    const response = await fetch(
      "https://myndkare-backend.onrender.com/myndkare/v1/dbdaScoresCount",
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
export const deleteDBDAScore = createAsyncThunk(
  "deleteDBDAScore",
  async (id, { rejectWithValue }) => {
    const response = await fetch(
      `https://myndkare-backend.onrender.com/myndkare/v1/dbdaScores/${id}`,
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
export const editDBDAScore = createAsyncThunk(
  "editDBDAScore",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      `https://myndkare-backend.onrender.com/myndkare/v1/dbdaScore`,
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

export const dbdaScoreSlice = createSlice({
  name: "dbdaScoreDetail",
  initialState: {
    dbdaScores: [],
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
    [createDBDAScore.pending]: (state) => {
      state.loading = true;
    },
    [createDBDAScore.fulfilled]: (state, action) => {
      state.loading = false;
      state.dbdaScores.push(action.payload);
    },
    [createDBDAScore.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [showDBDAScore.pending]: (state) => {
      state.loading = true;
    },
    [showDBDAScore.fulfilled]: (state, action) => {
      state.loading = false;
      state.dbdaScores = action.payload;
    },
    [showDBDAScore.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [deleteDBDAScore.pending]: (state) => {
      state.loading = true;
    },
    [deleteDBDAScore.fulfilled]: (state, action) => {
      state.loading = false;
      const { id } = action.payload;
      if (id) {
        state.dbdaScores = state.dbdaScores.filter((ele) => ele.id !== id);
      }
    },
    [deleteDBDAScore.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [editDBDAScore.pending]: (state) => {
      state.loading = true;
    },
    [editDBDAScore.fulfilled]: (state, action) => {
      state.loading = false;
      state.dbdaScores = state.dbdaScores.map((ele) =>
        ele.id === action.payload.id ? action.payload : ele
      );
    },
    [editDBDAScore.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default dbdaScoreSlice.reducer;

export const { searchUser } = dbdaScoreSlice.actions;