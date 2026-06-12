# 📚 BookMuse - Online Book Store

BookMuse is a full-stack online book store web application built with **Angular** on the frontend and **ASP.NET Core Web API** on the backend.

The system allows users to browse books, view detailed book information, manage a shopping cart, register and login, place orders, and view their previous orders through a clean and responsive user interface.

---

## 📌 Project Overview

BookMuse was built as a complete e-commerce web application for selling books online.  
The project focuses on building a practical full-stack workflow, including frontend UI design, backend API development, SQL Server database integration, and connecting Angular services with ASP.NET Core endpoints.

---

## ✨ Features

### 👤 User Features
- User registration
- User login
- Browse available books
- View book details
- Add books to cart
- Increase and decrease cart item quantity
- Remove items from cart
- Checkout and place orders
- View previous orders in **My Orders**

### 📚 Book Features
- Display all books
- Book image, title, author, price, and description
- Book details page
- Featured books section
- Category-based browsing
- Search and filtering support

### 🛒 Cart & Orders
- Add books to cart
- Store cart items using LocalStorage
- Calculate total price
- Submit order to backend
- Save order and order items in SQL Server
- Display user order history

### 🔐 Authentication
- Register new users
- Login existing users
- Store logged-in user data on the frontend
- Connect authentication forms with backend APIs

---

## 🛠️ Tech Stack

### Frontend
- Angular
- TypeScript
- HTML5
- CSS3
- Angular Router
- Angular Services
- LocalStorage

### Backend
- ASP.NET Core Web API
- C#
- Entity Framework Core
- SQL Server
- Swagger / OpenAPI

### Tools
- Visual Studio / VS Code
- SQL Server Management Studio
- Git & GitHub
- Postman / Swagger for API testing

---

## 📁 Project Structure

```txt
BookMuse/
│
├── Frontend/
│   └── Angular book store application
│
└── Backend/
    └── ASP.NET Core Web API
```

---

## 🗄️ Database Tables

The SQL Server database includes the main entities needed for the online store:

- Users
- Books
- Orders
- OrderItems

---

## 🔗 Main API Endpoints

### Authentication
```http
POST /api/auth/register
POST /api/auth/login
```

### Books
```http
GET /api/books
GET /api/books/{id}
POST /api/books
PUT /api/books/{id}
DELETE /api/books/{id}
```

### Orders
```http
POST /api/orders
GET /api/orders/user/{userId}
GET /api/orders/{id}
```

---

## 🚀 How to Run the Project

### 1. Clone the Repository

```bash
git clone <repository-link>
cd BookMuse
```

---

### 2. Run the Backend

Open the backend project folder:

```bash
cd Backend
```

Restore packages and run the API:

```bash
dotnet restore
dotnet run
```

Then open Swagger:

```txt
https://localhost:<port>/swagger
```

---

### 3. Run the Frontend

Open the frontend project folder:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Run Angular:

```bash
ng serve
```

Open the app:

```txt
http://localhost:4200
```

---

## ⚙️ Configuration Notes

Make sure the Angular API URL matches the backend port.

Example:

```ts
apiUrl = 'https://localhost:<port>/api';
```

Also make sure the SQL Server connection string in the backend is configured correctly inside `appsettings.json`.

Example:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=.;Database=BookMuseDb;Trusted_Connection=True;TrustServerCertificate=True"
}
```

---

## 📸 Screenshots

You can add project screenshots here:

```md
![Home Page](screenshots/home.png)
![Book Details](screenshots/details.png)
![Cart Page](screenshots/cart.png)
![My Orders](screenshots/orders.png)
```

---

## 📚 What I Learned

Through this project, I practiced:

- Building a full-stack web application
- Creating RESTful APIs using ASP.NET Core
- Working with SQL Server and Entity Framework Core
- Connecting Angular frontend with backend APIs
- Managing cart state using LocalStorage
- Building responsive UI pages
- Handling order creation and user order history

---

## 📌 Future Improvements

- Add JWT authentication
- Add admin dashboard
- Add online payment integration
- Add wishlist feature
- Add book ratings and reviews
- Improve search and filtering
- Add pagination for books and orders

---

## 👨‍💻 Developer

**Abdulrahman Hossam**

---

## 📄 License

This project is for learning and portfolio purposes.
