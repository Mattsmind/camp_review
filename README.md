# 🦩 VacancyVibe

A full-stack, production-ready web application built for discovering, reviewing, and tracking retro, neon-soaked roadside motels. This project is engineered from the ground up with an emphasis on strict modularity, clean Model-View-Controller (MVC) architecture, robust data validation pipelines, and highly visual backend debugging telemetry.

---

## 🛠️ Tech Stack & Architecture

* **Backend:** Node.js, Express.js (MVC Pattern)
* **Database:** MongoDB via Mongoose ODM
* **Data Validation:** Joi (Schema-based payload interrogation)
* **Templating Engine:** EJS with modern `ejs-mate` layouts and partials
* **Styling:** Bootstrap 5 Framework
* **Logging & Error Pipelines:** Custom centralized middleware suite

---

## 🧠 Software Engineering Practices Enforced

This application is built like an enterprise production system, moving away from monolithic configurations to prioritize an exceptional **Developer Experience (DX)**, security isolation, and long-term maintainability:

### 1. Robust Model-View-Controller (MVC) Pattern
The core backend layers are entirely decoupled to enforce absolute separation of concerns across files:
* **`routes/`:** Act purely as clean endpoint maps using Express `router.route()` groupings to keep URI structures readable and scannable.
* **`controllers/`:** House isolated async business logic, database queries, and view-rendering handlers.
* **`models/`:** Enforce explicit data validation constraints, data-type casting, and schema integrity at the database layer.

### 2. Multi-Layer Data Validation (Frontend & Backend Guardrails)
To guarantee data integrity and prevent malformed inputs from corrupting the database, the application enforces two independent layers of security validation:
* **Client-Side:** Utilizing Bootstrap 5 native form styles alongside custom validation logic (`public/js/formValidation.js`) to intercept bad submissions instantly before they trigger server requests.
* **Server-Side Middleware:** Utilizing standalone Joi object schemas (`schemas.js`) evaluated inside a custom traffic interrogation runner (`middleware/validateForm.js`). If an incoming HTTP payload bypasses client validation or is injected maliciously via an API tool, Joi catches it instantly and forwards a structured error layout to the client before database mutation functions run.

### 3. Centralized Async Error Pipelines
Instead of polluting controllers with repetitive, nesting `try/catch` wrappers, this application routes all transactional exceptions through an automated centralized pipeline:
* Operational failures are thrown deterministically via a custom extended `AppError` class that captures specific HTTP status codes and messages.
* An asynchronous error-forwarding layer hooks directly into Express, ensuring any unhandled promise rejections drop safely into the global error handler and render the dedicated error dashboard view (`views/error.ejs`).

### 4. Custom Database Seed Engine
Features a standalone database simulation and priming module located inside the `seeds/` directory. Powered by real structured name matrices and localized geospatial coordinates, the engine safely interfaces with MongoDB, flushes old mock documents, and injects 50 fully mapped, high-flavor motel records with uniform aspect-ratio cover media assets automatically.

### 5. Custom Telemetry & Database Tracing
* **`eventLogger.js` Middleware:** Actively intercepts incoming network HTTP requests, tracing traffic behavior and request payload lifecycles through the application middleware stream.
* **`dbLogger.js` Engine:** Automatically hooks into Mongoose hooks to intercept, benchmark, and print color-coded execution times directly to the system terminal whenever a database operation triggers.

---

## 📂 Directory Layout

```text
VacancyVibe/
├── config/                     # Core system configurations
├── controllers/                # Decoupled business & database query handlers
│   └── motels.js               # Motel controller methods
├── middleware/                 # Traffic interrogation & payload validation pipelines
│   ├── errorMiddleware.js
│   ├── eventLogger.js          # Custom network HTTP traffic tracer
│   └── validateForm.js         # Server-side Joi validation runner
├── models/                     # Strict Mongoose schemas & data validation rules
│   └── motel.js                # The Motel document blueprint
├── public/                     # Client-side static UI assets
│   ├── css/
│   │   └── styles.css          # Custom application overrides
│   ├── images/                 # Static graphic assets
│   └── js/
│       └── formValidation.js   # Client-side Bootstrap interceptor script
├── routes/                     # Pure endpoint maps (The Application Switchboard)
│   └── motels.js               # Pluralized RESTful path registers
├── schemas.js                  # Centralized Joi schemas for request payload validation
├── seeds/                      # Independent database seeding pipeline
│   ├── cities.js               # Geospatial location source records
│   ├── descriptions.js         # Atmosphere data arrays and sanitized image matrices
│   ├── index.js                # Standalone execution script utilizing dotenv paths
│   └── nameData.js             # Lexical prefixes and cores for title synthesis
├── server.js                   # Main bootstrapper & network socket listener
├── app.js                      # Middleware pipeline setup and core layout orchestration
├── LICENSE                     # Open-source license agreement
├── package.json                # Dependency manifest and execution script mappings
├── README.md                   # System documentation architectural breakdown
├── utils/                      # Architectural extensions and utility helpers
│   ├── AppError.js             # Custom operational error class
│   ├── dbLogger.js             # Custom database tracking engine
│   └── logStyles.js            # Terminal ANSI styling configurations
└── views/                      # Server-rendered EJS user interfaces
    ├── error.ejs               # Centralized operational error display template
    ├── home.ejs                # Application landing homepage
    ├── layouts/
    │   └── boilerplate.ejs     # Global ejs-mate boilerplate skeleton shell
    ├── motels/                 # Core resource view templates
    │   ├── details.ejs         # Individual motel information and full layout view
    │   ├── index.ejs           # Uniform collection gallery grid view
    │   ├── new.ejs             # Creation entry interface
    │   └── update.ejs          # Edit and update interface
    └── partials/               # Global layout modular subcomponents
        ├── footer.ejs          # Global UI footer component
        └── navbar.ejs          # Responsive site navigation utility bar
```
---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have **Node.js** (LTS version recommended) and a local instance of **MongoDB** installed and running on your system.

### 2. Installation & Configuration
Clone the repository and step into your new local workspace:

<pre><code>git clone https://github.com/Mattsmind/camp_review.git
cd camp_review
npm install</code></pre>

Create an isolated environment configuration file in the project root folder:

<pre><code>touch .env</code></pre>

Populate the `.env` file with your target network socket and database credentials:

<pre><code>PORT=3000
DATABASE_URL=mongodb://127.0.0.1:27017/vacancy-vibe</code></pre>

### 3. Prime the Database
Before kicking off the application server, populate your local database with 50 geo-located retro motels using the standalone seeding pipeline:

<pre><code>node seeds/index.js</code></pre>

### 4. Launch the Development Engine
Run the primary bootstrapper with active hot-reloading code tracking enabled:

<pre><code>npm run dev</code></pre>

The application will bind to your designated network port. Fire up your preferred web browser and navigate to: `http://localhost:3000/motels`.