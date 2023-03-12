import axios from 'axios';

const API_URL = 'http://localhost:5000/api/goals';

const addGoals = async (goalData, token) => {
  const {
    data: { goal },
  } = await axios.post(`${API_URL}`, goalData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return goal;
};

const getGoals = async (token) => {
  const {
    data: { goals },
  } = await axios.get(`${API_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return goals;
};

const updateGoals = async (id, goalData, token) => {
  const {
    data: { goals },
  } = await axios.put(`${API_URL}/${id}`, goalData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return goals;
};

const deleteGoals = async (deleteID, token) => {
  const {
    data: { id },
  } = await axios.delete(`${API_URL}/${deleteID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return id;
};

const goalService = { getGoals, addGoals, updateGoals, deleteGoals };

export default goalService;
