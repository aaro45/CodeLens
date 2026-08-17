# 🚀 CodeLens – AI Powered Code Review & Comparison Platform

CodeLens is a full-stack AI-powered web application that helps developers compare code, visualize differences, review GitHub Pull Requests, and receive intelligent code analysis using Google's Gemini AI.

---

## ✨ Features

- 🔐 JWT Authentication (Login & Signup)
- 💻 Monaco Code Editor
- 🤖 AI Code Comparison using Gemini
- 📊 Similarity Percentage
- 🟢 Added / 🔴 Removed / 🟡 Modified Line Statistics
- 📑 Side-by-Side Diff Viewer
- 📄 Export AI Review as PDF
- 🕒 Comparison History
- 🗑 Delete History
- 🔗 GitHub Pull Request Integration
- 📂 Clickable Changed Files
- 🤖 AI Review of Entire Pull Requests
- 🌙 Modern Dark UI
- 📱 Responsive Design

---

# 🏗 Tech Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Monaco Editor
- Axios

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

## AI

- Google Gemini API

## Deployment

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

# 📂 Project Structure

```
CodeLens
│
├── frontend
│   ├── components
│   ├── pages
│   ├── services
│   ├── utils
│   └── hooks
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   └── services
│
└── README.md
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone <your-github-repo-url>
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

## Backend

```bash
cd backend
npm install
npm start
```

---

# 🔑 Environment Variables

Backend `.env`

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret

GEMINI_API_KEY=your_api_key
```

Frontend

```ts
baseURL:
http://localhost:5000/api
```

Before deployment

```ts
baseURL:
https://your-render-backend/api
```

---

# 🚀 Workflow

```
User
   │
   ▼
React Frontend
   │
   ▼
Express Backend
   │
   ├────────► MongoDB
   │
   ├────────► Gemini API
   │
   └────────► GitHub API
```



# 🔮 Future Enhancements

- AI Bug Detection
- AI Code Refactoring
- Repository Level Analysis
- Team Workspace
- VS Code Extension
- Multi-language Support
- AI Security Review
- Code Complexity Metrics

---

# 🎯 Learning Outcomes

- Full Stack Development
- REST API Design
- JWT Authentication
- MongoDB Integration
- Gemini AI Integration
- GitHub API Integration
- React State Management
- Deployment using Vercel & Render

---

# 👨‍💻 Author

**Aayushman Ranjan**

IIT (BHU), Varanasi

---

## ⭐ If you found this project useful, consider giving it a star!