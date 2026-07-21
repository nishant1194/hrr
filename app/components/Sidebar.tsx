"use client";

import { useState } from "react";

import QuoteForm from "./QuoteForm";
import QuoteCard from "./QuoteCard";
import History from "./History";

import { Quote } from "../types/quote";
import { generateQuote } from "../services/quoteService";

export default function Home() {
  const [currentQuote, setCurrentQuote] =
    useState<Quote | null>(null);

  const [history, setHistory] =
    useState<Quote[]>([]);

  const [loading, setLoading] =
    useState(false);

  const handleGenerate = async (
    theme: string,
    tone: string
  ) => {
    setLoading(true);

    try {
      const quote =
        await generateQuote(theme, tone);

      setCurrentQuote(quote);

      setHistory((prev) => [
        quote,
        ...prev,
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex h-screen bg-slate-100">

      <section className="flex-1 overflow-y-auto">

        <div className="mx-auto max-w-7xl px-10 py-10">

          <h2 className="mb-10 text-4xl font-bold text-slate-900">
            Dashboard
          </h2>

          <div className="grid gap-8 lg:grid-cols-2">

            <QuoteForm
              onGenerate={handleGenerate}
              loading={loading}
            />

            <QuoteCard
              quote={currentQuote}
            />

          </div>

          <History history={history} />

        </div>

      </section>

    </main>
  );
}