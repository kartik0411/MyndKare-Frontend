import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//create action
export const createStudentTest = createAsyncThunk(
  "createStudentTest", // modify it to access the uploaded excel sheet
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      "http://localhost:9083/myndkare/v1/studentTests",
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
export const showStudentTest = createAsyncThunk(
  "showStudentTest",
  async (id, { rejectWithValue }) => {
    const response = await fetch(
      `http://localhost:9083/myndkare/v1/studentExams/${id}`,
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

export const showoneStudentTest = createAsyncThunk(
  "showoneStudentTest",
  async (id, { rejectWithValue }) => { 
    const response = await fetch(
      `http://localhost:9083/myndkare/v1/studentTests/${id}`,
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
export const getStudentTestsCount = createAsyncThunk(
  "getStudentTestsCount",
  async (args, { rejectWithValue }) => {
    const response = await fetch(
      "http://localhost:9083/myndkare/v1/studentTestsCount",
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
export const deleteStudentTest = createAsyncThunk(
  "deleteStudentTest",
  async (id, { rejectWithValue }) => {
    const response = await fetch(
      `http://localhost:9083/myndkare/v1/studentTests/${id}`,
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
export const editStudentTest = createAsyncThunk(
  "editStudentTest",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      `http://localhost:9083/myndkare/v1/studentTests`,
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

export const studentTestSlice = createSlice({
  name: "studentTestDetail",
  initialState: {
    studentTests: [],
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
    [createStudentTest.pending]: (state) => {
      state.loading = true;
    },
    [createStudentTest.fulfilled]: (state, action) => {
      state.loading = false;
      state.studentTests.push(action.payload);
    },
    [createStudentTest.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [showStudentTest.pending]: (state) => {
      state.loading = true;
    },
    [showStudentTest.fulfilled]: (state, action) => {
      state.loading = false;
      state.studentTests = action.payload;
    },
    [showStudentTest.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },


    [showoneStudentTest.pending]: (state) => {
      state.loading = true;
    },
    [showoneStudentTest.fulfilled]: (state, action) => {
      state.loading = false;
      state.studentTests = action.payload;
    },
    [showoneStudentTest.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [deleteStudentTest.pending]: (state) => {
      state.loading = true;
    },
    [deleteStudentTest.fulfilled]: (state, action) => {
      state.loading = false;
      const { id } = action.payload;
      if (id) {
        state.studentTests = state.studentTests.filter((ele) => ele.id !== id);
      }
    },
    [deleteStudentTest.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [editStudentTest.pending]: (state) => {
      state.loading = true;
    },
    [editStudentTest.fulfilled]: (state, action) => {
      state.loading = false;
      state.studentTests = state.studentTests.map((ele) =>
        ele.id === action.payload.id ? action.payload : ele
      );
    },
    [editStudentTest.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default studentTestSlice.reducer;

export const { searchUser } = studentTestSlice.actions;