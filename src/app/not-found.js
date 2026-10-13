
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  Home,
  PawPrint,
  Search,
  ArrowRight,
  Heart,
} from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50 px-4 py-16">
      {/* Background decorations */}
      <motion.div
        animate={{ y: [0, -18, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[8%] top-20 hidden text-orange-200 sm:block"
      >
        <PawPrint size={72} />
      </motion.div>

      <motion.div
        animate={{ y: [0, 15, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-[8%] hidden text-amber-200 sm:block"
      >
        <PawPrint size={90} />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
        {/* Animated illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative mx-auto mb-8 flex h-48 w-48 items-center justify-center rounded-full bg-orange-100 shadow-inner shadow-orange-200/50 sm:h-56 sm:w-56"
        >
          <motion.div
            animate={{ y: [0, -9, 0], rotate: [-3, 3, -3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-36 w-36 items-center justify-center rounded-[2.5rem] bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-xl shadow-orange-500/30 sm:h-40 sm:w-40"
          >
            <PawPrint size={88} strokeWidth={1.5} />
          </motion.div>

          <motion.span
            animate={{ scale: [1, 1.2, 1], rotate: [0, 12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="absolute right-1 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-orange-500 shadow-lg"
          >
            <Heart size={24} fill="currentColor" />
          </motion.span>

          <span className="absolute bottom-3 left-2 rounded-full bg-white px-3 py-1 text-xs font-bold text-orange-600 shadow">
            Oops!
          </span>
        </motion.div>

        {/* 404 text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <p className="mb-2 text-sm font-extrabold uppercase tracking-[0.3em] text-orange-500">
            Error 404
          </p>

          <h1 className="text-4xl font-black tracking-tight text-gray-900 sm:text-6xl">
            Oops! Lost Your{" "}
            <span className="text-orange-500">Pawprints?</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
            Looks like this page wandered off! The page you are looking for
            may have moved, been removed, or never existed.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-9 flex flex-col justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-7 py-3.5 font-bold text-white shadow-lg shadow-orange-500/25 transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-xl"
          >
            <Home size={19} />
            Back to Home
          </Link>

          <Link
            href="/all-pets"
            className="group inline-flex items-center justify-center gap-2 rounded-xl border border-orange-200 bg-white px-7 py-3.5 font-bold text-orange-600 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-400 hover:bg-orange-50"
          >
            <Search size={19} />
            Explore All Pets
            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-10 text-sm text-gray-500"
        >
          Every paw deserves a home. 🐾
        </motion.p>
      </div>
    </main>
  );
}