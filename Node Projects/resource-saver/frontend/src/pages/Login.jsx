import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthState';
import ill from '../images/ill.svg';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  let from = location.state?.from?.pathname || '/';

  const { login, user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className='py-5 grid md:grid-cols-2 items-center gap-16'>
      <img src={ill} alt='ill' className='hidden md:block h-[60%]' />
      <form
        onSubmit={handleSubmit}
        className='bg-main p-6 rounded-md shadow-main'
      >
        <h1 className='text-2xl'>Login</h1>
        <div className='my-4'>
          <input
            type='email'
            name='email'
            placeholder='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border border-primary p-3 w-full rounded-md outline-none text-black'
          />
        </div>
        <div className='my-4'>
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='border border-primary p-3 w-full rounded-md outline-none text-black'
          />
        </div>
        <button
          disabled={loading}
          className={`bg-primary ${
            loading && 'opacity-40'
          } text-white px-5 py-2 rounded-md w-full`}
        >
          {loading ? 'Loading' : 'Login'}
        </button>
        <p className='mt-5 dark:text-gray-400 text-gray-500'>
          No account?{' '}
          <Link to='/register'>
            <span className='underline'>Register</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
