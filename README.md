# Employee Management System (Full Stack)

A full-stack **Employee Management System** built with **Spring Boot (Backend)** and **React (Frontend)**.  
The application supports **JWT-based authentication**, **role-based access control**, and complete **CRUD operations** for employees.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control:
  - **ADMIN** → Full access (Create, Update, Delete)
  - **USER** → Read-only access

### 👨‍💼 Employee Management
- Add new employees (Admin only)
- Update employee details (Admin only)
- Delete employees (Admin only)
- View employee list (Admin & User)
- Pagination, sorting, and search

### 🧑‍💻 Frontend
- React + Vite
- Axios with JWT interceptor
- Protected routes
- Admin-only UI actions
- Proper error handling (409 conflict, validation errors)

### 🛠 Backend
- Spring Boot
- Spring Security
- JWT Authentication Filter
- JPA + Hibernate
- MySQL Database
- Validation with Hibernate Validator

---

## 🧰 Tech Stack

### Backend
- Java 17
- Spring Boot
- Spring Security
- JWT (jjwt)
- JPA / Hibernate
- MySQL
- Maven

### Frontend
- React
- Vite
- Axios
- React Router
- Bootstrap

---

## ⚙️ Setup Instructions

### 1️⃣ Backend Setup (Spring Boot)

```bash
cd employee-backend
mvn clean install
mvn spring-boot:run
```

### 2️⃣ Frontend Setup (React)

```bash
cd ems-frontend
npm install
npm run dev
