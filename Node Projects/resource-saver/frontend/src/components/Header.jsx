import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthState';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className='bg-main text-white md:px-36 p-5 flex items-center justify-between'>
      <Link to='/'>
        <h1 className='text-xl'>ResourceSaver</h1>
      </Link>
      {!user ? (
        <ul className='flex items-center gap-5'>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/register'>Register</Link>
          </li>
        </ul>
      ) : (
        <ul className='flex gap-2'>
          <li className='underline'>Hello, {user?.user?.name}</li>
          <li className='cursor-pointer' onClick={logout}>
            Logout
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Header;
