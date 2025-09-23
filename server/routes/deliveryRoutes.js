const express = require('express');
const { getDeliveryByOrder, updateDeliveryStatus } = require('../controllers/deliveryController');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { deliveryUpdateSchema } = require('../validators/order.validation');
const { ROLES } = require('../utils/roles');

const router = express.Router();

router.use(auth());
router.get('/:orderId', getDeliveryByOrder);
router.patch('/:orderId', auth([ROLES.OWNER, ROLES.ADMIN]), validate(deliveryUpdateSchema), updateDeliveryStatus);

module.exports = router;
