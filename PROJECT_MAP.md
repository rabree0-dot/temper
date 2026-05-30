# PROJECT_MAP — TemPer Furniture E-Commerce (Sudan)

> Generated: 2026-05-29 | Node v24.15.0 | npm 11.14.1

---

## [TECH_STACK]

| Layer        | Technology                  | Version  | Rationale                        |
| ------------ | --------------------------- | -------- | -------------------------------- |
| Framework    | Next.js (App Router)        | 16.2.6   | SSR, i18n, Vercel-native         |
| UI Engine    | React                       | 19.2.6   | Concurrent features              |
| Styling      | Tailwind CSS                | 4.3.0    | Utility-first, RTL support       |
| Animation    | Framer Motion               | 12.40.0  | Page/component transitions       |
| i18n         | next-intl                   | 4.13.0   | File-based, RTL/LTR, fast        |
| Backend      | Express.js                  | 5.2.1    | Mature, lightweight              |
| ORM          | Prisma                      | 7.8.0    | Type-safe, migrations, Supabase  |
| DB           | PostgreSQL (via Supabase)   | —        | Managed, scalable                |
| Auth         | jsonwebtoken + bcryptjs     | 9.0.3/3.0.3 | JWT access/refresh tokens     |
| Upload       | Cloudinary + multer + sharp | 2.10.0/2.1.1/0.34.5 | Image optimization  |
| Validation   | zod                         | 4.4.3    | Schema validation (front+back)   |
| Security     | helmet + cors               | 8.2.0/2.8.6 | HTTP headers, CORS            |
| Payments     | stripe (future)             | 22.2.0   | Prepared for later integration   |
| Email        | nodemailer                  | 8.0.10   | Order confirmations, contact     |

---

## [SYSTEM_FLOW]

```
User Browser
    │
    ├──► Next.js 16 (Vercel)
    │       ├── App Router (pages)
    │       ├── Server Actions (data mutations)
    │       ├── API Routes (BFF layer)
    │       ├── next-intl (routing + locale detection)
    │       └── Tailwind RTL/LTR
    │
    ├──► Express.js 5 (Render)
    │       ├── Controllers → Services → Prisma → Supabase/PostgreSQL
    │       ├── JWT middleware (verify, authorize)
    │       ├── Cloudinary SDK (image upload)
    │       └── zod validation layer
    │
    └──► Supabase
            ├── PostgreSQL 15
            ├── Auto-backups
            └── Connection pooling (PgBouncer)
```

### Data Flow (E2E)
1. Client → Next.js Server Action / API Route → Express REST → Prisma → PostgreSQL
2. Image Upload: Client → Next.js → Express → Cloudinary → URL stored in DB
3. Auth: Login → Express generates JWT → Stored in httpOnly cookie → Sent on each request

---

## [ARCHITECTURE]

