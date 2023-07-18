import styled from 'styled-components';
import StatsItem from './StatsItem';
import { useSelector } from 'react-redux';
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';
const StatsContainer = () => {
  const { stats } = useSelector((store) => store.allJobs);
  const { declined, interview, pending } = stats;
  const defaultStats = [
    {
      title: 'pending applications',
      count: pending || 0,
      icon: <FaSuitcaseRolling />,
      color: '#e9b949',
      bgc: '#fcefc7',
    },
    {
      title: 'interviews scheduled',
      count: interview || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bgc: '#e0e8f9',
    },
    {
      title: 'jobs declined',
      count: declined || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      bgc: '#ffeeee',
    },
  ];

  return (
    <Wrapper>
      {defaultStats.map((stat, index) => {
        return <StatsItem key={index} {...stat} />;
      })}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  row-gap: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }
  @media (min-width: 1120px) {
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 1rem;
  }
`;
export default StatsContainer;
