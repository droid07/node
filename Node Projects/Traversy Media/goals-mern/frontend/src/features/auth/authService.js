import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const register = async (userData) => {
  const {
    data: { user },
  } = await axios.post(`${API_URL}/register`, userData);

  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  return user;
};

const login = async (userData) => {
  const {
    data: { user },
  } = await axios.post(`${API_URL}/login`, userData);

  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  return user;
};

const logout = () => {
  localStorage.removeItem('user');
};

const authService = { register, login, logout };

export default authService;
