import { useState } from "react";
import { Link } from "react-router-dom";

import { toast } from "sonner";
import { Loader2, ArrowLeft } from "lucide-react";

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

import { useAuth } from "@/context/AuthContext";

const ForgotPassword = () => {
  const { resetPassword } = useAuth();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await resetPassword(email);

      setSuccess(
        "A password reset link has been sent to your email."
      );

      toast.success("Password reset email sent.");
    } catch (err) {
      let message = "Failed to send reset email.";

      switch (err.code) {
        case "auth/user-not-found":
          message = "No account exists with this email.";
          break;

        case "auth/invalid-email":
          message = "Please enter a valid email address.";
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
            src="/logo.png"
            alt="Aga Khan HMS"
            className="h-16 w-16 mx-auto"
          />

          <CardTitle className="text-3xl font-bold text-blue-700">
            Forgot Password
          </CardTitle>

          <CardDescription>
            Enter your email and we'll send you a password reset link.
          </CardDescription>

        </CardHeader>

        <CardContent>

          {error && (
            <div className="mb-4 rounded-md border border-red-300 bg-red-100 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 rounded-md border border-green-300 bg-green-100 p-3 text-sm text-green-700">
              {success}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <Label>Email Address</Label>

              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </form>

        </CardContent>

        <CardFooter className="justify-center">
          <Link
            to="/login"
            className="flex items-center gap-2 text-blue-700 hover:underline"
          >
            <ArrowLeft size={18} />
            Back to Login
          </Link>
        </CardFooter>

      </Card>
    </div>
  );
};

export default ForgotPassword;