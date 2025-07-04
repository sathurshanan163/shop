import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import { useCreateOrderMutation } from '../slices/order_api';
import { clear_items } from '../slices/cart';

const Placeorder = ({ history }) => {
  const dispatch = useDispatch();

  const { user_info } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  const placeorder = async () => {
    try {
      const res = await createOrder({
        token: user_info.token,
        order: {
          items: cart.items,
          shipping_address: cart.shipping_address,
          total: cart.total,
        },
      }).unwrap();
      dispatch(clear_items());
      history.push(`/order/${res._id}`);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!cart.shipping_address.address) {
      history.push('/shipping');
    }
  }, [cart.shipping_address.address, history]);

  return (
    <Row>
      <Col md={8}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h2>Shipping</h2>
            <p>
              <strong>Address: </strong>
              {cart.shipping_address.address}, {cart.shipping_address.city}{' '}
              {cart.shipping_address.post_code}, {cart.shipping_address.country}
            </p>
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Items</h2>
            {cart.items.length === 0 ? (
              <Message>Cart is empty</Message>
            ) : (
              <ListGroup variant="flush">
                {cart.items.map((item, index) => (
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
            )}
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
                <Col>${cart.total}</Col>
              </Row>
            </ListGroup.Item>
            {error && (
              <ListGroup.Item>
                <Message variant="danger">{error.data.message}</Message>
              </ListGroup.Item>
            )}
            <ListGroup.Item>
              <Button
                type="button"
                variant="dark"
                className="w-100"
                disabled={cart.items.length === 0 || isLoading}
                onClick={placeorder}
              >
                Placeorder
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default Placeorder;
