import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add_to_cart, remove_from_cart } from '../actions/cart';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import Message from '../components/Message';
import { FaTrash } from 'react-icons/fa';

const Cart = ({ match, location, history }) => {
  const product_id = match.params.id;

  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  const remove_from_cart_handler = (id) => {
    dispatch(remove_from_cart(id));
  };

  const chekout_handler = () => {
    history.push('/login?redirect=/shipping');
  };

  useEffect(() => {
    if (product_id) {
      dispatch(add_to_cart(product_id, qty));
    }
  }, [dispatch, product_id, qty]);

  return (
    <Row>
      <h1>Cart</h1>
      <Col md={8}>
        {items.length === 0 ? (
          <Message>
            Cart is empty <Link to="/">Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {items.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(event) =>
                        dispatch(
                          add_to_cart(item.product, Number(event.target.value))
                        )
                      }
                    >
                      {[...Array(item.stock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => remove_from_cart_handler(item.product)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({items.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              $
              {items
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="primary btn-block"
                disabled={items.length === 0}
                onClick={chekout_handler}
                style={{
                  width: '100%',
                  backgroundColor: '#0D6EFD',
                  color: '#FFFFFF',
                }}
              >
                Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default Cart;
