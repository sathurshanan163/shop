import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { add_to_cart } from '../actions/cart';

const Cart = ({ match, location }) => {
  const product_id = match.params.id;

  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();

  useEffect(() => {
    if (product_id) {
      dispatch(add_to_cart(product_id, qty));
    }
  }, [dispatch, product_id, qty]);

  return <h1>Cart</h1>;
};

export default Cart;
