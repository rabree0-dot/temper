# TemPer — Luxury Furniture E-Commerce (Sudan)

**TemPer** is a full-stack, bilingual (Arabic/English) e-commerce platform for selling all types of furniture across Sudan. Built with modern web technologies and designed with a warm, elegant wood-inspired aesthetic.

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | Next.js (App Router) | 16.2.6 |
| UI Engine | React | 19.2.6 |
| Styling | Tailwind CSS | 4.3.0 |
| Animation | Framer Motion | 12.40.0 |
| i18n | next-intl | 4.13.0 |
| Backend | Express.js | 5.2.1 |
| ORM | Prisma | 7.8.0 |
| Database | PostgreSQL (Supabase) | — |
| Auth | JWT + bcryptjs | — |
| Storage | Cloudinary | — |

---

## Project Structure

```
temper/
├── frontend/               # Next.js 16 application
│   ├── src/
│   │   ├── app/[locale]/   # Pages (public + admin)
│   │   ├── components/     # Reusable UI + shared components
│   │   ├── lib/            # Utilities & API client
│   │   ├── messages/       # i18n (en.json, ar.json)
│   │   └── routing.ts      # next-intl routing config
│   ├── middleware.ts        # Locale middleware
│   ├── next.config.ts
│   └── package.json
│
├── backend/                # Express.js API
│   ├── src/
│   │   ├── config/         # DB, Cloudinary, env
│   │   ├── controllers/    # Route handlers
│   │   ├── middleware/     # Auth, upload, validation, errors
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Logger, JWT, helpers
│   │   └── validators/     # Zod schemas
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema (10 tables)
│   │   └── seed.ts         # Product seeder
│   └── package.json
│
├── .env.example
├── README.md
└── PROJECT_MAP.md
```

---

## Features

- **Bilingual**: Full Arabic (RTL) and English (LTR) support with instant toggle
- **Responsive**: Mobile, tablet, and desktop optimized
- **Pages**: Home, Shop, Product Detail, Categories, Offers, Featured, About, Contact, Wishlist, Search, Login, Register
- **Admin Panel**: Dashboard, Products, Categories, Orders, Users, Messages, Coupons CRUD
- **Auth**: JWT-based with bcrypt password hashing
- **Image Upload**: Cloudinary with sharp optimization
- **Product Filtering**: By category, price range, search, sorting
- **Seed Data**: 20 products across 9 categories with admin user

---

## Getting Started

### Prerequisites

- Node.js >= 22
- npm >= 11
- PostgreSQL database (or Supabase project)

### Setup

1. **Clone and install dependencies**

```bash
# Install frontend
cd frontend
npm install

# Install backend
cd ../backend
npm install
```

2. **Configure environment variables**

```bash
cp .env.example .env
# Edit .env with your database URL, JWT secret, Cloudinary keys
```

3. **Database setup**

```bash
cd backend
npx prisma generate
npx prisma db push
npm run db:seed
```

4. **Run development servers**

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

5. **Open browser**

- Frontend: http://localhost:3000
- API: http://localhost:5000/api

### Default Admin Account

After seeding:
- **Email**: admin@temper.sd
- **Password**: (generated hash in seed — use register endpoint to create your admin)

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | — | Register user |
| POST | /api/auth/login | — | Login |
| GET | /api/auth/me | JWT | Get profile |
| GET | /api/products | — | List products |
| GET | /api/products/:slug | — | Product detail |
| POST | /api/products | Admin | Create product |
| PUT | /api/products/:id | Admin | Update product |
| DELETE | /api/products/:id | Admin | Delete product |
| GET | /api/categories | — | List categories |
| POST | /api/categories | Admin | Create category |
| POST | /api/orders | JWT | Create order |
| GET | /api/orders | JWT | List orders |
| POST | /api/upload | Admin | Upload image |
| GET | /api/admin/stats | Admin | Dashboard stats |

Full API documentation: See `backend/src/routes/index.ts`

---

## Deployment

### Frontend → Vercel

```bash
cd frontend
vercel --prod
```

### Backend → Render

1. Push backend to GitHub
2. Create new Web Service on Render
3. Set build command: `npm install && npx prisma generate && npm run build`
4. Set start command: `npm start`
5. Add environment variables from `.env.example`

### Database → Supabase

1. Create Supabase project
2. Copy connection string to `DATABASE_URL`
3. Run `npx prisma migrate dev`

---

## Color Palette

```css
--wood: #8B5A2B
--wood-light: #D4A574
--beige: #F5F0E8
--text: #2C2C2C
--gold: #C9A96E
--accent: #A67C52
```

---

## License

MIT
