import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Mail, MessageSquareCode, User, Lock, EyeOff, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { RxDotFilled } from "react-icons/rx";
import AuthImagePattern from "../components/AuthImagePattern.jsx";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoginIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
                       group-hover:bg-primary/20 transition-colors"
              >
                <MessageSquareCode className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">
                Sign in to your account
              </p>
            </div>
          </div>

          {/* form */}
          <form onSubmit={handleSubmit} className="space-y-6">
         

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40 z-10" />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40 z-10" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoginIn}
            >
              {isLoginIn ? (
                <div className="flex -space-x-4">
                  <RxDotFilled className="animate-bounce size-8 text-[#1da1f2]" />
                  <RxDotFilled
                    className="animate-bounce size-8 text-[#f2391d]"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <RxDotFilled
                    className="animate-bounce size-8 text-[#32f21d]"
                    style={{ animationDelay: "0.4s" }}
                  />
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <div className="text-center flex gap-2">
            <p className="text-base-content/60">Don't have an account?</p>{" "}
            <Link to="/signup" className="link link-primary text-md">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      {/* right side */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Join the conversation. Meet, chat, and share!"
      />
    </div>
  );
};

export default LoginPage;
