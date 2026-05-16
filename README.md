# Vehicle Maintenance Scheduler Backend

## Overview

This project is a backend microservice developed for optimizing vehicle maintenance scheduling for logistics depots. The system fetches depot and vehicle task data from external APIs, applies an optimization algorithm, and returns the best maintenance schedule under mechanic-hour constraints.

---

# Tech Stack

- Node.js
- Express.js
- TypeScript
- Axios
- REST APIs

---

# Project Structure

```text
vehicle_maintence_scheduler/
│
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.ts
│   └── server.ts
│
├── screenshots/
├── notification_system_design.md
├── .env
├── package.json
└── tsconfig.json
```

---

# Architecture

```text
Client/Postman
       │
       ▼
Express Server
       │
       ▼
Routes Layer
       │
       ▼
Controllers
       │
       ▼
Services ─────► External APIs
       │
       ▼
Scheduler Utility
       │
       ▼
Optimized Response
```

---

# Features

- Vehicle maintenance scheduling
- External API integration
- Logging middleware integration
- Task optimization
- REST API architecture
- Error handling

---

# API Endpoints

## Health Check

```http
GET /
```

---

## Get Vehicles

```http
GET /api/vehicles
```

---

## Schedule Optimization

```http
GET /api/schedule/:depotId
```

Example:

```http
GET /api/schedule/2
```

---

# Scheduling Logic

The scheduler selects maintenance tasks while ensuring:

```text
Total Duration <= Mechanic Hours
```

Goal:

```text
Maximize Total Impact
```

The optimization utility processes tasks and returns the best possible combination.

---

# Logging Middleware

Custom logging middleware is integrated for:

- API request tracking
- Success logs
- Failure logs
- Scheduler activity logs

---

# Environment Variable

Create `.env`

```env
ACCESS_TOKEN=your_access_token
```

---

# Run Project

Install dependencies:

```bash
npm install
```

Run server:

```bash
npm run dev
```

Server:

```text
http://localhost:5000
```

---

# Sample Response

```json
{
  "success": true,
  "depotId": 2,
  "mechanicHours": 135,
  "totalImpact": 147,
  "totalDuration": 128,
  "selectedTasks": []
}
```

---

# Screenshots

Store screenshots inside:

```text
screenshots/
```

Recommended screenshots:

- Auth success
- Scheduler API output
- Terminal output
- Logging output
- Project structure

---

# Future Improvements

- Database integration
- Redis caching
- Docker deployment
- Queue-based scheduling
- JWT authentication
