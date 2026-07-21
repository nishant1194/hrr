"use client";

import { Heart, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-6 mt-20 border-t border-gray-200 bg-white">
<div className="mx-auto flex w-full flex-col items-center justify-between gap-5 px-24 py-6 text-sm text-gray-600 md:flex-row">        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-indigo-600" />
          <span className="font-medium">
            © {new Date().getFullYear()} All rights reserved.
          </span>
        </div>

        {/* Center */}
        <div className="flex items-center gap-2">
          <span>Made with</span>
          <Heart className="h-4 w-4 fill-red-500 text-red-500" />
          <span> by Nishant</span>
        </div>

        {/* Right */}

        {/* <a
          href="https://github.com/nishant1194/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 font-medium transition-all duration-200 hover:border-gray-300 hover:bg-gray-100 hover:shadow-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.02c-3.2.7-3.88-1.37-3.88-1.37-.52-1.31-1.27-1.66-1.27-1.66-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.74 2.67 1.24 3.32.95.1-.74.4-1.24.72-1.52-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.18-1.49 3.14-1.18 3.14-1.18.63 1.59.24 2.77.12 3.06.73.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.67.41.35.78 1.03.78 2.08v3.08c0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
          </svg>

          <span>View on GitHub</span>
        </a> */}

      </div>
    </footer>
  );
}