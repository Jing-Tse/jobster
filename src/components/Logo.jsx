import logo from '../assets/images/logo.svg';
import { styled } from 'styled-components';
const Logo = () => {
  return (
    <Wrapper>
      <img src={logo} alt='logo' className='logo' />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .logo {
    width: 13rem;
  }
`;
export default Logo;
