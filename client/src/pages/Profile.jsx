import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useProfileMutation } from '../slices/users_api';
import { useGetMyOrdersQuery } from '../slices/order_api';
import { set_credentials } from '../slices/auth';
import { FaTimes, FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Profile = ({ history }) => {
  const [name, set_name] = useState('');
  const [email, set_email] = useState('');
  const [password, set_password] = useState('');
  const [error, set_error] = useState('');

  const dispatch = useDispatch();

  const { user_info } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loading_update_profile }] =
    useProfileMutation();

  const {
    data: orders,
    isLoading,
    error: err,
  } = useGetMyOrdersQuery(user_info.token);

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
      dispatch(set_credentials({ ...res }));
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
            variant="dark"
            disabled={loading_update_profile}
          >
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>Orders</h2>
        {isLoading ? (
          <Loader />
        ) : err ? (
          <Message variant="danger">{err?.data?.message || err.error}</Message>
        ) : (
          <Table striped responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.total}</td>
                  <td>
                    {order.is_paid ? (
                      <FaCheck style={{ color: 'green' }} />
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    {order.is_delivered ? (
                      <FaCheck style={{ color: 'green' }} />
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    <Button
                      as={Link}
                      to={`/order/${order._id}`}
                      className="btn-sm"
                      variant="secondary"
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default Profile;
