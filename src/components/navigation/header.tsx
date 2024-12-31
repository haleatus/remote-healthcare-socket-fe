import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeartPulse } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-transparent backdrop-blur-md border-b p-4 sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-center">
          <HeartPulse className="mr-2 text-red-500 animate-pulse" />
          HealthConnect
        </Link>
        <div className="space-x-4">
          <Button
            variant="outline"
            asChild
            className="text-black border-primary-foreground hover:bg-primary-foreground hover:text-primary"
          >
            <Link href="/signin">Sign In</Link>
          </Button>
          <Button
            variant="outline"
            asChild
            className="text-black border-primary-foreground hover:bg-primary-foreground hover:text-primary"
          >
            <Link href="/signup">Sign Up</Link>
          </Button>
          <Button
            variant="outline"
            asChild
            className="text-black border-primary-foreground hover:bg-primary-foreground hover:text-primary"
          >
            <Link href="/doctors/dashboard">Doctor Dashboard</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
