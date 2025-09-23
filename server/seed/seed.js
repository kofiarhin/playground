require('dotenv').config();
const bcrypt = require('bcrypt');
const { connectDB } = require('../config/db');
const User = require('../models/User');
const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');
const { ROLES } = require('../utils/roles');

const seed = async () => {
  try {
    await connectDB();
    await Promise.all([
      User.deleteMany({}),
      Restaurant.deleteMany({}),
      MenuItem.deleteMany({})
    ]);

    const ownerPassword = await bcrypt.hash('password123', 10);
    const owner = await User.create({
      name: 'Owner One',
      email: 'owner@example.com',
      password: ownerPassword,
      role: ROLES.OWNER
    });

    const restaurant = await Restaurant.create({
      name: 'Fresh Bites',
      description: 'Healthy bowls and wraps',
      cuisine: 'Fusion',
      owner: owner._id
    });

    await MenuItem.insertMany([
      {
        restaurant: restaurant._id,
        name: 'Quinoa Bowl',
        description: 'Quinoa with roasted veggies',
        category: 'Bowls',
        price: 12.5
      },
      {
        restaurant: restaurant._id,
        name: 'Avocado Wrap',
        description: 'Whole wheat wrap with avocado',
        category: 'Wraps',
        price: 10
      }
    ]);

    console.log('Seed data created');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();
