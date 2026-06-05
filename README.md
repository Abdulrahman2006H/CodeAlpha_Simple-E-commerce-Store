# Simple E-commerce Store

A beginner-friendly full-stack e-commerce project with **HTML/CSS/JavaScript** frontend, **Express.js** backend, and **MongoDB** database.

## Project structure

```
ecommerce-store/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   ├── config/db.js
│   ├── models/          (User, Product, Order)
│   ├── routes/
│   ├── controllers/
│   ├── middleware/auth.js
│   └── seed/
└── frontend/
    ├── index.html       (product listings)
    ├── product.html
    ├── cart.html
    ├── login.html
    ├── register.html
    ├── orders.html
    ├── css/style.css
    └── js/
```

## Prerequisites

1. [Node.js](https://nodejs.org/) (v18 or newer recommended)
2. [MongoDB](https://www.mongodb.com/try/download/community) running locally, or a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster

## How to run (step by step)

### Step 1: Open the backend folder

```bash
cd backend
```

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Configure environment variables

Copy the example file and edit it:

```bash
copy .env.example .env
```

On Mac/Linux:

```bash
cp .env.example .env
```

Edit `.env` and set:

- `MONGODB_URI` – your MongoDB connection string
- `JWT_SECRET` – any long random string (keep it secret in production)

### Step 4: Start MongoDB

If using local MongoDB, make sure the service is running. Default URI in `.env.example`:

```
mongodb://127.0.0.1:27017/ecommerce_store
```

### Step 5: Seed sample products

```bash
npm run seed
```

You should see: `Seeded 8 products successfully.`

### Step 6: Start the server

```bash
npm start
```

Server runs at: **http://localhost:5000**

### Step 7: Use the store in your browser

Open **http://localhost:5000** (Express serves the frontend automatically).

**Quick test flow:**

1. Browse products on the home page
2. Add items to cart (stored in `localStorage`)
3. Register a new account
4. Go to Cart → Checkout (requires login)
5. View **My Orders** after checkout

---

## API routes documentation

Base URL: `http://localhost:5000/api`

### Health

| Method | Endpoint       | Auth | Description        |
|--------|----------------|------|--------------------|
| GET    | `/api/health`  | No   | API status check   |

### Authentication

| Method | Endpoint              | Auth | Description                    |
|--------|-----------------------|------|--------------------------------|
| POST   | `/api/auth/register`  | No   | Register new user              |
| POST   | `/api/auth/login`     | No   | Login, returns JWT             |
| GET    | `/api/auth/me`        | Yes  | Get current user profile       |

**Register body (JSON):**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}
```

**Login body (JSON):**

```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

**Success response (register/login):**

```json
{
  "_id": "...",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Protected requests:** add header:

```
Authorization: Bearer <your_jwt_token>
```

### Products

| Method | Endpoint              | Auth | Description           |
|--------|-----------------------|------|-----------------------|
| GET    | `/api/products`       | No   | List all products     |
| GET    | `/api/products/:id`   | No   | Get one product by ID |

### Orders (all require login)

| Method | Endpoint            | Auth | Description              |
|--------|---------------------|------|--------------------------|
| POST   | `/api/orders`       | Yes  | Create order from cart   |
| GET    | `/api/orders/my`    | Yes  | List current user's orders |
| GET    | `/api/orders/:id`   | Yes  | Get single order (own only) |

**Create order body (JSON):**

```json
{
  "orderItems": [
    { "productId": "664a1b2c3d4e5f678901234", "quantity": 2 },
    { "productId": "664a1b2c3d4e5f678901235", "quantity": 1 }
  ]
}
```

**Order response example:**

```json
{
  "_id": "...",
  "user": { "_id": "...", "name": "John", "email": "john@example.com" },
  "orderItems": [
    {
      "product": "...",
      "name": "Wireless Bluetooth Headphones",
      "image": "https://...",
      "price": 79.99,
      "quantity": 2
    }
  ],
  "totalPrice": 159.98,
  "status": "completed",
  "createdAt": "2026-06-03T12:00:00.000Z"
}
```

---

## Database collections

| Collection | Purpose                                      |
|------------|----------------------------------------------|
| `users`    | name, email, hashed password                 |
| `products` | name, price, descriptions, image, stock      |
| `orders`   | user ref, orderItems, totalPrice, timestamps |

---

## Scripts

| Command        | Description                    |
|----------------|--------------------------------|
| `npm start`    | Start production server        |
| `npm run dev`  | Start with auto-reload (Node 18+) |
| `npm run seed` | Load sample products into DB   |

---

## Troubleshooting

- **Cannot connect to MongoDB** – Check `MONGODB_URI` in `.env` and that MongoDB is running.
- **No products on page** – Run `npm run seed` in the `backend` folder.
- **401 on checkout** – Log in first; token is stored in browser `localStorage`.
- **CORS issues** – Frontend is served from the same origin as the API, so this should not occur when using `http://localhost:5000`.

---

## License

ISC – free to use for learning and practice.
