// src/App.jsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

// Import the real Dashboard page
import Dashboard from './pages/Dashboard';

// Temporary placeholder pages
function UsersPage() {
  return (
    <div className="page-container">
      <h1 className="page-title">Users</h1>
      <p>Users page coming soon...</p>
    </div>
  );
}

function PostsPage() {
  return (
    <div className="page-container">
      <h1 className="page-title">Posts</h1>
      <p>Posts page coming soon...</p>
    </div>
  );
}

function TodosPage() {
  return (
    <div className="page-container">
      <h1 className="page-title">Todos</h1>
      <p>Todos page coming soon...</p>
    </div>
  );
}

function NotFound() {
  return (
    <div className="page-container">
      <h1 className="page-title">404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/todos" element={<TodosPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}