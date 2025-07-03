import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useRegisterMutation } from '../slices/users_api';
import { set_credentials } from '../slices/auth';

const Register = ({ location, history }) => {
  const [name, set_name] = useState('');
  const [email, set_email] = useState('');
  const [password, set_password] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();
  const { user_info } = useSelector((state) => state.auth);

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const submit_handler = async (event) => {
    event.preventDefault();
    try {
      const res = await register({ name, email, password }).unwrap();
      dispatch(set_credentials({ ...res }));
      history.push(redirect);
    } catch (err) {
      setError(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (user_info) {
      history.push(redirect);
    }
  }, [history, user_info, redirect]);

  return (
    <FormContainer>
      <h1 className="text-center">Register</h1>
      {error && <Message variant="danger">{error}</Message>}
      {isLoading && <Loader />}
      <Form onSubmit={submit_handler}>
        <Form.Group controlId="name" className="my-2">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(event) => set_name(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email" className="my-2">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(event) => set_email(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password" className="my-2">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(event) => set_password(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="dark" className="w-100">
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col className="text-center">
          Already have an account? <Link to="/login">Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Register;
