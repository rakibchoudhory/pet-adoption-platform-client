import Link from "next/link";
import { PawPrint, Mail, Phone, MapPin } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import CurrentYear from "../CurrentYear";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="mb-4 flex items-center gap-2 text-2xl font-bold text-white"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500">
                <PawPrint className="h-6 w-6 text-white" />
              </span>

              <span>
                Pet<span className="text-orange-500">Haven</span>
              </span>
            </Link>

            <p className="max-w-sm text-sm leading-6 text-gray-400">
              Giving loving pets a second chance to find a safe, caring, and
              forever home. Together, we can make a difference.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition hover:bg-orange-500 hover:text-white"
              >
                <FaFacebookF className="h-5 w-5" />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition hover:bg-orange-500 hover:text-white"
              >
                <FaInstagram className="h-5 w-5" />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition hover:bg-orange-500 hover:text-white"
              >
                <FaTwitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="transition hover:text-orange-500">
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/all-pets"
                  className="transition hover:text-orange-500"
                >
                  All Pets
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard/my-requests"
                  className="transition hover:text-orange-500"
                >
                  My Requests
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard/add-pet"
                  className="transition hover:text-orange-500"
                >
                  Add Pet
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard"
                  className="transition hover:text-orange-500"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Pet Care */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">Pet Care</h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="transition hover:text-orange-500">
                  Pet Care Tips
                </Link>
              </li>

              <li>
                <Link href="/" className="transition hover:text-orange-500">
                  Adoption Guide
                </Link>
              </li>

              <li>
                <Link href="/" className="transition hover:text-orange-500">
                  Pet Health
                </Link>
              </li>

              <li>
                <Link href="/" className="transition hover:text-orange-500">
                  Success Stories
                </Link>
              </li>

              <li>
                <Link href="/" className="transition hover:text-orange-500">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Contact Us
            </h3>

            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />

                <span>Dhaka, Bangladesh</span>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-orange-500" />

                <a
                  href="mailto:hello@pethaven.com"
                  className="transition hover:text-orange-500"
                >
                  hello@pethaven.com
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-orange-500" />

                <a
                  href="tel:+8801000000000"
                  className="transition hover:text-orange-500"
                >
                  +8801894065729
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-sm text-gray-500 sm:px-6 md:flex-row lg:px-8">
          <p>
            © <CurrentYear /> PetHaven. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <Link href="/" className="transition hover:text-orange-500">
              Privacy Policy
            </Link>

            <Link href="/" className="transition hover:text-orange-500">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
