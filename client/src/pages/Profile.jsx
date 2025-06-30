import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useProfileMutation } from '../slices/usersApi';
import { setCredentials } from '../slices/auth';

const Profile = ({ history }) => {
  const [name, set_name] = useState('');
  const [email, set_email] = useState('');
  const [password, set_password] = useState('');
  const [error, set_error] = useState('');

  const dispatch = useDispatch();

  const { user_info } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loading_update_profile }] =
    useProfileMutation();

  const submit_handler = async (event) => {
    event.preventDefault();
    try {
      const res = await updateProfile({
        id: user_info._id,
        token: user_info.token,
        data: {
          name,
          email,
          password,
        },
      }).unwrap();
      dispatch(setCredentials({ ...res }));
    } catch (err) {
      set_error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (!user_info) {
      history.push('/login');
    } else {
      set_name(user_info.name);
      set_email(user_info.email);
    }
  }, [history, user_info, user_info.name, user_info.email]);

  return (
    <Row>
      <Col md={3}>
        {error && <Message variant="danger">{error}</Message>}
        <Form onSubmit={submit_handler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(event) => set_name(event.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(event) => set_email(event.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group
            controlId="password"
            className="my-2"
            onChange={(event) => set_password(event.target.value)}
          >
            <Form.Label>Password</Form.Label>
            <Form.Control type="password"></Form.Control>
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            disabled={loading_update_profile}
          >
            Update
          </Button>
          {loading_update_profile && <Loader />}
        </Form>
      </Col>
    </Row>
  );
};

export default Profile;
