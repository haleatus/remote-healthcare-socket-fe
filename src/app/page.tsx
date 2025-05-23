import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getCurrentUserFromCookie } from "./actions/user/get-current-user-from-cookie.action";
import CreateUserApplicationClient from "@/components/user/applications/create-user-application-client";
import { getCurrentUserAccessToken } from "./actions/user/get-current-user-access-token";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrentUserFromCookie();
  const accessToken = await getCurrentUserAccessToken();

  if (!accessToken || !user) {
    redirect("/signin?message=unauthorized");
  }

  return (
    <div className="flex items-center justify-center font-space-grotesk">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between space-y-8 px-4 md:space-y-0 mt-10">
        {/* Left Section */}
        <div className="max-w-xl text-center md:text-left space-y-6">
          <div className="inline-flex items-center pl-1.5 pr-3 py-1.5 bg-white rounded-full text-gray-600 font-medium">
            <div className="size-[32px] rounded-full bg-[#E8ECF9] mr-2 flex items-center justify-center">
              <span>
                <StarIcon />
              </span>
            </div>
            4.5+ star rated doctors
          </div>
          <h1 className="text-[76px] font-bold text-gray-900 leading-tight">
            Health for a new generation
          </h1>
          <p className="text-lg text-gray-600 font-sans">
            At health connect, we believe health care should be easily
            approachable, personalized, and simple.
          </p>
          <div className="flex justify-center md:justify-start space-x-4">
            {user && !user?.isAdmin && (
              <CreateUserApplicationClient accessToken={accessToken} />
            )}
            {user ? (
              <Link
                href={
                  user?.isAdmin ? "/patient-applications" : "/my-applications"
                }
                className="inline-flex items-center text-blue-600 font-medium hover:underline"
              >
                {user?.isAdmin
                  ? "View patient applications"
                  : "View your applications"}{" "}
                &rarr;
              </Link>
            ) : (
              <Link
                href="/signup"
                className="inline-flex items-center text-blue-600 font-medium hover:underline"
              >
                Start your Health Journey &rarr;
              </Link>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="h-[550px] w-[656px]  relative">
          <Image
            src="https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Cozy room"
            className="rounded-lg shadow-lg object-cover"
            fill
          />
        </div>
      </div>
    </div>
  );
}
