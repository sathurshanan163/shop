import { useDispatch, useSelector } from 'react-redux';
import { create_order } from '../actions/order';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
// import { useEffect } from 'react';
// import { PROFILE_RESET } from '../constants/user';
// import { CREATE_ORDER_RESET } from '../constants/order';

const Placeorder = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  if (!cart.shipping_address.address) {
    history.push('/shipping');
  }

  const add_decimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.subtotal = add_decimals(
    cart.items.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shipping = add_decimals(cart.items_price > 100 ? 0 : 100);
  cart.tax = add_decimals(Number((0.15 * cart.subtotal).toFixed(2)));
  cart.total = (
    Number(cart.subtotal) +
    Number(cart.shipping) +
    Number(cart.tax)
  ).toFixed(2);

  const {error} = useSelector((state) => state.create_order);

  const placeorder = () => {
    dispatch(
      create_order({
        items: cart.items,
        shipping_address: cart.shipping_address,
        subtotal: cart.subtotal,
        shipping: cart.shipping,
        tax: cart.tax,
        total: cart.total,
      })
    );
  };

  return (
    <Row>
      <Col md={8}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h2>Shipping</h2>
            <p>
              <strong>Address: </strong>
              {cart.shipping_address.address}, {cart.shipping_address.city}{' '}
              {cart.shipping_address.post_code},{''}
              {cart.shipping_address.country}
            </p>
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Order Items</h2>
            {cart.items.length === 0 ? (
              <Message>Cart is emptyf</Message>
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
              <h2>Order Summary</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Items</Col>
                <Col>${cart.subtotal}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>${cart.tax}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>${cart.total}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              {error && <Message variant="danger">{error}</Message>}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="w-100 text-white bg-primary"
                disabled={cart.items === 0}
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
