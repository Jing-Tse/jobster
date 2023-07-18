import styled from 'styled-components';
import FormRow from './FormRow';
import FormRowSelect from './FormRowSelect';
import { useDispatch, useSelector } from 'react-redux';
import {
  handleSearchValue,
  clearFilters,
} from '../features/allJobs/allJobsSlice';
import { useMemo, useState } from 'react';

const SearchFormContainer = () => {
  const [localSearch, setLocalSearch] = useState('');
  const dispatch = useDispatch();
  const {
    isLoading,
    status,
    statusOptions,
    type,
    typeOptions,
    sort,
    sortOptions,
  } = useSelector((store) => store.allJobs);

  const handleChange = (e) => {
    handleSearchValue({ name: e.target.name, value: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalSearch('');
    dispatch(clearFilters());
  };
  const debounce = () => {
    let timeoutId;
    return (e) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        dispatch(
          handleSearchValue({ name: e.target.name, value: e.target.value })
        );
      }, 1000);
    };
  };
  const optimizedDebounce = useMemo(() => debounce(), []);
  return (
    <Wrapper>
      <div className='form'>
        <h3>search form</h3>
        <form onSubmit={handleSubmit} className='form-center'>
          <FormRow
            type='text'
            name='search'
            value={localSearch}
            onChange={optimizedDebounce}
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
            name='type'
            value={type}
            options={typeOptions}
            onChange={handleChange}
            className='form-row'
          />
          <FormRowSelect
            name='sort'
            value={sort}
            options={sortOptions}
            onChange={handleChange}
            className='form-row'
          />
          <button className='btn-block btn btn-danger' disabled={isLoading}>
            clear filters
          </button>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form {
    width: 100%;
    max-width: 100%;
  }
  .form-input,
  .form-select,
  .btn-block {
    height: 35px;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 2rem;
    row-gap: 0.5rem;
  }
  h5 {
    font-weight: 700;
  }
  .btn-block {
    align-self: end;
    margin-top: 1rem;
  }
  @media (min-width: 768px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .btn-block {
      margin-top: 0;
    }
  }
`;

export default SearchFormContainer;
