"use client";

import { useState } from "react";
import { Copy, Check, RefreshCw, Quote as QuoteIcon } from "lucide-react";
import { Quote } from "../types/quote";

interface Props {
  quote: Quote | null;
}

export default function QuoteCard({ quote }: Props) {
  const [copied, setCopied] = useState(false);

  const copyQuote = async () => {
    if (!quote) return;

    await navigator.clipboard.writeText(quote.text);

    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  if (!quote) {
    return (
      <div className="flex min-h-[560px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-gradient-to-br from-slate-50 to-indigo-50 p-10 text-center">

        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100">

          <QuoteIcon
            size={36}
            className="text-indigo-600"
          />

        </div>

        <h2 className="mt-8 text-3xl font-bold text-slate-900">
          Today's Quote
        </h2>

        <p className="mt-4 max-w-md text-lg leading-8 text-slate-500">
          Select your preferences and generate an AI-powered motivational
          quote.
        </p>

      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-10 text-white shadow-2xl">

      {/* Decorative Circles */}

      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />

      <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-white/10" />

      <div className="relative">

        <p className="text-sm uppercase tracking-[0.25em] text-indigo-100">
          Today's Quote
        </p>

        <div className="mt-10 text-7xl leading-none opacity-20">
          ❝
        </div>

        <p className="relative -mt-10 text-3xl font-semibold leading-relaxed">
          {quote.text}
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-3">

          <span className="rounded-full bg-white/20 px-4 py-2 text-sm">
            {quote.theme}
          </span>

          <span className="rounded-full bg-white/20 px-4 py-2 text-sm">
            {quote.createdAt}
          </span>

        </div>

        <div className="mt-12 flex gap-4">

          <button
            onClick={copyQuote}
            className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-medium text-slate-900 transition hover:scale-105"
          >
            {copied ? (
              <>
                <Check size={18} />
                Copied
              </>
            ) : (
              <>
                <Copy size={18} />
                Copy
              </>
            )}
          </button>

          {/* <button
            className="flex items-center gap-2 rounded-xl border border-white/30 px-5 py-3 transition hover:bg-white/10"
          >
            <RefreshCw size={18} />
            Regenerate
          </button> */}

        </div>

      </div>

    </div>
  );
}