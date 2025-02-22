"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, { useState } from "react";
import auth from "@/utils/api/auth";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
        const response = await auth.post("/register", { name, email, password });
        router.push("/signin"); // Redirect setelah login
    } catch (err) {
        setError("Register Gagal, periksa kembali nama, email dan password yang di isi!");
    }
};
  return (
    <div className="flex flex-col flex-1 p-6 rounded-2xl sm:rounded-none sm:border-0 sm:p-8">
      
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="mb-5 sm:mb-8">
          <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
            Sign Up
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
           Masukkan Nama, Email, Dan Password Anda Untuk Sign Up!
          </p>
        </div>
        <div>
        {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleRegister}>
            <div className="space-y-5">
               {/* <!-- Name --> */}
               <div>
                  <Label>
                    Name<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Masukkan Nama"
                  />
                </div>
              {/* <!-- Email --> */}
              <div>
                <Label>
                  Email<span className="text-error-500">*</span>
                </Label>
                <Input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="Masukkan Email"
                />
              </div>
              {/* <!-- Password --> */}
              <div>
                <Label>
                  Password<span className="text-error-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    placeholder="Masukkan Password"
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)} 
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                    )}
                  </span>
                </div>
              </div>
              {/* <!-- Checkbox --> */}
              <div className="flex items-center gap-3">
                <Checkbox
                  className="w-5 h-5"
                  checked={isChecked}
                  onChange={setIsChecked}
                />
                <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                 Anda Sudah Yakin Mengisi Semua Data Yang Di Perlukan
                </p>
              </div>
              {/* <!-- Button --> */}
              <div>
                <button className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600">
                  Sign Up
                </button>
              </div>
            </div>
          </form>
          <div className="mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
              Anda Sudah Memiliki Account?
              <Link
                href="/signin"
                className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
