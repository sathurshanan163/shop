import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { profile, update_profile } from '../actions/user';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';

const Profile = ({ history }) => {
  const [name, set_name] = useState('');
  const [email, set_email] = useState('');
  const [password, set_password] = useState('');

  const dispatch = useDispatch();
  const { user_info } = useSelector((state) => state.user_login);
  const { is_loading, error, user } = useSelector((state) => state.profile);

  const submit_handler = (event) => {
    event.preventDefault();
    dispatch(update_profile({ id: user._id, name, email, password }));
  };

  useEffect(() => {
    if (!user_info) {
      history.push('/login');
    } else {
      dispatch(profile());
      set_name(user.name);
      set_email(user.email);
    }
  }, [dispatch, history, user_info, user.name, user.email]);

  return (
    <Row>
      <Col md={3}>
        <h2>Profile</h2>
        {is_loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
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
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </Col>
    </Row>
  );
};

export default Profile;
