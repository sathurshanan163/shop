const add_decimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const calculate_prices = (items) => {
  const subtotal = items.reduce(
    (acc, item) => acc + (item.price * 100 * item.qty) / 100,
    0
  );
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = 0.15 * subtotal;
  const total = subtotal + shipping + tax;
  return {
    subtotal: add_decimals(subtotal),
    shipping: add_decimals(shipping),
    tax: add_decimals(tax),
    total: add_decimals(total),
  };
};
