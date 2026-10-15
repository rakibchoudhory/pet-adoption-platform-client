
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Loader2,
  LockKeyhole,
  Mail,
  PawPrint,
  User,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const RegisterPage = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters.";
    }

    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }

    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }

    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const { name, email, image, password, confirmPassword } = formData;

    // Required field validation
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Password validation
    const passwordError = validatePassword(password);

    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password do not match.");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        image: image || undefined,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Registration failed.");
        return;
      }

      toast.success("Account created successfully!");

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      setGoogleLoading(true);

      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      console.error(error);
      toast.error("Google registration failed. Please try again.");
      setGoogleLoading(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-80px)] bg-orange-50/40 px-4 py-10 sm:px-6 lg:px-8">
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
              Join PetHaven
            </p>

            <h1 className="max-w-md text-4xl font-extrabold leading-tight text-white xl:text-5xl">
              Start a journey
              <span className="mt-2 block text-orange-100">
                full of love.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-orange-50">
              Create your PetHaven account and discover loving pets waiting
              for their forever home.
            </p>

            {/* Benefits */}
            <div className="mt-8 space-y-4">
              {[
                "Discover pets looking for a home",
                "Manage your adoption requests",
                "Connect with pet owners",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm text-white"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
                    <Check size={16} />
                  </span>

                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
            <p className="text-sm leading-6 text-white/90">
              Every pet deserves a loving home, and every home can be
              happier with a pet.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="p-6 sm:p-10 lg:p-12">
          <div className="mx-auto max-w-md">

            {/* Mobile Brand */}
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

            {/* Heading */}
            <div className="mb-7">
              <p className="mb-2 text-sm font-semibold text-orange-500">
                Create Account
              </p>

              <h2 className="text-3xl font-extrabold text-gray-950">
                Join PetHaven
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Create your account and start your adoption journey.
              </p>
            </div>

            {/* Google Button */}
            <button
              type="button"
              onClick={handleGoogleRegister}
              disabled={googleLoading || loading}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:border-orange-200 hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {googleLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <FcGoogle size={21} />
              )}

              {googleLoading
                ? "Connecting..."
                : "Continue with Google"}
            </button>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200" />

              <span className="text-xs font-medium text-gray-400">
                OR REGISTER WITH EMAIL
              </span>

              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* Form */}
            <form
              onSubmit={handleRegister}
              className="space-y-4"
            >

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Name
                </label>

                <div className="relative">
                  <User
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    autoComplete="name"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
                  />
                </div>
              </div>

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

              {/* Photo URL */}
              <div>
                <label
                  htmlFor="image"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Photo URL
                  <span className="ml-2 text-xs font-normal text-gray-400">
                    (Optional)
                  </span>
                </label>

                <div className="relative">
                  <ImageIcon
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="image"
                    name="image"
                    type="url"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/photo.jpg"
                    autoComplete="url"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Password
                </label>

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
                    placeholder="Create a password"
                    autoComplete="new-password"
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

                {/* Password Rules */}
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400">
                  <span>• 6+ characters</span>
                  <span>• Uppercase</span>
                  <span>• Lowercase</span>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Confirm Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-12 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (prev) => !prev
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-orange-500"
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={loading || googleLoading}
                className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-200 transition-all duration-300 hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2
                      size={20}
                      className="animate-spin"
                    />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account

                    <ArrowRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>

            {/* Login Link */}
            <p className="mt-7 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-orange-500 transition hover:text-orange-600 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;

