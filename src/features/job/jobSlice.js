import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserFromLocalStorage } from '../../utiles/localStorage';
import { toast } from 'react-toastify';
import { createJobThunk, editJobThunk } from './jobThunk';

const initialState = {
  isLoading: false,
  position: '',
  company: '',
  jobLocation: '',
  status: 'pending',
  statusOptions: ['pending', 'declined', 'interview'],
  jobType: 'full-time',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  isEditing: false,
  createId: '',
};
export const createJob = createAsyncThunk('job/createJob', createJobThunk);
export const editJob = createAsyncThunk('job/editJob', editJobThunk);
const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    changeInput: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValues: () => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || '',
      };
    },
    editJobValue: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success('job added!');
      })
      .addCase(createJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(editJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editJob.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success('job edited!');
      })
      .addCase(editJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});
export default jobSlice.reducer;
export const { changeInput, clearValues, editJobValue } = jobSlice.actions;