### Directory Structure
```
temper/
├── frontend/                    # Next.js 16
│   ├── src/
│   │   ├── app/
│   │   │   ├── [locale]/        # Dynamic locale route (ar, en)
│   │   │   │   ├── (public)/    # Public layouts
│   │   │   │   │   ├── page.tsx           # Home
│   │   │   │   │   ├── shop/page.tsx      # Store
│   │   │   │   │   ├── product/[slug]/    # Product detail
│   │   │   │   │   ├── categories/       # All categories
│   │   │   │   │   ├── offers/           # Offers
│   │   │   │   │   ├── featured/         # Featured
│   │   │   │   │   ├── about/            # About us
│   │   │   │   │   ├── contact/          # Contact us
│   │   │   │   │   ├── wishlist/         # Wishlist
│   │   │   │   │   ├── search/           # Search
│   │   │   │   │   └── auth/
│   │   │   │   │       ├── login/
│   │   │   │   │       └── register/
│   │   │   │   ├── (auth)/              # Protected routes
│   │   │   │   │   └── admin/           # Admin dashboard
│   │   │   │   └── layout.tsx            # Root layout with RTL/LTR
│   │   │   ├── api/                     # Next.js API routes (BFF)
│   │   │   └── globals.css
│   │   ├── components/
│   │   │   ├── ui/          # Atoms (Button, Input, Card...)
│   │   │   ├── shared/      # Molecules (Navbar, Footer, ProductCard...)
│   │   │   └── admin/       # Admin panel components
│   │   ├── lib/
│   │   │   ├── api-client.ts    # Axios/fetch wrapper
│   │   │   ├── utils.ts         # Helpers
│   │   │   └── constants.ts     # Colors, routes, config
│   │   ├── hooks/
│   │   └── messages/
│   │       ├── en.json
│   │       └── ar.json
│   ├── middleware.ts            # next-intl middleware
│   ├── i18n.ts
│   ├── next.config.ts
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.ts      # Prisma client singleton
│   │   │   ├── cloudinary.ts    # Cloudinary config
│   │   │   └── env.ts           # zod-validated env vars
│   │   ├── controllers/         # Route handlers (thin)
│   │   │   ├── auth.controller.ts
│   │   │   ├── product.controller.ts
│   │   │   ├── category.controller.ts
│   │   │   ├── order.controller.ts
│   │   │   ├── user.controller.ts
│   │   │   ├── coupon.controller.ts
│   │   │   ├── message.controller.ts
│   │   │   └── upload.controller.ts
│   │   ├── middleware/
│   │   │   ├── auth.middleware.ts      # JWT verify
│   │   │   ├── admin.middleware.ts     # Role check
│   │   │   ├── upload.middleware.ts    # Multer config
│   │   │   ├── validate.middleware.ts  # zod validation
│   │   │   └── error.middleware.ts     # Global error handler
│   │   ├── routes/
│   │   │   └── index.ts               # Route aggregator
│   │   ├── services/                  # Business logic (fat)
│   │   │   ├── auth.service.ts
│   │   │   ├── product.service.ts
│   │   │   ├── category.service.ts
│   │   │   ├── order.service.ts
│   │   │   ├── coupon.service.ts
│   │   │   └── upload.service.ts
│   │   ├── validators/
│   │   │   ├── auth.schema.ts
│   │   │   ├── product.schema.ts
│   │   │   ├── category.schema.ts
│   │   │   ├── order.schema.ts
│   │   │   └── coupon.schema.ts
│   │   ├── utils/
│   │   │   ├── logger.ts          # Async logger (winston/pino)
│   │   │   ├── jwt.ts             # Token generation/verify
│   │   │   ├── slug.ts            # URL slug generation
│   │   │   ├── api-response.ts    # Standard response format
│   │   │   └── async-handler.ts   # Try-catch wrapper
│   │   └── app.ts                 # Express app setup
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── server.ts                  # Entry point
│   └── package.json
│
├── .env.example
├── README.md
└── PROJECT_MAP.md
```

