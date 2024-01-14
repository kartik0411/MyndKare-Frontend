import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//create action
export const createStudent = createAsyncThunk(
  "createStudent", // modify it to access the uploaded excel sheet
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      "http://localhost:9083/myndkare/v1/students",
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
export const showStudent = createAsyncThunk(
  "showStudent",
  async (args, { rejectWithValue }) => {
    const response = await fetch(
      "http://localhost:9083/myndkare/v1/allstudents",
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

export const showMBTIStudent = createAsyncThunk(
  "showStudent",
  async (args, { rejectWithValue }) => {
    const response = await fetch(
      "http://localhost:9083/myndkare/v1/students/mbti",
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
export const getStudentsCount = createAsyncThunk(
  "getStudentsCount",
  async (args, { rejectWithValue }) => {
    const response = await fetch(
      "http://localhost:9083/myndkare/v1/studentsCount",
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
export const deleteStudent = createAsyncThunk(
  "deleteStudent",
  async (id, { rejectWithValue }) => {
    const response = await fetch(
      `http://localhost:9083/myndkare/v1/students/${id}`,
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
export const editStudent = createAsyncThunk(
  "editStudent",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      `http://localhost:9083/myndkare/v1/students`,
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

export const studentSlice = createSlice({
  name: "studentDetail",
  initialState: {
    students: [],
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
    [createStudent.pending]: (state) => {
      state.loading = true;
    },
    [createStudent.fulfilled]: (state, action) => {
      state.loading = false;
      state.students.push(action.payload);
    },
    [createStudent.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [showStudent.pending]: (state) => {
      state.loading = true;
    },
    [showStudent.fulfilled]: (state, action) => {
      state.loading = false;
      state.students = action.payload;
    },
    [showStudent.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [deleteStudent.pending]: (state) => {
      state.loading = true;
    },
    [deleteStudent.fulfilled]: (state, action) => {
      state.loading = false;
      const { id } = action.payload;
      if (id) {
        state.students = state.students.filter((ele) => ele.id !== id);
      }
    },
    [deleteStudent.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [editStudent.pending]: (state) => {
      state.loading = true;
    },
    [editStudent.fulfilled]: (state, action) => {
      state.loading = false;
      state.students = state.students.map((ele) =>
        ele.id === action.payload.id ? action.payload : ele
      );
    },
    [editStudent.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default studentSlice.reducer;

export const { searchUser } = studentSlice.actions;