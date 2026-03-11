"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import Link from "next/link";
import { UserCircle, LogOut } from "lucide-react";

export default function AuthHeaderNav() {
  const { user, loginWithGoogle, logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-10 w-32 bg-zinc-900/50 animate-pulse rounded-lg border border-zinc-800" />;

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-white font-medium">
            <UserCircle size={20} className="text-[#D4AF37]" />
            <span className="hidden sm:inline">{user.displayName || user.email}</span>
          </div>
          <button onClick={logout} className="text-zinc-400 hover:text-[#990000] transition-colors" title="Sign Out">
            <LogOut size={18} />
          </button>
          <Link href="/post-ad" className="nav-cta">Post Free Ad</Link>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <button onClick={loginWithGoogle} className="text-white font-medium hover:text-[#D4AF37] transition-colors">
            Login
          </button>
          <button onClick={loginWithGoogle} className="nav-cta">Post Free Ad</button>
        </div>
      )}
    </div>
  );
}
