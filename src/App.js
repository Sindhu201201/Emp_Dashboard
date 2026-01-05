import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { useEffect } from 'react';

function ProtectedRoute({ children }) {
  const isLoggedIn = sessionStorage.getItem("login");
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}


export default function App() {
  useEffect(() => {
  const handleUnload = () => {
    sessionStorage.clear();
  };
  window.addEventListener("beforeunload", handleUnload);
  return () => {
    window.removeEventListener("beforeunload", handleUnload);
  };
}, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
