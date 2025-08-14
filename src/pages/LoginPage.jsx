import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { baseurl } from "@/Boot/config.json";
import { useDispatch } from "react-redux";
import { login } from "@/store/userSlice";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setLoginDetails((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = loginDetails;
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    axios
      .post(`${baseurl}/auth/login`, loginDetails)
      .then((res) => {
        console.log("login res---", res);
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("role", user.role);
        dispatch(login(user));
        console.log("-----1");
        navigate("/dashboard");
        console.log("------2");
      })
      .catch((err) => {
        console.log("login err---", err);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Bid Management System
          </CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={loginDetails.email}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={loginDetails.password}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
