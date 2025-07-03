const add_decimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const calculate_total = (items) => {
  const total = items.reduce(
    (acc, item) => acc + (item.price * 100 * item.qty) / 100,
    0
  );
  return add_decimals(total);
};
