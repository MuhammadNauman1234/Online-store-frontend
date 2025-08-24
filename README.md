# 🛍️ Online Store Frontend

A modern, responsive e-commerce frontend built with React, TypeScript, and Vite. Features a dynamic shopping cart, item management, and a beautiful green-themed UI.

## ✨ Features

- **🛒 Shopping Cart**: Add, remove, and manage items with Redux Toolkit
- **📱 Responsive Design**: Mobile-first approach with Tailwind CSS
- **🔍 Search & Sort**: Find items quickly with real-time search and sorting
- **📝 Item Management**: Add new items with image upload support
- **🎨 Modern UI**: Clean, green-themed interface with smooth animations
- **⚡ Fast Performance**: Built with Vite for optimal development experience

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **HTTP Client**: Axios
- **Routing**: React Router
- **Icons**: React Icons

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Button, Input, Header, etc.
│   ├── features/       # Feature-specific components
│   └── layouts/        # Layout components
├── pages/              # Page components
├── store/              # Redux store and slices
├── services/           # API services
├── utils/              # Utility functions
└── lib/                # Third-party library configs
```

## 🛠️ Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 🌐 API Integration

The frontend integrates with a backend API providing:

- **GET** `/items/` - Fetch all items
- **POST** `/items/` - Create new item
- **GET** `/items/:id` - Get item by ID
- **DELETE** `/items/:id` - Delete item

## 🎨 Design System

- **Primary Colors**: Green (#16a34a) and White
- **Typography**: Clean, readable fonts
- **Spacing**: Consistent 4px grid system
- **Components**: Reusable, accessible UI components

## 📱 Pages

- **Home** - Welcome page with featured products
- **Items** - Product catalog with search and sorting
- **Add Item** - Form to add new products
- **Cart** - Shopping cart management
- **Checkout** - Order completion

## 🔧 Development

- **Code Quality**: ESLint configuration
- **Type Safety**: Full TypeScript support
- **Hot Reload**: Fast development with Vite
- **Proxy**: CORS-free development with Vite proxy

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌟 Key Components

- **Button** - Versatile button with multiple variants
- **InputField** - Form input with validation
- **ItemCard** - Product display card
- **FileUpload** - Image upload component
- **Header** - Navigation with cart integration

## 🔄 State Management

- **Redux Toolkit** for global state
- **Cart Slice** - Shopping cart functionality
- **Items Slice** - Product data management
- **Async Thunks** - API integration

## 📄 License

This project is part of an assessment task for Productbox.

---

Built with ❤️ using modern web technologies
