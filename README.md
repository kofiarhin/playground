# MERN Food Delivery

## Setup

1. Install dependencies:
   ```bash
   npm install
   npm --prefix server install
   npm --prefix client install
   ```
2. Copy `.env.example` to `.env` and update secrets.
3. Seed data:
   ```bash
   npm --prefix server run seed
   ```
4. Run development servers:
   ```bash
   npm run dev
   ```
5. Run tests:
   ```bash
   npm run test:server
   npm run test:client
   ```
