<div align="center">

<img src="https://img.shields.io/badge/Spring%20Boot-3.5-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" />
<img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white" />
<img src="https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />
<img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />

# Smart Parking System

**A full-stack enterprise parking management platform built with Spring Boot 3 + React 19.**

Automates slot allocation, vehicle check-in/check-out, fee calculation, PDF receipt generation, and real-time analytics — all secured with JWT authentication and role-based access control.

[Live Demo](#) · [API Docs (Swagger)](#api-documentation) · [Report Bug](issues) · [Request Feature](issues)

</div>

---

## Features

### Authentication & Security
- JWT stateless authentication with automatic token expiry handling
- BCrypt password hashing (strength 10)
- Role-based access control - **ADMIN** and **USER** roles
- Axios request interceptor attaches Bearer token to every API call
- Automatic redirect to `/login` on 401 Unauthorized

### Vehicle Management
- Register vehicles with number plate, type (CAR / BIKE / SUV), owner name & mobile
- Search by vehicle number, owner name, or mobile
- Edit & delete vehicle records
- Paginated vehicle listing with sorting

### Smart Slot Allocation
- 50 pre-configured slots (CAR / BIKE / SUV types)
- Automated slot assignment on vehicle check-in
- Real-time availability tracking (occupied / available)
- Admin-only slot CRUD management

### Parking Operations (Check-In / Check-Out)
- One-click park vehicle with automatic slot assignment
- Exit vehicle with automatic fee calculation based on duration
- Fee rates configurable per slot type
- Parking session history per vehicle

### PDF Receipt Generation
- Downloadable PDF invoice on every completed parking session
- Powered by iTextPDF 5
- Includes: vehicle info, slot, entry/exit times, duration, total fee

### Admin Dashboard & Analytics
- Real-time KPI cards: total vehicles, occupied slots, today's revenue, active sessions
- Recharts-powered occupancy pie chart and revenue trend bar chart
- Dashboard data fetched live from backend aggregation queries

### Parking History & CSV Export
- Full audit log of all parking sessions with search & filter
- CSV export of all parking records
- Per-vehicle history lookup by ID or vehicle number

### Contact & Inquiry Management
- Public contact form (no login required)
- Admin view of all submitted inquiries
- Mark as resolved / delete

### Modern Enterprise UI
- Indigo + Teal design system built on Material UI v9
- Collapsible sidebar navigation (MainLayout)
- Glassmorphic public navbar (PublicLayout)
- Responsive — mobile drawer, tablet grid, desktop sidebar
- Consistent typography, spacing, shadows, and border radius tokens

---

## Architecture

```
smart-parking-system/
├── backend/                   # Spring Boot REST API
│   └── src/main/java/com/smartparking/
│       ├── config/            # SecurityConfig, CORS, DatabaseSeeder, OpenAPI
│       ├── controller/        # REST controllers (Auth, Vehicle, Slot, Parking, Dashboard…)
│       ├── dto/               # Request/Response DTOs (LoginRequest, DashboardResponse…)
│       ├── entity/            # JPA entities (User, Vehicle, ParkingSlot, ParkingRecord…)
│       ├── enums/             # Role enum (ADMIN, USER)
│       ├── exception/         # Global exception handler
│       ├── repository/        # Spring Data JPA repositories
│       ├── security/          # JwtUtil, JwtAuthenticationFilter, CustomUserDetailsService
│       └── service/           # Business logic (AuthService, ParkingService, PdfService…)
│
├── frontend/                  # React 19 + Vite SPA
│   └── src/
│       ├── components/        # Reusable UI (EmptyState, LoadingSpinner, ConfirmDialog, layout/)
│       ├── context/           # AuthContext (global auth state)
│       ├── hooks/             # useAuth custom hook
│       ├── layouts/           # MainLayout (sidebar), PublicLayout (navbar + footer)
│       ├── pages/             # Route-level page components
│       ├── routes/            # AppRoutes.jsx, ProtectedRoute.jsx
│       ├── services/          # Axios service modules (api.js, authService, parkingService…)
│       ├── theme.js           # MUI theme — design system tokens
│       └── index.css          # Global reset, fonts, scrollbars
│
├── database/
│   └── seed_data.sql          # Demo data — 7 users, 50 slots, 20 vehicles, 28+ records
│
├── .gitignore
├── LICENSE
└── README.md
```

---

## Tech Stack

### Backend
|     Technology    | Version |            Purpose               |
|-------------------|---------|----------------------------------|
| Spring Boot       | 3.5     | Core REST API framework          |
| Spring Security   | 6.x     | Authentication & authorization   |
| Spring Data JPA   | 3.x     | ORM and database queries         |
| Hibernate         | 6.x     | JPA implementation               |
| MySQL Connector/J | 8.x     | Database driver                  |
| JJWT (jjwt-api)   | 0.12.6  | JWT token generation & validation|
| iTextPDF          | 5.5.13.3| PDF receipt generation           |
| SpringDoc OpenAPI | 2.8.9   | Swagger UI auto-documentation    |
| Lombok            | Latest  | Boilerplate code reduction       |
| Java              | 21      | Runtime                          |

### Frontend
| Technology         | Version |           Purpose                 |
|--------------------|---------|-----------------------------------|
| React              | 19      | UI framework                      |
| Vite               | 8.x     | Build tool & dev server           |
| Material UI (MUI)  | 9.x     | Component library & design system |
| MUI Icons Material | 9.x     | Icon library                      |
| Recharts           | 3.x     | Dashboard charts                  |
| Axios              | 1.x     | HTTP client                       |
| React Router DOM   | 7.x     | Client-side routing               |
| React Hook Form    | 7.x     | Form state management             |
| React Toastify     | 11.x    | Toast notifications               |

---

## Getting Started

### Prerequisites

| Requirement | Version |
|---|---|
| Java JDK | 21+ |
| Apache Maven | 3.9+ |
| Node.js | 18+ |
| MySQL | 8.0+ |

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/smart-parking-system.git
cd smart-parking-system
```

### 2. Database Setup

```sql
-- In MySQL Workbench or CLI:
CREATE DATABASE smart_parking_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. Backend Configuration

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:

```env
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
JWT_SECRET=your-very-secret-key-minimum-32-chars
```

> **Note:** The app uses `spring.jpa.hibernate.ddl-auto=update` — tables are auto-created on first startup. No manual schema creation needed.

### 4. Load Demo Data (Optional)

After the first application startup (tables created), run:

```bash
mysql -u root -p smart_parking_db < database/seed_data.sql
```

This inserts 7 users, 50 parking slots, 20 vehicles, and 28+ parking records.

### 5. Start the Backend

```bash
cd backend
mvn spring-boot:run
```

API available at: `http://localhost:8080`  
Swagger UI: `http://localhost:8080/swagger-ui/index.html`

### 6. Frontend Configuration

```bash
cd frontend
cp .env.example .env
```

Edit `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:8080
```

### 7. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

App available at: `http://localhost:5173`

---

## Default Demo Credentials

> These are inserted by `seed_data.sql`. Do not use in production.

|   Role    |         Email         | Password  |
|-----------|-----------------------|-----------|
| **ADMIN** | admin@smartpark.com   | Admin@123 |
| **ADMIN** | manager@smartpark.com | Admin@123 |
| **USER**  | rahul.sharma@gmail.com| User@1234 |
| **USER**  | priya.patel@gmail.com | User@1234 |

---

## API Documentation

Interactive Swagger UI available at: **`http://localhost:8080/swagger-ui/index.html`**

### Authentication
| Method |    Endpoint          | Access |       Description         |
|--------|----------------------|--------|---------------------------|
| POST   | `/api/auth/login`    | Public | Login — returns JWT token |
| POST   | `/api/auth/register` | Public | Register new account      |

### Vehicles
| Method |             Endpoint               | Access      | Description      |
|--------|------------------------------------|-------------|------------------|
| GET    | `/api/vehicles`                    | ADMIN, USER | Get all vehicles |
| POST   | `/api/vehicles`                    | ADMIN, USER | Create vehicle   |
| PUT    | `/api/vehicles/{id}`               | ADMIN, USER | Update vehicle   |
| DELETE | `/api/vehicles/{id}`               | ADMIN, USER | Delete vehicle   |
| GET    | `/api/vehicles/search/{number}`    | ADMIN, USER | Search by plate  |
| GET    | `/api/vehicles/page?page=0&size=5` | ADMIN, USER | Paginated listing|

### Parking Slots
| Method |        Endpoint        | Access      |     Description     |
|--------|------------------------|-------------|---------------------|
| GET    | `/api/slots`           | ADMIN       | Get all slots       |
| POST   | `/api/slots`           | ADMIN       | Create slot         |
| PUT    | `/api/slots/{id}`      | ADMIN       | Update slot         |
| DELETE | `/api/slots/{id}`      | ADMIN       | Delete slot         |
| GET    | `/api/slots/available` | ADMIN, USER | Available slots only|

### Parking Operations
| Method|               Endpoint                |  Access     |       Description         |
|-------|---------------------------------------|-------------|---------------------------|
| POST  | `/api/parking/park/{vehicleId}`       | ADMIN, USER | Check-in vehicle          |
| POST  | `/api/parking/exit/{vehicleId}`       | ADMIN, USER | Check-out + calculate fee |
| GET   | `/api/parking`                        | ADMIN, USER | All parking records       |
| GET   | `/api/parking/history/id/{vehicleId}` | ADMIN, USER | History by vehicle ID     |
| GET   | `/api/parking/history/number/{number}`| ADMIN, USER | History by plate number   |
| GET   | `/api/parking/receipt/{recordId}`     | ADMIN, USER | Download PDF receipt      |

### Dashboard & Reports (Admin Only)
| Method |          Endpoint            |    Access   |     Description      |
|--------|------------------------------|-------------|----------------------|
| GET    | `/api/dashboard`             | ADMIN       | Aggregated KPI stats |
| GET    | `/api/reports/revenue/today` | ADMIN       | Today's total revenue|
| GET    | `/api/reports/revenue/month` | ADMIN       | Monthly revenue      |
| GET    | `/api/export/csv`            | ADMIN, USER | Export records as CSV|

### Contact
| Method |      Endpoint        | Access |       Description      |
|--------|----------------------|--------|------------------------|
| POST   | `/api/contact`       | Public | Submit contact message |
| GET    | `/api/contact`       | ADMIN  | View all messages      |
| PATCH  | `/api/contact/{id}`  | ADMIN  | Mark as resolved       |
| DELETE | `/api/contact/{id}`  | ADMIN  | Delete message         |

---

## JWT Authentication Flow

```
1. User POSTs credentials → /api/auth/login
2. Backend validates credentials via Spring Security
3. On success → JwtUtil generates a signed JWT (HS256, 24h expiry)
4. Frontend stores JWT in localStorage
5. Axios request interceptor attaches:
     Authorization: Bearer <token>
   to every subsequent API request
6. JwtAuthenticationFilter intercepts each request:
   - Extracts token from Authorization header
   - Validates signature and expiry with JwtUtil
   - Sets SecurityContext (Authentication object)
7. Spring Security evaluates role-based route permissions
8. On 401 → Axios response interceptor clears token + redirects to /login
```

---

## Role-Based Access Control

|         Feature       | ADMIN |    USER    |
|-----------------------|:-----:|:----------:|
| Dashboard & Analytics |  ✅  |  ❌        |
| Slot Management (CRUD)|  ✅  |  ❌        |
| View Available Slots  |  ✅  |  ✅        |
| Vehicle Management    |  ✅  |  ✅        |
| Park / Exit Vehicle   |  ✅  |  ✅        |
| Download PDF Receipt  |  ✅  |  ✅        |
| Parking History & CSV |  ✅  |  ✅        |
| View Contact Inquiries|  ✅  |  ❌        |
| Submit Contact Form   |  ✅  |  ✅(public)|

---

## Future Enhancements

- [ ] **Online Slot Reservation** - Book a slot in advance with time window
- [ ] **Email Notifications** - Send receipt and confirmation via SMTP
- [ ] **QR Code Check-In** - Scan QR at entry/exit instead of manual lookup
- [ ] **Dynamic Pricing** - Peak-hour surge pricing per slot type
- [ ] **Multi-Level Parking** - Floor/zone management for large facilities
- [ ] **Mobile App** - React Native companion app for vehicle owners
- [ ] **Dark Mode** - Theme toggle with persistent user preference
- [ ] **Unit & Integration Tests** - JUnit 5 + Mockito backend test suite
- [ ] **Docker Compose** - One-command local environment setup
- [ ] **CI/CD Pipeline** - GitHub Actions automated build and deploy

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

<div align="center">

Built with ❤️ using Spring Boot 3 + React 19 + Material UI

⭐ Star this repo if you found it helpful!

</div>
