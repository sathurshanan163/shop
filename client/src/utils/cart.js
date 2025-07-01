export const add_decimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const update_cart = (state) => {
  const subtotal = state.items.reduce(
    (acc, item) => acc + (item.price * 100 * item.qty) / 100,
    0
  );
  state.subtotal = add_decimals(subtotal);

  const shipping = subtotal > 100 ? 0 : 10;
  state.shipping = add_decimals(shipping);

  const tax = 0.15 * subtotal;
  state.tax = add_decimals(tax);

  const total = subtotal + shipping + tax;
  state.total = add_decimals(total);

  localStorage.setItem('cart', JSON.stringify(state));

  return state;
};
