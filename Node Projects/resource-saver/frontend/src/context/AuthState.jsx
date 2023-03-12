import { createContext, useEffect, useState } from 'react';
import { baseURL } from '../services/base';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

const AuthState = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  // Register user
  const register = async (user) => {
    setLoading(true);
    const res = await fetch(`${baseURL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (res.ok) {
      setLoading(false);
      setUser(data.user);
    } else {
      setLoading(false);
      toast.error(data.message, {
        position: 'top-center',
        theme: 'colored',
      });
    }
  };

  // Login user
  const login = async (user) => {
    setLoading(true);
    const res = await fetch(`${baseURL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (res.ok) {
      setLoading(false);
      setUser(data.user);
    } else {
      setLoading(false);
      toast.error(data.message, {
        position: 'top-center',
        theme: 'colored',
      });
    }
  };

  // Logout user
  const logout = async () => {
    const res = await fetch(`${baseURL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    if (res.ok) {
      setUser(null);
    }
  };

  // Check if user is logged in
  const checkUserLoggedIn = async () => {
    const res = await fetch(`${baseURL}/auth/me`, {
      credentials: 'include',
    });
    const data = await res.json();
    if (res.ok) {
      setUser(data);
    } else {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
