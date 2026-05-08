# Lumina Skin Clinic Platform

Premium full-stack dermatology and aesthetic clinic platform built with React, Vite, Tailwind CSS, Framer Motion, Express, MongoDB, Mongoose, JWT, and bcrypt.

## Run locally

1. Copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`.
2. Start MongoDB locally or use MongoDB Atlas.
3. Install dependencies:

```bash
npm install
```

4. Seed demo data:

```bash
npm run seed
```

5. Run frontend and backend:

```bash
npm run dev
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:5000/api`

## Demo accounts

Admin: `admin@lumina.com` / `password123`

Patient: `patient@lumina.com` / `password123`

## Main features

- Public luxury clinic website with services, doctor profile, testimonials, gallery, contact, and footer.
- JWT authentication with register, login, protected routes, logout, and persisted auth.
- Role-based dashboards for patient and admin users.
- Booking flow for service, doctor, date, and time slot.
- Patient profile management, appointment history, upcoming bookings, cancellations, and notifications.
- Admin overview, analytics cards, booking statistics, appointments, doctors, services, and users.
- REST API with Mongoose models for User, Doctor, Service, and Appointment.
