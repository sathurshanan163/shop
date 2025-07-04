import { useDispatch, useSelector } from 'react-redux';
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
import { add_to_cart, remove_from_cart } from '../slices/cart';

const Cart = ({ history }) => {
  const dispatch = useDispatch();

  const { items } = useSelector((state) => state.cart);

  const add_to_cart_handler = (product, qty) => {
    dispatch(add_to_cart({ ...product, qty }));
  };

  const remove_from_cart_handler = (id) => {
    dispatch(remove_from_cart(id));
  };

  const chekout_handler = () => {
    history.push('/login?redirect=/shipping');
  };

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
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Link to={`/product/${item._id}`}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Link>
                  </Col>
                  <Col md={3}>
                    <p>{item.name}</p>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(event) =>
                        add_to_cart_handler(item, Number(event.target.value))
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
                      onClick={() => remove_from_cart_handler(item._id)}
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
                Total ({items.reduce((acc, item) => acc + item.qty, 0)}) items
              </h2>
              $
              {items
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="w-100"
                variant="dark"
                disabled={items.length === 0}
                onClick={chekout_handler}
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
