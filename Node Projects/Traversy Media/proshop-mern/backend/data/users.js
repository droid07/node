import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'lisa',
    email: 'lisa@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'rose',
    email: 'rose@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'jennie',
    email: 'jennie@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
