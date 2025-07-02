export const add_decimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const update_cart = (state) => {
  const total = state.items.reduce(
    (acc, item) => acc + (item.price * 100 * item.qty) / 100,
    0
  );
  state.total = add_decimals(total);

  localStorage.setItem('cart', JSON.stringify(state));

  return state;
};
