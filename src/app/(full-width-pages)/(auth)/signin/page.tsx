import SignInForm from "@/components/auth/SignInForm";
import GridShape from "@/components/common/GridShape";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Next.js SignIn Page | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Signin Page TailAdmin Dashboard Template",
};

export default function SignIn() {
  return (
    <div className="relative flex w-full h-screen px-4 py-6 overflow-hidden bg-white z-1 dark:bg-gray-900 sm:p-0">
      <SignInForm />
      <div className="relative items-center justify-center flex-1 hidden p-8 z-1 bg-brand-950 dark:bg-white/5 lg:flex">
        {/* <!-- ===== Common Grid Shape Start ===== --> */}
        <GridShape />
        <div className="flex flex-col items-center max-w-xs">
          <h1 className="text-center text-gray-400 dark:text-white/60">
            Sistem Peminjaman PT. Indoseiki Metal Utama
          </h1>
        </div>
      </div>
    </div>
  );
}
