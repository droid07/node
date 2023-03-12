import React, { useEffect, useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isError, isSuccess, user, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [message, isSuccess, isError, user, navigate, dispatch]);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { password, email } = formData;

  const onChange = (e) => {
    setFormData((preState) => ({
      ...preState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section>
        <h1>
          <FaSignInAlt />
          Login
        </h1>
        <p>Log in and start setting goals</p>
      </section>
      <section className='form'>
        <form onSubmit={handleRegister}>
          <div className='form-group'>
            <input
              className='form-control'
              type='email'
              id='email'
              name='email'
              value={email}
              onChange={onChange}
              placeholder='Enter your email'
            />
          </div>
          <div className='form-group'>
            <input
              className='form-control'
              type='password'
              id='password'
              name='password'
              value={password}
              onChange={onChange}
              placeholder='Enter your password'
            />
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
