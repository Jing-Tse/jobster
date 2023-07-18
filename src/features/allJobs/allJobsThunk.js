import { checkAuthorizedWithResponse, customFetch } from '../../utiles/axios';
import { getAllJobs } from './allJobsSlice';

export const getJobsThunk = async (_, thunkAPI) => {
  const { search, status, type, sort, page } = thunkAPI.getState().allJobs;
  let url = `/jobs?status=${status}&jobType=${type}&sort=${sort}&page=${page}`;
  if (search) {
    url = url + `&search=${search}`;
  }
  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error) {
    return checkAuthorizedWithResponse(error, thunkAPI);
  }
};
export const deleteJobThunk = async (jobId, thunkAPI) => {
  try {
    const resp = await customFetch.delete(`/jobs/${jobId}`);
    thunkAPI.dispatch(getAllJobs());
    return resp.data;
  } catch (error) {
    return checkAuthorizedWithResponse(error, thunkAPI);
  }
};
export const getStatsThunk = async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get('/jobs/stats');
    return resp.data;
  } catch (error) {
    return checkAuthorizedWithResponse(error, thunkAPI);
  }
};
