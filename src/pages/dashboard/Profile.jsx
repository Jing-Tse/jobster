import styled from 'styled-components';
import FormRow from '../../components/FormRow';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { updateUser } from '../../features/user/userSlice';
const Profile = () => {
  const { isLoading, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    name: user?.name || '',
    email: user?.email || '',
    location: user?.location || '',
    lastName: user?.lastName || '',
  });
  const { name, email, location, lastName } = values;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !location || !lastName) {
      toast.error('please fulfill all the fields!');
      return;
    }
    dispatch(updateUser(values));
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };
  return (
    <Wrapper>
      <h3>profile</h3>
      <form className='form form-center' onSubmit={handleSubmit}>
        <FormRow
          type='text'
          name='name'
          value={name}
          onChange={handleChange}
          className='form-row'
        />
        <FormRow
          type='text'
          labelText='last name'
          name='lastName'
          value={lastName}
          onChange={handleChange}
          className='form-row'
        />
        <FormRow
          type='email'
          name='email'
          value={email}
          onChange={handleChange}
          className='form-row'
        />
        <FormRow
          type='text'
          name='location'
          value={location}
          onChange={handleChange}
          className='form-row'
        />
        <button type='submit' className='btn' disabled={isLoading}>
          {isLoading ? 'please wait...' : 'save changes'}
        </button>
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
export default Profile;
