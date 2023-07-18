import { styled } from 'styled-components';
import { FormRow, FormRowSelect } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  changeInput,
  clearValues,
  createJob,
  editJob,
} from '../../features/job/jobSlice';
import { useEffect } from 'react';
const AddJob = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    status,
    statusOptions,
    jobType,
    jobTypeOptions,
    isEditing,
    createId,
  } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(changeInput({ name, value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      toast.error('please fill in all the fields');
      return;
    }
    if (isEditing) {
      dispatch(
        editJob({
          jobId: createId,
          job: {
            position,
            company,
            jobLocation,
            jobType,
            status,
          },
        })
      );
      return;
    }
    dispatch(createJob({ position, company, jobLocation, jobType, status }));
  };
  useEffect(() => {
    if (!isEditing) {
      dispatch(changeInput({ name: 'jobLocation', value: user.location }));
    }
  }, []);
  return (
    <Wrapper>
      <h3>{isEditing ? 'edit job' : 'add job'}</h3>
      <form className='form form-center' onSubmit={handleSubmit}>
        <FormRow
          type='text'
          name='position'
          value={position}
          onChange={handleChange}
          className='form-row'
        />
        <FormRow
          type='text'
          name='company'
          value={company}
          onChange={handleChange}
          className='form-row'
        />
        <FormRow
          type='text'
          labelText='job location'
          name='jobLocation'
          value={jobLocation}
          onChange={handleChange}
          className='form-row'
        />
        <FormRowSelect
          name='status'
          value={status}
          options={statusOptions}
          onChange={handleChange}
          className='form-row'
        />
        <FormRowSelect
          name='jobType'
          labelText='job type'
          value={jobType}
          options={jobTypeOptions}
          onChange={handleChange}
          className='form-row'
        />
        <div className='btn-container'>
          <button
            type='button'
            className='btn clear-btn'
            disabled={isLoading}
            onClick={() => {
              dispatch(clearValues());
            }}
          >
            clear
          </button>
          <button type='submit' className='btn' disabled={isLoading}>
            {isLoading ? 'please wait...' : 'submit'}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 100%;
  background: var(--white);
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);
  h3 {
    margin-top: 0;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 0.5rem;
    button {
      height: 35px;
    }
  }
  .clear-btn {
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: var(--black);
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
    .btn-container {
      margin-top: 0;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .form-center button {
      margin-top: 0;
    }
  }
`;
export default AddJob;
