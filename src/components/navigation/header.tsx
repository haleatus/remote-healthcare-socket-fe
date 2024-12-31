import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"; // If available in your setup
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const navLinks = [
    { href: "/doctors", label: "Doctors" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/profile", label: "Profile" },
  ];

  return (
    <header className="bg-transparent backdrop-blur-md p-3 sticky top-0 z-50">
      <nav className="max-w-8xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex gap-2 items-center">
          <Image
            src="/app-icons/logo.svg"
            alt="app-logo"
            height={24}
            width={24}
          />
          <span className="text-lg font-semibold">HealthConnect</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center text-sm text-gray-700">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-gray-900"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/signin"
            className="text-sm text-gray-700 hover:text-gray-900"
          >
            Signin
          </Link>
          <Link
            href="/signup"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm transition-colors"
          >
            Signup →
          </Link>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger className="md:hidden p-2">
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            {/* Required DialogTitle for accessibility */}
            <SheetTitle>
              <VisuallyHidden>Menu</VisuallyHidden>
            </SheetTitle>

            <div className="flex flex-col gap-6 mt-8">
              {/* Mobile Navigation Links */}
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg text-gray-700 hover:text-gray-900"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Mobile Auth Buttons */}
              <div className="flex flex-col gap-4 mt-4">
                <Link
                  href="/signin"
                  className="text-lg text-gray-700 hover:text-gray-900"
                >
                  Signin
                </Link>
                <Link
                  href="/signup"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-lg text-center transition-colors"
                >
                  Signup →
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
