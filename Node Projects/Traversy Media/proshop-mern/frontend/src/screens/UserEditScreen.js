import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserListDetails,
  updateUser,
  userUpdateReset,
} from '../actions/userActions';

const UserEditScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state) => state.userAdminUpdate);

  const { loading, error, userDet } = useSelector(
    (state) => state.userListDetails
  );

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState('');

  useEffect(() => {
    dispatch(getUserListDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!userInfo && userDet.isAdmin !== 'true') {
      navigate('/login');
    }
    if (successUpdate) {
      dispatch(userUpdateReset());
      navigate('/admin/userlist');
    } else {
      setName(userDet?.name);
      setEmail(userDet?.email);
      setIsAdmin(userDet?.isAdmin);
    }
  }, [navigate, userDet, userInfo, dispatch, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser(id, { name, email, isAdmin }));
  };

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='isadmin'>
              <Form.Label>Is Admin</Form.Label>
              <Form.Control
                type='text'
                placeholder='true or false'
                value={isAdmin}
                onChange={(e) => setIsAdmin(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='my-3'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
