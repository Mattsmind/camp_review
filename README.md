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
* **Server-Side Middleware:** Utilizing standalone Joi object schemas evaluated inside a custom traffic interrogation runner (`middleware/validateForm.js`). If an incoming HTTP payload bypasses client validation or is injected maliciously via an API tool, Joi catches it instantly and forwards a structured error layout to the client before database mutation functions run.

### 3. Strict Parameter Interception
To prevent internal server exceptions and unhandled casting errors (such as `CastError: Cast to ObjectId failed`), the application routes incoming parameters through an isolated validation schema (`models/idValidation.js`). If a user or malicious actor attempts an API manipulation using a malformed string or an invalid 24-character hexadecimal MongoDB ObjectId format, the `validateForm` middleware intercepts the request immediately at the parameters level, dropping a clean `400 Bad Request` execution payload before database query methods can trigger.

### 4. Relational Integrity & Cascade Closures
The data mapping layer maintains a rigid one-to-many relationship linking multiple review documents to a parent motel. Data persistence and cleanliness are managed via pre-compiled Mongoose lifecycle hooks:
* **Asynchronous Cascade Deletion:** When a motel record is systematically deleted via the dashboard interface or an external API method, a `findOneAndDelete` post-hook interceptor fires seamlessly behind the scenes, running a targeted `$in` query against the reviews collection. This ensures that orphaned review components are wiped completely from the database cache, maintaining clean document trees.

### 5. Centralized Async Error Pipelines
Instead of polluting controllers with repetitive, nesting `try/catch` wrappers, this application routes all transactional exceptions through an automated centralized pipeline:
* Operational failures are thrown deterministically via a custom extended `AppError` class that captures specific HTTP status codes and messages.
* An asynchronous error-forwarding layer hooks directly into Express, ensuring any unhandled promise rejections drop safely into the global error handler and render the dedicated error dashboard view (`views/error.ejs`).

### 6. Custom Database Seed Engine
Features a standalone database simulation and priming module located inside the `seeds/` directory. Powered by real structured name matrices and localized geospatial coordinates, the engine safely interfaces with MongoDB, flushes old mock documents, and injects 50 fully mapped, high-flavor motel records—complete with modularized, dynamically injected user review loops—automatically.

### 7. Custom Telemetry & Database Tracing
* **`eventLogger.js` Middleware:** Actively intercepts incoming network HTTP requests, tracing traffic behavior and request payload lifecycles through the application middleware stream.
* **`dbLogger.js` Engine:** Automatically hooks into Mongoose hooks to intercept, benchmark, and print color-coded execution times directly to the system terminal whenever a database operation triggers.

---

## 📂 Directory Layout

```text
VacancyVibe/
├── app.js                      # Middleware pipeline setup and core layout orchestration
├── server.js                   # Main bootstrapper & network socket listener
├── controllers/                # Decoupled business & database query handlers
│   ├── motels.js               # Motel controller methods
│   └── reviews.js              # Review controller methods
├── insomnia_test_suite.yaml    # Exported Insomnia API testing suite
├── middleware/                 # Traffic interrogation & payload validation pipelines
│   ├── errorMiddleware.js
│   ├── eventLogger.js          # Custom network HTTP traffic tracer
│   └── validateForm.js         # Server-side Joi validation runner
├── models/                     # Mongoose schemas & modular Joi validation guardrails
│   ├── idValidation.js         # Parameter checking via ObjectId Joi schema
│   ├── motel.js                # The Motel document blueprint
│   ├── motelValidation.js      # Form validation schemas for Motels
│   ├── review.js               # The Review document blueprint
│   └── reviewsValidation.js    # Form validation schemas for Reviews
├── public/                     # Client-side static UI assets
│   ├── css/
│   │   └── styles.css          # Custom application overrides
│   ├── images/                 # Static graphic assets
│   └── js/
│       └── formValidation.js   # Client-side Bootstrap interceptor script
├── routes/                     # Pure endpoint maps (The Application Switchboard)
│   ├── motels.js               # Pluralized RESTful motel path registers
│   └── reviews.js              # Nested relational review endpoints
├── seeds/                      # Independent database seeding pipeline
│   ├── cities.js               # Geospatial location source records
│   ├── descriptions.js         # Atmosphere data arrays and sanitized image matrices
│   ├── index.js                # Standalone execution script utilizing dotenv paths
│   ├── nameData.js             # Lexical elements for title synthesis
│   └── sampleReviews.js        # Mock reviews and randomized generator logic
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
    │   ├── details.ejs         # Individual motel information, interactive maps, and reviews
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

```
git clone https://github.com/Mattsmind/camp_review.git
cd camp_review
npm install
```

Create an isolated environment configuration file in the project root folder:

`touch .env`

Populate the `.env` file with your target network socket and database credentials:

```
PORT=3000
DATABASE_URL=mongodb://127.0.0.1:27017/vacancy-vibe
```

### 3. Prime the Database
Before kicking off the application server, populate your local database with 50 geo-located retro motels along with randomized relational test reviews using the standalone seeding pipeline:

`node seeds/index.js`

### 4. Launch the Development Engine
Run the primary bootstrapper with active hot-reloading code tracking enabled:

`npm run dev`

The application will bind to your designated network port. Fire up your preferred web browser and navigate to: `http://localhost:3000/motels`.

### 5. API Testing
An exportable suite of API test configurations is included in the root directory via `insomnia_test_suite.yaml`. Import this file directly into Insomnia to test request routing constraints, edge-case parameter checks, and validation error payloads.

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.