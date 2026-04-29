# Prochar Email Marketing — Next.js + MongoDB Backend

This repository was migrated from a Vite React app to Next.js and includes simple backend API routes and a minimal admin panel.

Quick start

1. Install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env.local` and fill in values (MongoDB URI, DB name, admin email/password, JWT secret):

```bash
cp .env.example .env.local
# edit .env.local
```

3. Run development server:

```bash
npm run dev
```

App notes

- Frontend remains in `src/` and is served by Next.js. The homepage mounts `src/App.tsx`.
- API routes:
  - `POST /api/contacts` — save contact form entries
  - `POST /api/purchases` — save purchase/signup entries
  - `POST /api/admin/login` — admin login (sets httpOnly `token` cookie)
  - `GET /api/admin/customers` — protected customers list
  - `GET /api/admin/purchases` — protected purchases list

- Admin UI pages: `/admin/login` and `/admin`

Database

Use MongoDB Atlas and set `MONGODB_URI` and `MONGODB_DB` in `.env.local`.

Next steps (optional)

- Add proper admin user management and password hashing in DB.
- Add logout and token refresh flows.
- Harden cookie flags (`Secure`, `SameSite`) and use HTTPS in production.
