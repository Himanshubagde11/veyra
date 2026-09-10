"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid email or password");
        setIsLoading(false);
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-veyra-porcelain py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-veyra-lg border border-veyra-champagne">
        <div>
          <h2 className="mt-2 text-center text-heading-lg font-serif text-veyra-aubergine">
            Welcome back
          </h2>
          <p className="mt-2 text-center text-body-sm text-veyra-aubergine/70">
            Sign in to discover beyond ordinary
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg text-body-sm border border-red-100 animate-fade-in">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="block text-body-sm font-medium text-veyra-aubergine mb-1" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 border border-veyra-champagne-deep bg-veyra-porcelain-warm rounded-lg text-veyra-aubergine placeholder-veyra-aubergine/40 focus:outline-none focus:ring-2 focus:ring-veyra-coral focus:border-transparent transition-all duration-250 sm:text-body-sm"
                placeholder="you@example.com"
              />
            </div>
            
            <div>
              <label className="block text-body-sm font-medium text-veyra-aubergine mb-1" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 border border-veyra-champagne-deep bg-veyra-porcelain-warm rounded-lg text-veyra-aubergine placeholder-veyra-aubergine/40 focus:outline-none focus:ring-2 focus:ring-veyra-coral focus:border-transparent transition-all duration-250 sm:text-body-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-veyra-coral focus:ring-veyra-coral border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-body-sm text-veyra-aubergine/80">
                Remember me
              </label>
            </div>

            <div className="text-body-sm">
              <a href="#" className="font-medium text-veyra-coral hover:text-veyra-coral-dark transition-colors duration-250">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-body-sm font-medium rounded-lg text-white bg-veyra-aubergine hover:bg-veyra-obsidian focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-veyra-aubergine transition-all duration-350 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
            >
              {isLoading ? (
                <Loader2 className="animate-spin h-5 w-5 text-white" />
              ) : (
                <span className="relative z-10 flex items-center">
                  Sign in
                </span>
              )}
            </button>
          </div>
        </form>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-veyra-champagne" />
            </div>
            <div className="relative flex justify-center text-body-sm">
              <span className="px-3 bg-white text-veyra-aubergine/60">
                Don't have an account?
              </span>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <Link 
              href="/register" 
              className="font-medium text-veyra-coral hover:text-veyra-coral-dark transition-colors duration-250"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
