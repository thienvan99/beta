import Link from "next/link";
import { Sun } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="border-b border-white/10 bg-[#153433] text-white">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-3 font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          <span className="flex size-9 items-center justify-center rounded-full border border-[#d8a146] text-[#f0c46f]">
            <Sun aria-hidden="true" size={19} strokeWidth={1.8} />
          </span>
          <span className="text-lg">Thiên Vận</span>
        </Link>

        <span className="text-sm text-[#c7d6d2]">Hồ sơ sinh</span>
      </div>
    </header>
  );
}