### Domain-Driven Module Map
| Domain        | Backend Module          | Frontend Pages                | DB Tables            |
|---------------|-------------------------|-------------------------------|----------------------|
| Auth          | auth.controller/service | /login, /register             | users                |
| Products      | product.controller/svc  | /shop, /product/[slug]        | products, product_images |
| Categories    | category.controller/svc | /categories                   | categories           |
| Cart/Order    | order.controller/svc    | /cart, /checkout              | orders, order_items  |
| Wishlist      | — (direct DB)           | /wishlist                     | wishlist             |
| Reviews       | — (direct DB)           | /product/[slug]               | reviews              |
| Coupons       | coupon.controller/svc   | /checkout (admin)             | coupons              |
| Contact       | message.controller/svc  | /contact                      | messages             |
| Admin         | all controllers         | /admin/*                      | all tables           |

### API Design (REST)
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh
GET    /api/auth/me

GET    /api/products?category=&search=&priceMin=&priceMax=&sort=&page=&limit=
GET    /api/products/featured
GET    /api/products/offers
GET    /api/products/:slug
POST   /api/products          [admin]
PUT    /api/products/:id      [admin]
DELETE /api/products/:id      [admin]

GET    /api/categories
POST   /api/categories        [admin]
PUT    /api/categories/:id    [admin]
DELETE /api/categories/:id    [admin]

GET    /api/orders            [admin]
GET    /api/orders/my
PUT    /api/orders/:id/status [admin]

POST   /api/upload            [admin]
DELETE /api/upload/:publicId  [admin]

POST   /api/coupons           [admin]
GET    /api/coupons           [admin]
PUT    /api/coupons/:id       [admin]
DELETE /api/coupons/:id       [admin]

POST   /api/messages
GET    /api/messages          [admin]

GET    /api/wishlist
POST   /api/wishlist
DELETE /api/wishlist/:productId

POST   /api/reviews
GET    /api/reviews/:productId

GET    /api/admin/stats       [admin]
```

### Database Schema (Prisma)

```prisma
model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  password  String
  phone     String?
  role      Role     @default(USER)
  address   Json?
  image     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  orders    Order[]
  wishlist  Wishlist[]
  reviews   Review[]
  messages  Message[]
}

enum Role { USER ADMIN }

model Product {
  id          String   @id @default(cuid())
  nameEn      String
  nameAr      String
  slug        String   @unique
  descriptionEn String?
  descriptionAr String?
  price       Decimal
  comparePrice Decimal?
  stock       Int      @default(0)
  categoryId  String
  featured    Boolean  @default(false)
  isOffer     Boolean  @default(false)
  isUsed      Boolean  @default(false)
  isActive    Boolean  @default(true)
  tags        String[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  category    Category       @relation(fields: [categoryId], references: [id])
  images      ProductImage[]
  orderItems  OrderItem[]
  wishlist    Wishlist[]
  reviews     Review[]
}

model Category {
  id        String   @id @default(cuid())
  nameEn    String
  nameAr    String
  slug      String   @unique
  image     String?
  parentId  String?
  createdAt DateTime @default(now())

  parent   Category?  @relation("CategoryParent", fields: [parentId], references: [id])
  children Category[] @relation("CategoryParent")
  products Product[]
}

model ProductImage {
  id        String @id @default(cuid())
  productId String
  url       String
  publicId  String
  order     Int    @default(0)

  product Product @relation(fields: [productId], references: [id], onDelete: Cascade)
}

model Order {
  id          String   @id @default(cuid())
  userId      String
  total       Decimal
  status      OrderStatus @default(PENDING)
  phone       String?
  address     Json?
  notes       String?
  paymentMethod String  @default("cod")
  createdAt   DateTime @default(now())

  user        User        @relation(fields: [userId], references: [id])
  items       OrderItem[]
}

enum OrderStatus { PENDING CONFIRMED PROCESSING SHIPPED DELIVERED CANCELLED }

model OrderItem {
  id        String @id @default(cuid())
  orderId   String
  productId String
  quantity  Int
  price     Decimal

  order   Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  product Product @relation(fields: [productId], references: [id])
}

model Wishlist {
  id        String @id @default(cuid())
  userId    String
  productId String

  user    User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  product Product @relation(fields: [productId], references: [id], onDelete: Cascade)

  @@unique([userId, productId])
}

model Review {
  id        String   @id @default(cuid())
  userId    String
  productId String
  rating    Int
  comment   String?
  createdAt DateTime @default(now())

  user    User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  product Product @relation(fields: [productId], references: [id], onDelete: Cascade)
}

model Coupon {
  id        String   @id @default(cuid())
  code      String   @unique
  discount  Decimal
  type      CouponType @default(PERCENTAGE)
  minAmount Decimal?
  maxUses   Int?
  usedCount Int      @default(0)
  expiresAt DateTime?
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
}

enum CouponType { PERCENTAGE FIXED }

model Message {
  id        String   @id @default(cuid())
  name      String
  email     String
  phone     String?
  subject   String
  message   String
  isRead    Boolean  @default(false)
  createdAt DateTime @default(now())
}
```

---

## [ORPHANS & PENDING]

| Item                      | Status       | Notes                             |
| ------------------------- | ------------ | --------------------------------- |
| Stripe integration        | Post-MVP     | Sudan banking — deferred          |
| SMS notifications         | Post-MVP     | Requires local SMS gateway        |
| Product reviews UI (front)| Phase 2.5    | API complete, frontend pending    |
| Cart/Checkout flow        | Phase 2.5    | API complete, frontend pending    |
| Advanced search (Elastic) | Post-MVP     | PostgreSQL full-text search first |
| SEO metadata generator    | Phase 2      | Per-page meta tags                |
| sitemap.xml               | Phase 2      | Dynamic from categories/products  |
| PWA / offline             | Post-MVP     | Not in initial scope              |
| Multi-currency            | Not planned  | SDG only                          |
| npm install               | **BLOCKED**  | Network ECONNRESET in sandbox     |

## [CURRENT STATUS — 2026-05-29]

### ✅ Completed
- **Phase 1.1**: Next.js 16 + Tailwind 4 + Framer Motion + i18n scaffold
- **Phase 1.2**: Express 5 + Prisma schema (10 tables) + all models
- **Phase 1.3**: Seed script (20 products, 9 categories, 2 coupons, admin user)
- **Phase 1.4**: JWT auth (register/login/me/middleware) + role-based guards
- **Phase 1.5**: UI Kit (Button, Input, Card) + Navbar + Footer + RTL locale switcher
- **Phase 2.1-2.5**: All 13 public pages + admin dashboard (7 sub-pages)
- **Phase 2.6**: Backend API (15 controllers, 30+ endpoints)
- **Phase 3**: Admin CRUD pages (Products, Categories, Orders, Users, Messages, Coupons)
- **Phase 4**: README.md, .env.example (front/back), deploy config (Vercel + Render + Supabase)
- **Configs**: tsconfig, next.config, postcss, middleware, tailwind globals

### 📦 Source Files
| Area | Files |
|------|-------|
| Frontend | 36 source files (pages, components, lib, messages) |
| Backend  | 31 source files (controllers, middleware, routes, utils, validators) |
| Prisma   | 2 files (schema + seed with 20 products) |
| Config   | 10 config files (tsconfig, env, next, postcss, etc.) |

### 🚧 Blocked
- `npm install` — network ECONNRESET in sandbox environment
- `prisma generate` / `prisma db push` — requires successful npm install
- To unblock: run `cd frontend && npm install && cd ../backend && npm install && npx prisma generate && npx prisma db push && npm run db:seed`

---

## [MILESTONES — Verifiable Goals]

### Phase 1: Foundation (Days 1-3)
| # | Goal | Verification |
|---|------|-------------|
| 1.1 | Initialize Next.js 16 + Tailwind 4 + Framer Motion | `npm run dev` renders homepage |
| 1.2 | Setup Express 5 + Prisma + PostgreSQL (Supabase) | `prisma db push` succeeds, `/api/health` returns 200 |
| 1.3 | Configure next-intl (ar/en) with RTL/LTR toggle | Toggle switches layout direction |
| 1.4 | Create all Prisma models + first migration | `prisma migrate dev` generates SQL |
| 1.5 | Seed script inserts 20+ products across 8+ categories | `prisma db seed` populates DB |
| 1.6 | JWT auth (register/login/me) with bcryptjs | POST /api/auth/login returns token |

### Phase 2: Core Frontend (Days 4-7)
| # | Goal | Verification |
|---|------|-------------|
| 2.1 | Shared UI kit (Button, Input, Card, Modal, Select) | Story exists in /components/ui |
| 2.2 | Navbar + Footer with i18n links + locale switcher | Navbar renders in both languages |
| 2.3 | Hero section + Featured Categories (homepage) | Homepage matches IKEA-like design |
| 2.4 | Shop page with filters (category, price, sort) + pagination | `/shop` renders products from API |
| 2.5 | Product detail page with image gallery | `/product/[slug]` shows images + info |
| 2.6 | Wishlist (add/remove, persisted to DB) | Heart toggle works across sessions |
| 2.7 | Search page with debounced input | `/search?q=` returns results |

### Phase 3: Admin Panel (Days 8-10)
| # | Goal | Verification |
|---|------|-------------|
| 3.1 | Admin login + middleware guard | Non-admin redirected from `/admin` |
| 3.2 | Dashboard with stats (sales, orders, users) | Charts render real data from `/api/admin/stats` |
| 3.3 | Product CRUD with Cloudinary upload | Create/edit/delete product succeeds |
| 3.4 | Category CRUD | Create/edit/delete category succeeds |
| 3.5 | Order management (list, status update) | Order status change persists |
| 3.6 | Messages inbox (read/mark) | Contact form submissions appear |
| 3.7 | Coupon management | Coupon validates at checkout |

### Phase 4: Polish & Deploy (Days 11-12)
| # | Goal | Verification |
|---|------|-------------|
| 4.1 | Responsive QA (mobile/tablet/desktop) | Lighthouse mobile ≥ 85 |
| 4.2 | Performance audit (LCP, CLS, TBT) | Lighthouse performance ≥ 80 |
| 4.3 | Security hardening (helmet, rate-limit, input sanitize) | OWASP ZAP scan passes |
| 4.4 | Deploy frontend to Vercel + backend to Render | Public URLs return 200 |
| 4.5 | Configure custom domain + Supabase production | DNS propagates, SSL active |

---

### Color Palette
```
--color-white:        #FFFFFF
--color-wood:         #8B5A2B  (warm brown)
--color-wood-light:   #D4A574
--color-beige:        #F5F0E8
--color-beige-dark:   #E8DCCC
--color-text:         #2C2C2C
--color-text-muted:   #6B6B6B
--color-accent:       #A67C52
--color-gold:         #C9A96E
```

---

**Next action required:** Approve this architecture plan to proceed with Phase 1 implementation.
