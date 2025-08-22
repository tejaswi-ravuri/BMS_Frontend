import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import Dashboard from "@/pages/Dashboard";
// import BidsPage from "@/pages/BidsPage";
import BidsPage from "@/pages/BidsPage";
import SettingsPage from "@/pages/SettingsPage";
import UsersPage from "@/pages/UsersPage";
import ProfilePage from "../pages/profilePage";
export default function PathConfig() {
  // const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  function PrivateRoutes() {
    const token = localStorage.getItem("token");
    console.log("----token", token);
    return token ? <Outlet /> : <Navigate to="/login" />;
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/bids" element={<BidsPage />} /> */}
        <Route path="/bids" element={<BidsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        {role === "admin" && <Route path="/users" element={<UsersPage />} />}
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}
