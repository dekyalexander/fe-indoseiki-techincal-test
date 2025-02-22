import SignUpForm from "@/components/auth/SignUpForm";
import GridShape from "@/components/common/GridShape";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Next.js SignUp Page | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js SignUp Page TailAdmin Dashboard Template",
  // other metadata
};

export default function SignUp() {
  return (
    <div className="relative flex w-full h-screen overflow-hidden bg-white z-1 dark:bg-gray-900">
      <SignUpForm />
      <div className="relative items-center justify-center flex-1 hidden p-8 z-1 bg-brand-950 dark:bg-white/5 lg:flex">
        {/* <!-- ===== Common Grid Shape Start ===== --> */}
        <GridShape />
        {/* <!-- ===== Common Grid Shape End ===== --> */}
        <div className="flex flex-col items-center max-w-xs">
        <h1 className="text-center text-gray-400 dark:text-white/60">
            Sistem Peminjaman PT. Indoseiki Metal Utama
          </h1>
        </div>
      </div>
    </div>
  );
}
