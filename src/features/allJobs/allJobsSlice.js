import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { deleteJobThunk, getJobsThunk, getStatsThunk } from './allJobsThunk';
const searchState = {
  search: '',
  status: 'all',
  statusOptions: ['all', 'interview', 'declined', 'pending'],
  type: 'all',
  typeOptions: ['all', 'full-time', 'part-time', 'remote', 'internship'],
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};
const initialState = {
  isLoading: false,
  jobs: [],
  ...searchState,
  stats: {},
  numOfPages: 1,
  totalJobs: 0,
  page: 1,
  monthlyApplications: [],
};
export const getAllJobs = createAsyncThunk('allJobs/getAllJobs', getJobsThunk);
export const deleteJob = createAsyncThunk('allJobs/deleteJob', deleteJobThunk);
export const getStats = createAsyncThunk('allJobs/getStats', getStatsThunk);
const allJobsSlice = createSlice({
  name: 'allJobs',
  initialState,
  reducers: {
    handleSearchValue: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    clearFilters: (state) => {
      return { ...state, ...searchState };
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    toNextPage: (state, { payload }) => {
      if (state.page < payload) {
        state.page += 1;
        return;
      }
      state.page = 1;
    },
    toPrevPage: (state) => {
      if (state.page > 1) {
        state.page -= 1;
        return;
      }
      state.page = 8;
    },
    clearAllJobsState: () => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllJobs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.jobs = payload.jobs;
        state.numOfPages = payload.numOfPages;
        state.totalJobs = payload.totalJobs;
      })
      .addCase(getAllJobs.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(deleteJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteJob.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success(payload);
      })
      .addCase(deleteJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(getStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStats.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.stats = payload.defaultStats;
        state.monthlyApplications = payload.monthlyApplications;
      })
      .addCase(getStats.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});
export const {
  handleSearchValue,
  clearFilters,
  changePage,
  toNextPage,
  toPrevPage,
  clearAllJobsState,
} = allJobsSlice.actions;
export default allJobsSlice.reducer;
