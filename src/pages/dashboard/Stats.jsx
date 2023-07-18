import { useEffect } from 'react';
import { ChartsContainer, StatsContainer } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { getStats } from '../../features/allJobs/allJobsSlice';
import Loading from '../../components/Loading';

const Stats = () => {
  const { isLoading, monthlyApplications } = useSelector(
    (store) => store.allJobs
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStats());
  }, []);
  if (isLoading) {
    <Loading />;
  }
  return (
    <main>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </main>
  );
};
export default Stats;
