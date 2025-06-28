import { useSelector } from 'react-redux';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Message from '../components/Message';

const Placeorder = ({ history }) => {
  const cart = useSelector((state) => state.cart);

  if (!cart.shipping_address.address) {
    history.push('/shipping');
  }

  const add_decimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.items_price = add_decimals(
    cart.items.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shipping_price = add_decimals(cart.items_price > 100 ? 0 : 100);
  cart.tax_price = add_decimals(Number((0.15 * cart.items_price).toFixed(2)));
  cart.total_price = (
    Number(cart.items_price) +
    Number(cart.shipping_price) +
    Number(cart.tax_price)
  ).toFixed(2);

  const placeorder = () => {};

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
                <Col>${cart.items_price}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>${cart.tax_price}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>${cart.total_price}</Col>
              </Row>
            </ListGroup.Item>
            {/* <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
            </ListGroup.Item> */}
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
