import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import goalService from './goalsService';

const initialState = {
  goals: [],
  isLoading: true,
  isError: true,
  isSuccess: false,
  message: '',
};

export const addGoals = createAsyncThunk(
  'goals/getAll',
  async (goalData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.addGoals(goalData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getGoals = createAsyncThunk(
  'goals/create',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.getGoals(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateGoals = createAsyncThunk(
  'goals/update',
  async (id, goalData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.updateGoals(id, goalData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteGoals = createAsyncThunk(
  'goals/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.deleteGoals(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.goals = action.payload;
        state.isSuccess = true;
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.goals = [...state.goals, action.payload];
        state.isSuccess = true;
      })
      .addCase(addGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.goals = state.goals.map((goal) =>
          goal._id === action.payload.id ? action.payload : goal
        );
        state.isSuccess = true;
      })
      .addCase(updateGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.goals = state.goals.filter((goal) => goal._id !== action.payload);
        state.isSuccess = true;
      })
      .addCase(deleteGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = goalsSlice.actions;
export default goalsSlice.reducer;
