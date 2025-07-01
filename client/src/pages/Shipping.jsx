import { useState } from 'react';
import { Form, Button, FormGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { save_shipping_address } from '../slices/cart';

const Shipping = ({ history }) => {
  const { shipping_address } = useSelector((state) => state.cart);

  const [address, set_address] = useState(shipping_address.address || '');
  const [city, set_city] = useState(shipping_address.city || '');
  const [post_code, set_post_code] = useState(shipping_address.post_code || '');
  const [country, set_country] = useState(shipping_address.country || '');

  const dispatch = useDispatch();

  const submit_handler = (event) => {
    event.preventDefault();
    dispatch(save_shipping_address({ address, city, post_code, country }));
    history.push('/placeorder');
  };

  return (
    <FormContainer>
      <h1 className="text-center">Shipping</h1>
      <Form onSubmit={submit_handler}>
        <FormGroup className="my-2" controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            value={address}
            required
            onChange={(event) => set_address(event.target.value)}
          ></Form.Control>
        </FormGroup>
        <FormGroup className="my-2" controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            value={city}
            required
            onChange={(event) => set_city(event.target.value)}
          ></Form.Control>
        </FormGroup>
        <FormGroup className="my-2" controlId="post_code">
          <Form.Label>Post Code</Form.Label>
          <Form.Control
            type="text"
            value={post_code}
            required
            onChange={(event) => set_post_code(event.target.value)}
          ></Form.Control>
        </FormGroup>
        <FormGroup className="my-2" controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            value={country}
            required
            onChange={(event) => set_country(event.target.value)}
          ></Form.Control>
        </FormGroup>
        <Button className="w-100" type="submit" variant="dark">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Shipping;
