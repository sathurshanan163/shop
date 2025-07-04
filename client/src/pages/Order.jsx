import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { useGetOrderQuery, usePayMutation } from '../slices/order_api';

const Order = ({ match, history }) => {
  const id = match.params.id;

  const { user_info } = useSelector((state) => state.auth);

  const {
    data: order,
    isLoading,
    error,
  } = useGetOrderQuery({ token: user_info.token, id });

  const [pay, { isLoading: isPayLoading }] = usePayMutation();

  const handle_submit = async () => {
    const res = await pay({
      token: user_info.token,
      id: order._id,
    }).unwrap();

    if (res.url) {
      window.location.href = res.url;
    }
  };

  useEffect(() => {
    if (!user_info) {
      history.push('/login');
    }
  }, [user_info, history]);

  return isLoading ? (
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
                <Message variant="success">Delivered</Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              {order.is_paid ? (
                <Message variant="success">Paid</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Items</h2>
              <ListGroup variant="flush">
                {order.items.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={1}>
                        <Link to={`/product/${item.product}`}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Link>
                      </Col>
                      <Col>
                        <p>{item.name}</p>
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
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.total}</Col>
                </Row>
              </ListGroup.Item>
              {!order.is_paid && (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="w-100"
                    variant="dark"
                    onClick={handle_submit}
                    disabled={isPayLoading}
                  >
                    Pay
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Order;
