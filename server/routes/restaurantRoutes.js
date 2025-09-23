const express = require('express');
const { getRestaurants, createRestaurant, updateRestaurant, deleteRestaurant } = require('../controllers/restaurantController');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { restaurantSchema } = require('../validators/restaurant.validation');
const { ROLES } = require('../utils/roles');
const menuRouter = require('./menuItemRoutes');

const router = express.Router();

router.get('/', getRestaurants);
router.post('/', auth([ROLES.OWNER, ROLES.ADMIN]), validate(restaurantSchema), createRestaurant);
router.put('/:id', auth([ROLES.OWNER, ROLES.ADMIN]), validate(restaurantSchema), updateRestaurant);
router.delete('/:id', auth([ROLES.OWNER, ROLES.ADMIN]), deleteRestaurant);
router.use('/:restaurantId/menu', menuRouter);

module.exports = router;
