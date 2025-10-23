# Task Manager Project

## Overview
**Task Manager** is a lightweight JavaScript-based application that allows users to **create, read, update, and delete tasks**. The project emphasizes modern best practices, including **automated testing with Jest and Supertest**, **server-side routing with Express**, and **task data management using UUIDs**.

---

## Features

- **CRUD Operations**: Create, view, edit, and delete tasks.  
- **Task Validation**: Ensures tasks have valid input before adding or updating.  
- **Unique Task IDs**: Every task is assigned a UUID for unique identification.  
- **API Endpoints**: Organized RESTful routes for task management.  

**Automated Testing:**
- Unit tests for utilities and validation.
- API endpoint tests using Jest and Supertest.

**Development Tools:**
- Nodemon for live server reloading.
- CORS enabled for API access from different origins.

---

## Project Structure

server.js – Main server entry point
src/routes.js – Task API routes and endpoint definitions
src/utils.js – Utility functions and validation logic
tests/ – Folder containing Jest test suites
├─ api.test.js – API endpoint tests
└─ utils.test.js – Utility function tests
package.json – Project dependencies and scripts

yaml
Copy code

---

## Installation

1. Clone the repository  
2. Navigate to the project folder  
3. Install dependencies using npm:

```bash
npm install
Scripts
Start server in development mode with live reload:

bash
Copy code
npm run dev
Run automated tests:

bash
Copy code
npm test
Run tests in watch mode:

bash
Copy code
npm run test:watch
Dependencies
Express: Web server framework

UUID: Generates unique IDs for tasks

CORS: Enables cross-origin requests

Jest: Unit testing framework

Supertest: API endpoint testing

Nodemon: Development server auto-reloading

Usage
Start the development server.

Use API endpoints under /api to manage tasks.

Run automated tests to validate utilities and API routes.

Notes
The project is designed for local development and testing.

UUID ensures task uniqueness across the application.

Automated testing ensures reliability before deploying or extending features.