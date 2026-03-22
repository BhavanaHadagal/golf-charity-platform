import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Charities from "./pages/Charities";

import Subscription from "./pages/Subscription";
import Draws from "./pages/Draws";
import Winnings from "./pages/Winnings";

import AdminLogin from "./pages/Admin/AdminLogin";
import AddCharity from "./pages/Admin/AddCharity";
import ManageCharities from "./pages/Admin/ManageCharities";
import ManageDraws from "./pages/Admin/ManageDraws";
import ManageWinners from "./pages/Admin/ManageWinners";
import ManageUsers from "./pages/Admin/ManageUsers";
import ManageSubscriptions from "./pages/Admin/ManageSubscriptions";
import Reports from "./pages/Admin/Reports";

const App = () => {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/charities" ||
    location.pathname === "/dashboard" ||
    location.pathname === "/subscription" ||
    location.pathname === "/draws" ||
    location.pathname === "/winnings" ||
    location.pathname.startsWith("/admin");

  return (
    <div>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/charities" element={<Charities />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/subscription"
          element={
            <ProtectedRoute>
              <Subscription />
            </ProtectedRoute>
          }
        />

        <Route
          path="/draws"
          element={
            <ProtectedRoute>
              <Draws />
            </ProtectedRoute>
          }
        />

        <Route
          path="/winnings"
          element={
            <ProtectedRoute>
              <Winnings />
            </ProtectedRoute>
          }
        />

        <Route path="/admin" element={<AdminLogin />} />

        <Route
          path="/admin/add-charity"
          element={
            <AdminRoute>
              <AddCharity />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/manage-charities"
          element={
            <AdminRoute>
              <ManageCharities />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/manage-draws"
          element={
            <AdminRoute>
              <ManageDraws />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/manage-winners"
          element={
            <AdminRoute>
              <ManageWinners />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/manage-users"
          element={
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/manage-subscriptions"
          element={
            <AdminRoute>
              <ManageSubscriptions />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/reports"
          element={
            <AdminRoute>
              <Reports />
            </AdminRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;