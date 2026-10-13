"use client";
import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  PawPrint,
  LogOut,
  LayoutDashboard,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

const Navbar = () => {
  const router = useRouter();
  const {
    data: session,
    isPending, //loading state
    error, //error object
  } = authClient.useSession();
  const user = session?.user;
  // console.log(user, "user");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error("Logout failed. Please try again.");
        return;
      }

      setIsProfileOpen(false);
      setIsMenuOpen(false);

      toast.success("Logged out successfully!");

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Something went wrong during logout.");
    }
  };

  const navLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "All Pets",
      href: "/all-pets",
    },
    {
      name: "My Requests",
      href: "/dashboard/my-requests",
    },
    {
      name: "Add Pet",
      href: "/dashboard/add-pet",
    },
  ];

  return (
    <div className="mb-18">
      
<header className="fixed inset-x-0 top-0 z-50 border-b-1 bg-white/65 shadow-[0_8px_30px_rgba(0,,0,0.1)] backdrop-blur-xl backdrop-saturate-10 ">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-gray-900"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
              <PawPrint className="h-6 w-6 text-orange-500" />
            </span>

            <span>
              Pet<span className="text-orange-500">Haven</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-medium text-gray-700 transition hover:text-orange-500"
              >
                {link.name}
              </Link>
            ))}

            {/* Logged in user */}
            {isPending ? (
              <div
                className="flex items-center gap-2 rounded-lg bg-orange-50 px-4 py-2.5 text-sm font-medium text-orange-600"
                aria-live="polite"
              >
                {" "}
                <Loader2 className="h-4 w-4 animate-spin" />{" "}
                <span>Authenticating...</span>{" "}
              </div>
            ) : error ? (
              <div
                className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600"
                role="status"
              >
                {" "}
                <AlertCircle className="h-4 w-4 shrink-0" />{" "}
                <span>Authentication unavailable</span>{" "}
              </div>
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 rounded-full border px-3 py-2 transition hover:bg-gray-50"
                >
                  <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-orange-100">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name || "User"}
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-orange-500 font-semibold text-white">
                        {user.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                    )}
                  </div>

                  <span className="font-medium">{user.name || "User"}</span>

                  <ChevronDown className="h-4 w-4" />
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-52 rounded-xl border bg-white p-2 shadow-lg">
                    <Link
                      href="/dashboard"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                    >
                      <LayoutDashboard className="h-5 w-5" />
                      Dashboard
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-red-500 hover:bg-red-50"
                    >
                      <LogOut className="h-5 w-5" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Login Button */
              <Link
                href="/login"
                className="rounded-lg bg-orange-500 px-5 py-2.5 font-semibold text-white transition hover:bg-orange-600"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-lg p-2 text-gray-700 md:hidden"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          
<div className="border-t border-white/40 bg-white/85 px-4 py-4 shadow-lg backdrop-blur-xl md:hidden">
            <div className="flex flex-col gap-2">
              {/* Navigation Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-lg px-4 py-3 font-medium text-gray-700 transition hover:bg-orange-50 hover:text-orange-500"
                >
                  {link.name}
                </Link>
              ))}

              {/* Authentication Loading */}
              {isPending ? (
                <div
                  className="flex items-center justify-center gap-2 rounded-lg bg-orange-50 px-4 py-3 text-sm font-medium text-orange-600"
                  aria-live="polite"
                >
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Authenticating...</span>
                </div>
              ) : error ? (
                /* Authentication Error */
                <div className="flex w-full flex-col gap-5" role="status">
                  <div className="flex items-start gap-2 rounded-lg bg-orange-50 px-4 py-3 text-sm text-red-600">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />

                    <span>Authentication unavailable. Please try again.</span>
                  </div>

                  <div className="w-full">
                    <Link
                      href="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="mt-2 flex w-full items-center justify-center rounded-lg bg-orange-500 px-4 py-3 font-semibold text-white transition-colors duration-200 hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                    >
                      Login
                    </Link>
                  </div>
                </div>
              ) : user ? (
                /* Logged-in User */
                <>
                  <div className=" flex items-center gap-3   border-orange-100  p-2 rounded-lg px-4 font-medium text-gray-700 transition hover:bg-orange-50 hover:text-orange-500">
                    <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-orange-100">
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt={user.name || "User"}
                          fill
                          sizes="32px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-orange-500 font-semibold text-white">
                          {user.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-semibold text-gray-900">
                        {user.name || "User"}
                      </p>

                      <p className="truncate text-sm text-gray-500">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 font-medium text-gray-700 transition hover:bg-orange-50 hover:text-orange-500"
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-left font-medium text-red-500 transition hover:bg-red-50"
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </button>
                </>
              ) : (
                /* Logged-out User */
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-2 rounded-lg bg-orange-500 px-4 py-3 text-center font-semibold text-white transition hover:bg-orange-600"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar;
