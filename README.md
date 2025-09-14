## Live Demo

# fullstack-starter

A starter full-stack MERN project by DevKofi — backend + frontend structure, ready for development and deployment.

---

## Contents

- `client/` — React frontend
- `server/` — Node.js + Express backend
- Other files: configuration, gitignore, etc.

---

## Prerequisites

Make sure you have installed:

- Node.js (v14+ or newer)
- npm or yarn
- MongoDB (local or remote)
- (Optional) Docker, if you’re containerising

---

## Setup & Run

1. Clone the repo

   ```bash
   git clone https://github.com/kofiarhin/fullstack-starter.git
   cd fullstack-starter
   ```

2. Backend setup

   ```bash
   cd server
   npm install
   # create .env file, e.g.:
   #   MONGO_URI=your_mongo_connection_string
   #   PORT=5000
   npm run dev
   ```

3. Frontend setup

   ```bash
   cd ../client
   npm install
   # also configure .env if needed (e.g. REACT_APP_API_URL)
   npm start
   ```

4. Both parts running → app should be available at:
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:5000`

---

## Scripts

| Location  | Script          | Description                             |
| --------- | --------------- | --------------------------------------- |
| `server/` | `npm run dev`   | Runs backend in dev mode (with nodemon) |
| `server/` | `npm test`      | Run backend tests (if any)              |
| `client/` | `npm start`     | Starts React dev server                 |
| `client/` | `npm run build` | Builds frontend for production          |

---

## Configuration

- **Environment variables**

  - `server/.env`: `MONGO_URI`, `PORT`, `JWT_SECRET` (if auth added)
  - `client/.env`: `REACT_APP_API_URL`

- **Folder structure (example):**
  ```
  /server
    /controllers
    /models
    /routes
    /middleware
  /client
    /src
      /components
      /pages
      /utils
      /hooks
  ```

---

## Deployment

- **Frontend:** deploy build folder to Vercel or Netlify
- **Backend:** deploy to Render / Heroku / AWS
- Make sure environment variables are set in the deployment environment

---

## What’s Done / To Do

- Basic folder setup
- Server & client separation
- Add authentication
- Add testing suite
- CI/CD pipeline

---

## License & Contributing

Contributions welcome. Please open issues or pull requests.  
Licensed under MIT.

---

## Contact

DevKofi — kofiarhin@gmail.com  
Project link: [fullstack-starter](https://github.com/kofiarhin/fullstack-starter)
