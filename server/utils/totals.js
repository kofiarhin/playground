const TAX_RATE = 0.08;

const calculateTotals = (items = []) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = parseFloat((subtotal * TAX_RATE).toFixed(2));
  const total = parseFloat((subtotal + tax).toFixed(2));
  return { subtotal, tax, total };
};

module.exports = { calculateTotals };
