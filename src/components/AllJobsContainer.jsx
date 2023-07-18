import { useDispatch, useSelector } from 'react-redux';
import JobContainer from './JobContainer';
import PageBtnContainer from './PageBtnContainer';
import styled from 'styled-components';
import Loading from './Loading';
import { useEffect } from 'react';
import { getAllJobs } from '../features/allJobs/allJobsSlice';
const AllJobsContainer = () => {
  const {
    jobs,
    isLoading,
    totalJobs,
    numOfPages,
    search,
    status,
    type,
    sort,
    page,
  } = useSelector((store) => store.allJobs);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllJobs());
  }, [search, status, type, sort, page]);
  if (isLoading) {
    return <Loading center />;
  }
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalJobs} {totalJobs > 1 ? 'jobs' : 'job'} found
      </h5>
      <div className='jobs'>
        {jobs.map((job) => {
          return <JobContainer key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }
  .jobs {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  @media (min-width: 992px) {
    .jobs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }
`;

export default AllJobsContainer;
