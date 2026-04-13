"use client";

import React from 'react';
import { useAuth } from '@/components/AuthProvider';
import { Shield, Zap, Globe, BarChart3, Mail, Chrome } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const { loginWithGoogle, user, loading } = useAuth();

  const features = [
    {
      title: "AI Valuation Engine",
      description: "Real-time market analysis for Somaliland vehicles.",
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      title: "Sovereign Node Network",
      description: "Verified listings from Hargeisa, Berbera, and Burao.",
      icon: <Globe className="w-5 h-5" />
    },
    {
      title: "Fraud Prevention",
      description: "Advanced digital fingerprinting for automotive transactions.",
      icon: <Shield className="w-5 h-5" />
    },
    {
      title: "Institutional Intelligence",
      description: "Direct integration with Goverment standards and SNPA.",
      icon: <Zap className="w-5 h-5" />
    }
  ];

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white p-6">
        <div className="glass-panel p-8 rounded-xl max-w-md w-full text-center gold-glow">
          <h1 className="text-2xl font-bold mb-4 text-gradient-gold">Authenticated</h1>
          <p className="text-zinc-400 mb-8">Welcome back, {user.displayName || user.email}. You are now connected to the SAIP Sovereign Engine.</p>
          <Link href="/marketplace" className="nav-cta inline-block w-full text-center">
            Enter Intelligence Hub
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-split">
      {/* Left: Sign-in Form */}
      <div className="auth-left">
        <div className="w-full max-w-md">
          <div className="mb-12">
            <Link href="/" className="nav-logo mb-8 inline-block">
              SAIP <span>Intelligence</span>
            </Link>
            <h1 className="text-4xl font-bold mb-2 tracking-tight">
              Sign in / <span className="opacity-50">Create account</span>
            </h1>
            <p className="text-zinc-500">Access the Somaliland Automotive Intelligence Platform</p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <input 
                type="email" 
                placeholder="you@institution.gov.sl"
                className="w-full bg-[#0D0D0E] border border-white/5 rounded-lg px-4 py-4 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all placeholder:text-zinc-700"
              />
            </div>

            <button className="w-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
              <Mail className="w-5 h-5" />
              EMAIL ME LOGIN CODE
            </button>

            <div className="relative py-4 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <span className="relative bg-[#050505] px-4 text-xs font-bold text-zinc-600 uppercase tracking-widest">or</span>
            </div>

            <button 
              onClick={loginWithGoogle}
              disabled={loading}
              className="w-full bg-white text-black font-bold py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-zinc-100 transition-colors"
            >
              <Chrome className="w-5 h-5 text-blue-500" />
              Continue with Google
            </button>
          </div>

          <p className="mt-8 text-xs text-zinc-600 leading-relaxed text-center">
            By continuing, you agree to SAIP's <ins className="cursor-pointer">Terms of Service</ins> and <ins className="cursor-pointer">Privacy Policy</ins>. 
            Authorized use only.
          </p>
        </div>
      </div>

      {/* Right: Feature Showcase */}
      <div className="auth-right relative overflow-hidden">
        <div className="relative z-10 max-w-lg">
          <p className="text-blue-500 font-bold tracking-[0.2em] mb-4 text-sm uppercase">Sovereign Engine</p>
          <h2 className="text-5xl font-bold mb-12 leading-tight">
            Automate your <br />
            <span className="text-gradient-gold">automotive intelligence</span>
          </h2>

          <div className="space-y-12 feature-line">
            {features.map((feature, index) => (
              <div key={index} className="relative group">
                <div className="feature-dot group-hover:scale-125 transition-transform"></div>
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-amber-500 group-hover:border-amber-500/50 transition-all duration-500">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1 group-hover:text-white transition-colors">{feature.title}</h3>
                    <p className="text-zinc-500 group-hover:text-zinc-300 transition-colors">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#D4AF37]/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full"></div>
      </div>
    </div>
  );
}
