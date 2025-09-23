const express = require('express');
const { getCart, addItem, updateItem, removeItem, clearCart, checkout } = require('../controllers/cartController');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { addItemSchema, updateItemSchema } = require('../validators/cart.validation');

const router = express.Router();

router.use(auth());
router.get('/', getCart);
router.post('/items', validate(addItemSchema), addItem);
router.put('/items/:itemId', validate(updateItemSchema), updateItem);
router.delete('/items/:itemId', removeItem);
router.delete('/', clearCart);
router.post('/checkout', checkout);

module.exports = router;
