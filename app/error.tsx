"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("FAFATAL RUNTIME ERROR:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center p-8">
      <div className="max-w-2xl w-full bg-[#18181b] border border-[#990000] p-12 rounded-3xl shadow-2xl">
        <div className="text-[#990000] font-black font-outfit text-4xl mb-6 uppercase tracking-widest">
          Sovereign Error Detected
        </div>
        <p className="text-zinc-400 mb-8 leading-relaxed font-medium">
          The SAIP platform encountered a critical runtime exception. This diagnostic overlay is capturing the forensic state for immediate correction.
        </p>
        <div className="bg-black/50 p-6 rounded-2xl border border-zinc-800 mb-8 overflow-auto max-h-64 font-mono text-xs text-red-500">
           {error.message || "Unknown Runtime Error"}
           {error.stack && (
             <pre className="mt-4 text-zinc-600 whitespace-pre-wrap">
               {error.stack.split('\n').slice(0, 5).join('\n')}
             </pre>
           )}
           {error.digest && <p className="mt-4 text-zinc-500">Digest ID: {error.digest}</p>}
        </div>
        <div className="flex gap-4">
          <button
            onClick={reset}
            className="bg-white text-black px-8 py-3 rounded-xl font-black text-sm hover:bg-[#D4AF37] transition-all uppercase tracking-widest"
          >
            Attempt Re-Hydration
          </button>
          <Link
            href="/"
            className="border border-zinc-800 text-zinc-500 px-8 py-3 rounded-xl font-black text-sm hover:bg-zinc-800 transition-all uppercase tracking-widest"
          >
            Return to Node
          </Link>
        </div>
      </div>
    </div>
  );
}
