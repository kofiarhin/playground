const express = require('express');
const { getOrders, getOrderById, updateOrderStatus } = require('../controllers/orderController');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { orderStatusSchema } = require('../validators/order.validation');
const { ROLES } = require('../utils/roles');

const router = express.Router();

router.use(auth());
router.get('/', getOrders);
router.get('/:id', getOrderById);
router.patch('/:id/status', auth([ROLES.OWNER, ROLES.ADMIN]), validate(orderStatusSchema), updateOrderStatus);

module.exports = router;
