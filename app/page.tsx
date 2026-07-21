"use client";

import { useState } from "react";

import Header from "./components/Header";
import QuoteForm from "./components/QuoteForm";
import QuoteCard from "./components/QuoteCard";
import History from "./components/History";

import { Quote } from "./types/quote";
import { generateQuote } from "./services/quoteService";
import Footer from "./components/Footer";

export default function Home() {
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [history, setHistory] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (
    theme: string,
    tone: string,
    audience: string,
    customMessage: string
  ) => {
    setLoading(true);

    try {
      const quote = await generateQuote(
        theme,
        tone,
        audience,
        customMessage
      );

      setCurrentQuote(quote);
      setHistory((prev) => [quote, ...prev]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-100">
      <div className="mx-auto max-w-7xl px-6 py-12">

        <Header />

        <div className="mt-12 grid gap-8 lg:grid-cols-2">

          <QuoteForm
          onGenerate={handleGenerate}
          loading={loading}
        />

          <QuoteCard quote={currentQuote} />

        </div>

        {/* <History history={history} /> */}
      </div>
<Footer />
    </main>
  );
}