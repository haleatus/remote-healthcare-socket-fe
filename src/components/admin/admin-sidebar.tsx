"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, UserCog2, UserPlus } from "lucide-react";
import { useAdmin } from "@/context/admin-context";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  // { href: "/admin/applications", icon: FileText, label: "Applications" },
  // { href: "/admin/admins", icon: Users, label: "Admins" },
  // { href: "/admin/users", icon: Users, label: "Users" },
  { href: "/admin/doctors", icon: UserPlus, label: "Doctors" },
  { href: "/admin/create-admin", icon: UserCog2, label: "Create Admin" },
  { href: "/admin/create-doctors", icon: UserPlus, label: "Create Doctors" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { admin } = useAdmin();

  return (
    <aside
      className="flex flex-col w-64 bg-gray-50 border-r font-sans rounded-[6px] ml-2"
      style={{ height: "calc(100vh - 62px)" }}
    >
      <div className="p-2 border-b">
        <Link href="/admin" className="flex items-center space-x-2">
          <span className="text-md font-bold font-space-grotesk">
            {admin?.companyName || "COMPANY NAME"}
          </span>
        </Link>
      </div>

      <ScrollArea className="flex-grow">
        <nav className="p-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-2 px-2 py-1 rounded transition-colors ${
                pathname === item.href
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <item.icon className="size-4" />
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>
      </ScrollArea>
      <div className="p-2 border-t font-mono">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Image
              className="w-10 h-10 rounded-full border-2 border-black/40"
              src={
                admin?.companyLogo ??
                "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=600"
              }
              width={40}
              height={40}
              alt={admin?.name ?? "Admin"}
            />
            <span className="top-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
          </div>
          <div>
            <p className="font-medium">{admin?.name}</p>
            <p className="text-sm text-gray-500">{admin?.role}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
