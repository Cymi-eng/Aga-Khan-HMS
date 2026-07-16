import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { auth } from "@/config/firebase";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      await loginWithGoogle();

      toast.success("Welcome back!");

      navigate(from, { replace: true });
    } catch (err) {
      if (err.code !== "auth/popup-closed-by-user") {
        toast.error("Google sign in failed.");
        setError("Google sign in failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");

  try {
    setLoading(true);

    // Login with Firebase
    const userCredential = await login(
      formData.email,
      formData.password
    );

    const user = userCredential.user;

    // Check if the logged-in user is an admin
    const adminDoc = await getDoc(doc(db, "admins", user.uid));
    console.log("Logged in UID:", user.uid);
    console.log("Admin exists:", adminDoc.exists());

    toast.success("Login successful!");

    if (adminDoc.exists()) {
      navigate("/admin/dashboard", { replace: true });
    } else {
      navigate(from, { replace: true });
    }
  } catch (err) {
    let message = "Failed to login.";

    switch (err.code) {
      case "auth/user-not-found":
        message = "No account exists with this email.";
        break;

      case "auth/wrong-password":
        message = "Incorrect password.";
        break;

      case "auth/invalid-credential":
        message = "Invalid email or password.";
        break;

      case "auth/invalid-email":
        message = "Invalid email address.";
        break;

      default:
        break;
    }

    setError(message);
    toast.error(message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-white to-blue-100 p-5">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="text-center space-y-3">
          <img
            src="khan.logo.jpg"
            alt="Aga Khan"
            className="h-16 w-16 mx-auto"
          />

          <CardTitle className="text-3xl font-bold text-blue-700">
            Welcome Back
          </CardTitle>

          <CardDescription>
            Login to Aga Khan Hospital Management System
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="mb-4 rounded-md bg-red-100 border border-red-300 text-red-700 p-3 text-sm">
              {error}
            </div>
          )}

          <Button
            variant="outline"
            className="w-full gap-3"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              className="h-5"
              alt="Google"
            />
            Continue with Google
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>

            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-xs uppercase text-gray-500">
                or continue with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Email Address</Label>

              <Input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Password</Label>

              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className="pr-10"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-700 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center">
          <p className="text-sm text-gray-600">
            Don't have an account?
            <Link
              to="/register"
              className="ml-2 text-blue-700 font-semibold hover:underline"
            >
              Create Account
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
