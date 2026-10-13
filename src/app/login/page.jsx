"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  PawPrint,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      toast.error("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await authClient.signIn.email({
        email,
        password,
        rememberMe: true,
      });

      if (error) {
        toast.error(
          error.message || "Invalid email or password."
        );
        return;
      }

      toast.success("Login successful!");

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);

      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      console.error(error);

      toast.error(
        "Google login failed. Please try again."
      );

      setGoogleLoading(false);
    }
  };



  return (
    <section className="min-h-[calc(100vh-80px)] bg-orange-50/40 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-2xl lg:grid-cols-2">

        {/* Left Side */}
        <div className="relative hidden overflow-hidden bg-orange-500 p-10 lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-400/40" />
          <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-orange-600/40" />

          <div className="relative z-10">
            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-orange-500 shadow-lg">
              <PawPrint size={30} />
            </div>

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-orange-100">
              Welcome Back
            </p>

            <h1 className="max-w-md text-4xl font-extrabold leading-tight text-white xl:text-5xl">
              Give a pet a home.
              <span className="mt-2 block text-orange-100">
                Find a friend for life.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-orange-50">
              Sign in to discover loving pets, manage your
              adoption requests, and make a difference in a
              pet's life.
            </p>
          </div>

          <div className="relative z-10 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
            <p className="text-sm leading-6 text-white/90">
              "Until one has loved an animal, a part of one's
              soul remains unawakened."
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="p-6 sm:p-10 lg:p-12">
          <div className="mx-auto max-w-md">

            {/* Mobile Logo */}
            <div className="mb-7 flex items-center gap-3 lg:hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                <PawPrint size={23} />
              </div>

              <div>
                <h2 className="font-bold text-gray-950">
                  PetHaven
                </h2>
                <p className="text-xs text-gray-500">
                  Pet Adoption Platform
                </p>
              </div>
            </div>

            <div className="mb-8">
              <p className="mb-2 text-sm font-semibold text-orange-500">
                Welcome back
              </p>

              <h2 className="text-3xl font-extrabold text-gray-950">
                Sign in to your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Continue your journey and find your perfect
                companion.
              </p>
            </div>

            {/* Google Login */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={googleLoading || loading}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:border-orange-200 hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {googleLoading ? (
                <Loader2
                  size={20}
                  className="animate-spin"
                />
              ) : (
                <FcGoogle size={21} />
              )}

              {googleLoading
                ? "Connecting..."
                : "Continue with Google"}
            </button>

            {/* Divider */}
            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs font-medium text-gray-400">
                OR CONTINUE WITH EMAIL
              </span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* Login Form */}
            <form
              onSubmit={handleLogin}
              className="space-y-5"
            >
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Email
                </label>

                <div className="relative">
                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Password
                  </label>

                  <span className="text-xs font-medium text-gray-400">
                    Keep it secure
                  </span>
                </div>

                <div className="relative">
                  <LockKeyhole
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-12 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-orange-500"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading || googleLoading}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-200 transition-all duration-300 hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2
                      size={20}
                      className="animate-spin"
                    />
                    Signing in...
                  </>
                ) : (
                  <>
                    Login
                    <ArrowRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>

            {/* Register */}
            <p className="mt-8 text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-bold text-orange-500 transition hover:text-orange-600 hover:underline"
              >
                Create an account
              </Link>
            </p>

          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
