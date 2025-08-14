import { useEffect, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import AppNavbar from "@/components/AppNavbar";
import PathConfig from "@/Routes/Pathconfig";
import axiosInstance from "@/services/axiosInstance";
import { Navigate } from "react-router-dom";
import { login } from "./store/userSlice";
import { useDispatch } from "react-redux";

export default function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      <Navigate to="/login" />;
      return;
    }

    const getUserinfo = async () => {
      try {
        await axiosInstance
          .get("/user/getUserInfo")
          .then((res) => {
            dispatch(login(res.data));
          })
          .catch((err) => {
            console.log("err----", err);
          });

        // here you could dispatch to Redux store
      } catch (err) {
        console.error("err----", err);
        <Navigate to="/login" />;
      }
    };

    getUserinfo();
  }, []);

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-gray-50">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main content area */}
        <div className="flex flex-col flex-1">
          <AppNavbar />
          <main className="p-10 overflow-y-auto ">
            <PathConfig />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
