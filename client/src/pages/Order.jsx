import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { order_info } from '../actions/order';
import {Link} from "react-router-dom"
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Row, Col, ListGroup, Image } from 'react-bootstrap';

const Order = ({ match, history }) => {
  const id = match.params.id;

  const dispatch = useDispatch();

  const { user_info } = useSelector((state) => state.user_login);
  const { is_loading, error, order } = useSelector((state) => state.order_info);

  useEffect(() => {
    if (!user_info) {
      history.push('/login');
    }
    dispatch(order_info(id));
  }, [dispatch, id, user_info, history]);

  return is_loading ? (
    <Loader />
  ) : error ? (
    <Message variant="alert alert-danger">{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {order.shipping_address.address}, {order.shipping_address.city}{' '}
                {order.shipping_address.post_code},{' '}
                {order.shipping_address.country}
              </p>
              {order.is_delivered ? (
                <Message variant="success">
                  Delivered on {order.delivered_at}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              {order.is_paid ? (
                <Message variant="success">Paid on {order.paid_at}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              <ListGroup variant='flush'>
                {order.items.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={1}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={4}>
                        {item.qty} x ${item.price} = ${item.qty * item.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default Order;
