
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  PlusCircle,
  PawPrint,
} from "lucide-react";

const dashboardLinks = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "My Requests",
    href: "/dashboard/my-requests",
    icon: ClipboardList,
  },
  {
    name: "Add Pet",
    href: "/dashboard/add-pet",
    icon: PlusCircle,
  },
  {
    name: "My Listings",
    href: "/dashboard/my-listings",
    icon: PawPrint,
  },
];

const DashboardSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 lg:w-64">
      <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl">

        {/* Logo / Header */}
        <div className="mb-5 flex items-center gap-3 border-b border-gray-100 pb-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
            <PawPrint size={23} />
          </div>

          <div>
            <h2 className="font-bold text-gray-950">
              PetHaven
            </h2>

            <p className="text-xs text-gray-500">
              Dashboard
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {dashboardLinks.map((link) => {
            const Icon = link.icon;

            const isActive =
              pathname === link.href ||
              (link.href !== "/dashboard" &&
                pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-200"
                    : "text-gray-600 hover:bg-orange-50 hover:text-orange-500"
                }`}
              >
                <Icon
                  size={19}
                  className="transition-transform duration-300 group-hover:scale-110"
                />

                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default DashboardSidebar;

