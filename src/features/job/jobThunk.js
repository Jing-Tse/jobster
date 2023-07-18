import { checkAuthorizedWithResponse, customFetch } from '../../utiles/axios';
import { clearValues } from './jobSlice';

export const createJobThunk = async (job, thunkAPI) => {
  try {
    const resp = await customFetch.post('/jobs', job);
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    return checkAuthorizedWithResponse(error, thunkAPI);
  }
};
export const editJobThunk = async ({ jobId, job }, thunkAPI) => {
  try {
    const resp = await customFetch.patch(`/jobs/${jobId}`, job);
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    return checkAuthorizedWithResponse(error, thunkAPI);
  }
};
