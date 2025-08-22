import { useEffect, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import AppNavbar from "@/components/AppNavbar";
import PathConfig from "@/Routes/Pathconfig";
import axiosInstance from "@/services/axiosInstance";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "./store/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.user);

  console.log(
    "islogged in----",
    useSelector((state) => state.user)
  );
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const getUserinfo = async () => {
      try {
        await axiosInstance
          .get("/user/getUserInfo")
          .then((res) => {
            console.log("login res----", res);
            dispatch(login(res.data));
            navigate("/dashboard");
          })
          .catch((err) => {
            console.log("err----", err);
          });

        // here you could dispatch to Redux store
      } catch (err) {
        console.error("err----", err);
        // <Navigate to="/login" />;
      }
    };

    getUserinfo();
  }, [token]);

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-gray-50">
        {/* Sidebar */}
        {isLoggedIn && <AppSidebar />}

        {/* Main content area */}
        <div className="flex flex-col flex-1">
          {isLoggedIn && <AppNavbar />}
          <main className="p-10 overflow-y-auto ">
            <PathConfig />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
