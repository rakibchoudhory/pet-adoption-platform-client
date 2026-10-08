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
} from "lucide-react";

const Navbar = () => {
  // Temporary user state
  // Authentication setup করার পর এখানে actual logged-in user বসবে
  const [user, setUser] = useState(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    // Later: actual logout function এখানে হবে
    setUser(null);
    setIsProfileOpen(false);
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
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
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
          {user ? (
            <div className="relative">

              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 rounded-full border px-3 py-2 transition hover:bg-gray-50"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 font-semibold text-white">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>

                <span className="font-medium">
                  {user.name || "User"}
                </span>

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
        <div className="border-t bg-white px-4 py-4 md:hidden">

          <div className="flex flex-col gap-2">

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-500"
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="rounded-lg px-4 py-3 text-left font-medium text-red-500 hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="mt-2 rounded-lg bg-orange-500 px-4 py-3 text-center font-semibold text-white hover:bg-orange-600"
              >
                Login
              </Link>
            )}

          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

