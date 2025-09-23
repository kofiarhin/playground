const express = require('express');
const { getMenuByRestaurant, createMenuItem, updateMenuItem, deleteMenuItem } = require('../controllers/menuItemController');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { menuItemSchema } = require('../validators/menuItem.validation');
const { ROLES } = require('../utils/roles');

const router = express.Router({ mergeParams: true });

router.get('/', getMenuByRestaurant);
router.post('/', auth([ROLES.OWNER, ROLES.ADMIN]), validate(menuItemSchema), createMenuItem);
router.put('/:itemId', auth([ROLES.OWNER, ROLES.ADMIN]), validate(menuItemSchema), updateMenuItem);
router.delete('/:itemId', auth([ROLES.OWNER, ROLES.ADMIN]), deleteMenuItem);

module.exports = router;
