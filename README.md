--- BEGIN README ---
<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:18181b,100:3f3f46&height=220&section=header&text=URBAN%20SHOPY&fontSize=72&fontColor=ffffff&fontAlignY=38&desc=Style%20for%20Everyday%20Life.&descAlignY=58&descSize=18&animation=fadeIn" width="100%" />

<br />

<p>
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white&labelColor=18181b" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white&labelColor=18181b" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white&labelColor=18181b" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white&labelColor=18181b" alt="Tailwind CSS" />
</p>

<p>
  <img src="https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white&labelColor=18181b" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-4-000000?style=for-the-badge&logo=express&logoColor=white&labelColor=18181b" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white&labelColor=18181b" alt="MongoDB" />
  <img src="https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white&labelColor=18181b" alt="JWT" />
</p>

<br />

<h3><em>"Everyday Style. Reimagined."</em></h3>
<p>Discover thoughtfully selected essentials designed for modern urban living.</p>

<br />

### 🌐 Live Demo

| Service | URL |
|:---|:---|
| 🛍️ **Frontend** | **[urban-shopy-client.onrender.com](https://urban-shopy-client.onrender.com)** |
| ⚙️ **Backend API** | **[urban-shopy-api.onrender.com](https://urban-shopy-api.onrender.com)** |
| ❤️ **API Health** | **[urban-shopy-api.onrender.com/api/health](https://urban-shopy-api.onrender.com/api/health)** |

> ⚠️ Both services run on Render's **free tier** — first request after 15 minutes of inactivity may take **~50 seconds** to wake up.

<br />

### 🎬 Demo Credentials

| Role | Email | Password |
|:---|:---|:---|
| 👤 **Customer** | `demo@urbanshopy.com` | `password123` |
| 🔧 **Admin** | `admin@urbanshopy.com` | `admin123` |

**Try the full flow:** Browse → Add to cart → Checkout (COD) → View orders.

**Admin panel:** Login as admin → visit [`/admin`](https://urban-shopy-client.onrender.com/admin) to manage products, orders, and users.

<br />

<a href="#-features"><kbd>✨ Features</kbd></a>
<a href="#-tech-stack"><kbd>🛠 Tech Stack</kbd></a>
<a href="#-local-setup"><kbd>🚀 Local Setup</kbd></a>
<a href="#-deployment"><kbd>☁️ Deployment</kbd></a>
<a href="#-api-endpoints"><kbd>🔌 API</kbd></a>

<br />

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%" />

</div>

<br />

## 📖 Overview

**Urban Shopy** is a full-stack MERN e-commerce platform featuring a premium storefront, product catalog with filtering and search, cart and wishlist management, JWT authentication, an admin panel, and Cash on Delivery checkout.

<br />

## ✨ Features

### 🛒 Storefront
- Premium responsive homepage with hero and category grid
- Product catalog with search, filter, sort
- Product details with image gallery, size and color variants
- Quick view modal
- Wishlist

### 🔐 Authentication
- Register / Login with JWT
- bcrypt password hashing
- Protected routes and session persistence
- Role-based access (user / admin)

### 💼 Shopping
- Persistent cart (localStorage + Redux)
- Free shipping progress indicator
- COD checkout with full form validation
- Order history and detailed order view

### 👑 Admin Panel
- Dashboard with revenue, orders, products, users
- Product CRUD (create, edit, delete)
- Order management with status changer
- User list

<br />

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%" />

<br />

## 🛠 Tech Stack

### Frontend
| Tool | Purpose |
|:---|:---|
| **React 18** + **TypeScript** | UI framework |
| **Vite** | Build tool |
| **Tailwind CSS** | Styling |
| **Redux Toolkit** | State management |
| **React Router v6** | Routing |
| **Framer Motion** | Animations |
| **Lucide React** | Icons |

### Backend
| Tool | Purpose |
|:---|:---|
| **Node.js** + **Express** | API server |
| **MongoDB** + **Mongoose** | Database |
| **JWT** | Authentication |
| **bcryptjs** | Password hashing |
| **TypeScript** | Type safety |

### Deployment
- **Frontend:** Render Static Site
- **Backend:** Render Web Service
- **Database:** MongoDB Atlas

<br />

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%" />

<br />

## 🚀 Local Setup

### Prerequisites

| Tool | Version |
|:---|:---|
| Node.js | 18 or higher |
| npm | 9 or higher |
| Git | latest |
| MongoDB | local or Atlas |

> 💡 **Tip:** Use [MongoDB Atlas](https://www.mongodb.com/atlas) (free cloud) so you don't need to install MongoDB locally.

### Step 1 — Clone the repository

```bash
git clone https://github.com/alif616/urban-shopy.git
cd urban-shopy
