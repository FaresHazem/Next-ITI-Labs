# 🧭 Next.js Labs - ITI Course

Hands-on Next.js projects covering App Router layouts, authentication, API routes, dynamic routing, CRUD, and MongoDB-backed data handling.

## 📚 Project Modules

| Project   | Topics                                                                          | Focus                                                    |
| --------- | ------------------------------------------------------------------------------- | -------------------------------------------------------- |
| **demo**  | App Router, nested routes, API routes, NextAuth credentials login, MongoDB CRUD | Feature-rich Next.js application structure and data flow |
| **demo2** | Route groups, shared layouts, App Router organization, nested pages             | Clean routing architecture and layout composition        |

## 📁 Repository Highlights

- Landing page with sections for products, quotes, recipes, blog, and about pages.
- Authentication flow powered by NextAuth credentials provider with a custom sign-in page.
- Products API connected to MongoDB through Mongoose.
- Dynamic routes for products, quotes, and recipes.
- Two app variants: a flat App Router structure in `demo/` and a grouped route structure in `demo2/`.

## 🚀 Quick Start

Each app has its own `package.json`, so install dependencies and run the one you want to explore.

### Run `demo`

```powershell
cd demo
npm install
npm run dev
# Open http://localhost:3000/ in your browser
```

### Run `demo2`

```powershell
cd demo2
npm install
npm run dev
# Open http://localhost:3000/ in your browser
```

## 🧰 Environment Notes

- `MONGODB_URI` is used for the products database connection.
- `NEXTAUTH_SECRET` is used by NextAuth.
- The default credentials for the sign-in page are `admin` / `admin`.
- If you are not running MongoDB in a container named `db`, set `MONGODB_URI` to your local MongoDB connection string in `.env.local`.

## ✨ Requirements

- Node.js 18+
- npm
- MongoDB for the products API and persistence layer

## 👤 Author

**Fares Hazem**

## 🎓 Course

Next.js - ITI
