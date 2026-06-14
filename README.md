# ⛺ Camp Review (YapCamp)

A full-stack, production-ready web application built for discovering, reviewing, and tracking campgrounds. This project is engineered with an emphasis on modularity, clean code practices, and scalable backend architecture.

---

## 🛠️ Tech Stack & Architecture

*   **Backend:** Node.js, Express.js (MVC Pattern)
*   **Database:** MongoDB via Mongoose ODM
*   **Templating Engine:** EJS with `ejs-mate` layouts
*   **Styling:** Bootstrap 5
*   **Logging & Error Pipelines:** Custom middleware suite

---

## 🧠 Software Engineering Practices Enforced

This application is built like a production system, moving away from monolithic configurations to prioritize a clean **Developer Experience (DX)** and long-term maintainability:

### 1. Robust Model-View-Controller (MVC) Pattern
The core backend is entirely decoupled to ensure single-responsibility across files:
*   **`routes/`:** Act purely as endpoint maps using Express `router.route()` groupings to keep URI paths scannable.
*   **`controllers/`:** House the actual business logic, database operations, and view-rendering tasks.
*   **`models/`:** Enforce data validation constraints and schema integrity.

### 2. Streamlined Asynchronous Flow & Centralized Error Handling
Instead of polluting controllers with repetitive `try/catch` blocks, this application hooks directly into a centralized error pipeline:
*   Operational failures are thrown using a custom `AppError` class that captures explicit HTTP status codes and messages.
*   An asynchronous error-forwarding layer ensures unhandled exceptions seamlessly drop into the global error handler.
*   An isolated **Error-Logging Middleware** handles tracking and reporting failures without halting application execution.

### 3. Event-Driven Tracing Middleware
Includes a custom `eventLogger` system that actively intercepts incoming network requests, tracing traffic behavior and payload lifecycles through the application stream to make troubleshooting fast and visual.

### 4. Global Mongoose Database Tracing Engine
To maintain absolute visibility over database performance and lifecycle events during development, the application utilizes a custom Mongoose schema plugin (`utils/dbLogger.js`):
*   Automatically hooks into Mongoose query middleware to intercept and benchmark execution times.
*   Uses a dedicated styling utility (`utils/logStyles.js`) to output cleanly formatted, color-coded diagnostic logs directly to the system terminal whenever a database operation occurs.
*   Eliminates blind spots by tracking exactly when, where, and how data schemas are being queried or mutated in real time.

---

## 📂 Directory Layout

```text
YapCamp/
├── config/            # Core configuration files
├── controllers/       # Extracted business & database query logic
│   └── campgrounds.js # Campground route handlers
├── middleware/        # Traffic interrogation pipelines
│   ├── errorMiddleware.js
│   └── eventLogger.js
├── models/            # Strict Mongoose schemas & data validation
│   └── campground.js
├── public/            # Client-side static UI scripts and styling assets
├── routes/            # Pure endpoint maps (The App Switchboard)
│   └── campgrounds.js
├── utils/             # Architectural helpers & error extensions
│   ├── AppError.js    # Operational error class
│   ├── dbLogger.js    # Custom database tracking engine
│   └── logStyles.js   # Terminal styling configurations
├── views/             # Server-rendered EJS user interfaces
│   ├── campgrounds/   # Layout views for campground elements
│   └── layouts/       # Global HTML boilerplate shell
├── app.js             # Pipeline initialization & global configuration
└── server.js          # App bootstrapper & MongoDB socket engine
```

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have **Node.js** and **MongoDB** installed and running on your system.

### 2. Installation & Configuration
Clone the repository and jump into the workspace:
```bash
git clone https://github.com/Mattsmind/camp_review.git
cd camp_review
npm install
```

Create a local environment configuration file:
```bash
touch .env
```
Populate your `.env` with your network and database details:
```env
PORT=3000
DATABASE_URL=mongodb://127.0.0.1:27017/camp-review
```

### 3. Run the Development Engine
Launch the application with active code-change monitoring:
```bash
npm run dev
```
The app will bind to the network socket. Open your browser and navigate to `http://localhost:3000`.