import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//create action
export const createQuestion = createAsyncThunk(
  "createQuestion", // modify it to access the uploaded excel sheet
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      "http://localhost:9083/myndkare/v1/questions",
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
export const showQuestions = createAsyncThunk(
  "showQuestions",
  async (args, { rejectWithValue }) => {
    const response = await fetch(
      "http://localhost:9083/myndkare/v1/questions",
      { method: "GET" }
    );

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
//delete action
export const deleteQuestion = createAsyncThunk(
  "deleteQuestion",
  async (_id, { rejectWithValue }) => {
    const response = await fetch(
      `http://localhost:9083/myndkare/v1/questions/${_id}`,
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
export const editQuestion = createAsyncThunk(
  "editQuestion",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      `http://localhost:9083/myndkare/v1/questions`,
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

export const questionSlice = createSlice({
  name: "questionDetail",
  initialState: {
    questions: [],
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
    [createQuestion.pending]: (state) => {
      state.loading = true;
    },
    [createQuestion.fulfilled]: (state, action) => {
      state.loading = false;
      state.questions.push(action.payload);
    },
    [createQuestion.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [showQuestions.pending]: (state) => {
      state.loading = true;
    },
    [showQuestions.fulfilled]: (state, action) => {
      state.loading = false;
      state.questions = action.payload;
    },
    [showQuestions.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [deleteQuestion.pending]: (state) => {
      state.loading = true;
    },
    [deleteQuestion.fulfilled]: (state, action) => {
      state.loading = false;
      const { id } = action.payload;
      if (id) {
        state.questions = state.questions.filter((ele) => ele.id !== id);
      }
    },
    [deleteQuestion.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [editQuestion.pending]: (state) => {
      state.loading = true;
    },
    [editQuestion.fulfilled]: (state, action) => {
      state.loading = false;
      state.questions = state.questions.map((ele) =>
        ele.id === action.payload.id ? action.payload : ele
      );
    },
    [editQuestion.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default questionSlice.reducer;

export const { searchUser } = questionSlice.actions;