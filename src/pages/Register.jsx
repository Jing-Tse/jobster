import styled from 'styled-components';
import { FormRow, Logo } from '../components';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading } = useSelector((store) => store.user);
  const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
  };
  const [values, setValues] = useState(initialState);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if ((!isMember && !name) || !email || !password) {
      toast.error('fill in all fields please');
      return;
    }
    if (isMember) {
      dispatch(loginUser({ password, email }));
      return;
    }
    dispatch(registerUser({ name, password, email }));
  };
  const toggle = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);
  return (
    <Wrapper className='full-page'>
      <div>
        <form className='form' onSubmit={handleSubmit}>
          <Logo className='logo' />
          <h3>{values.isMember ? 'login' : 'register'}</h3>
          {!values.isMember && (
            <FormRow
              type='text'
              name='name'
              value={values.name}
              onChange={handleChange}
            />
          )}
          <FormRow
            type='email'
            name='email'
            value={values.email}
            onChange={handleChange}
          />
          <FormRow
            type='password'
            name='password'
            value={values.password}
            onChange={handleChange}
          />
          <button type='submit' className='btn btn-block' disabled={isLoading}>
            {isLoading ? 'loading..' : 'submit'}
          </button>
          <button
            type='button'
            className='btn btn-block btn-hipster'
            onClick={() =>
              dispatch(
                loginUser({ email: 'testUser@test.com', password: 'secret' })
              )
            }
          >
            demo app
          </button>
          <p>
            {values.isMember ? 'Not a member yet?' : 'Already a member?'}
            <button type='button' className='member-btn' onClick={toggle}>
              {values.isMember ? 'Register' : 'Login'}
            </button>
          </p>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }

  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
`;
export default Register;
