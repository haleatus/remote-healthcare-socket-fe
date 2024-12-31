import Link from "next/link";
import Image from "next/image";
import { HomeIcon } from "lucide-react";

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center text-center ">
      <div className="relative w-64 h-64">
        <Image
          src="/app-icons/404.svg"
          alt="404 Not Found"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <h1 className="text-3xl font-extrabold text-gray-800 mt-8">
        Oops! Page not found
      </h1>
      <p className="text-md text-gray-600 mt-4 max-w-lg">
        The page you&apos;re looking for doesn&apos;t exist or may have been
        moved. Please check the URL or head back to the homepage.
      </p>
      <Link
        href="/"
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 flex items-center rounded-full text-[14px] font-medium transition-colors"
      >
        <HomeIcon className="inline-block w-4 h-4  mr-2 " />
        Back to Home
      </Link>
    </div>
  );
}
