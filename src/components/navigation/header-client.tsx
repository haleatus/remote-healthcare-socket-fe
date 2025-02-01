"use client";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // Make sure you have this utility function
import SignoutButton from "../auth/signout-button";
import { IUser } from "@/core/interface/user.interface";
import AdminSignoutButton from "../auth/admin/admin-signout-button";
import { AuthState } from "@/core/interface/auth-state.inteface";
import { getNavLinks } from "@/core/utils/nav-links";
import { useState } from "react";

export default function HeaderClient({
  userFromCookie,
  authState,
}: {
  userFromCookie: IUser | null;
  authState: AuthState;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isDoctor = userFromCookie?.isAdmin ? true : false;

  const navLinks = getNavLinks(authState, isDoctor);

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  const renderAuthButtons = () => {
    if (authState.isAdmin) return <AdminSignoutButton />;
    if (authState.isUser) return <SignoutButton />;

    return (
      <>
        <Link
          href="/signin"
          className={cn(
            "text-sm text-gray-700 hover:text-blue-600 relative py-1",
            "after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:scale-x-0 after:bg-blue-600 after:transition-transform after:duration-300",
            isActiveLink("/signin") && "text-gray-900 after:scale-x-100"
          )}
        >
          Signin
        </Link>
        <Link
          href="/signup"
          className={cn(
            "bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm transition-colors",
            isActiveLink("/signup") && "bg-black"
          )}
        >
          Signup →
        </Link>
      </>
    );
  };

  const NavLink = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <Link
      href={href}
      className={`flex items-center gap-2 p-2 rounded-md hover:text-gray-800 ${
        pathname === href ? "text-red-500" : ""
      }`}
      onClick={() => setIsOpen(false)}
    >
      {children}
    </Link>
  );

  return (
    <header className="bg-transparent backdrop-blur-md p-3 sticky top-0 z-50 font-space-grotesk">
      <nav className="max-w-8xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex gap-2 items-center">
          <Image
            src="/app-icons/logo.svg"
            alt="app-logo"
            height={24}
            width={24}
            style={{ objectFit: "contain" }}
          />
          <span className="text-lg font-semibold">HealthConnect</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center text-sm text-gray-700">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "hover:text-blue-600 relative py-1",
                "after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:scale-x-0 after:bg-blue-600 after:transition-transform after:duration-300",
                isActiveLink(link.href) && "text-gray-900 after:scale-x-100"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-6">
          {renderAuthButtons()}
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger className="md:hidden p-2" asChild>
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetTitle>
              <VisuallyHidden>Menu</VisuallyHidden>
            </SheetTitle>

            <div className="flex flex-col gap-6 mt-8">
              {/* Mobile Navigation Links */}
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <NavLink key={link.href} href={link.href}>
                    {link.label}
                  </NavLink>
                ))}
              </div>

              {/* Mobile Auth Buttons */}
              <div className="flex flex-col gap-4 mt-4">
                {renderAuthButtons()}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
