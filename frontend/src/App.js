import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import Nav from './components/Nav';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import SplashPage from './pages/SplashPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import RegisterPage from './pages/RegisterPage';
import PostPage from './pages/PostPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import CreatePostPage from './pages/CreatePostPage';
import EditPostPage from './pages/EditPostPage';
import AdminPage from './pages/AdminPage';
import FeedPage from './pages/FeedPage';
import PublicProfilePage from './pages/PublicProfilePage';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  // Splash screen timer
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Dark mode toggle logic
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Show splash screen for the first 3 seconds
  if (showSplash) {
    return <SplashPage />;
  }

  return (
    <>
      <Nav darkMode={darkMode} setDarkMode={setDarkMode} />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage darkMode={darkMode} />} />
        <Route path="/home" element={<HomePage darkMode={darkMode} />} />  {/* ← add this */}
        <Route path="/feed" element={<FeedPage darkMode={darkMode} />} />  {/* ← add this */}
        <Route path="/profile/:id" element={<PublicProfilePage darkMode={darkMode} />} />
        <Route path="/about" element={<AboutPage darkMode={darkMode} />} />
        <Route path="/contact" element={<ContactPage darkMode={darkMode} />} />
        <Route path="/login" element={<LoginPage darkMode={darkMode} />} />
        <Route path="/register" element={<RegisterPage darkMode={darkMode} />} />
        <Route path="/posts/:id" element={<PostPage darkMode={darkMode} />} />

        {/* Protected routes — must be logged in */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-post"
          element={
            <ProtectedRoute>
              <CreatePostPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-post/:id"
          element={
            <ProtectedRoute>
              <EditPostPage />
            </ProtectedRoute>
          }
        />

        {/* Admin only */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;