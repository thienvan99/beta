import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Orbit } from "lucide-react";
import { BirthInformationForm } from "@/components/birth-information-form";
import { SiteHeader } from "@/components/site-header";
import { homeCanonicalUrl } from "../config/site-url";

export const metadata: Metadata = {
  alternates: {
    canonical: homeCanonicalUrl,
  },
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(520px,1.18fr)] lg:gap-16">
          <section className="pt-2 lg:sticky lg:top-10" aria-labelledby="page-title">
            <p className="mb-4 text-sm font-semibold uppercase text-[#a94f2c]">
              Bước đầu tiên
            </p>
            <h1
              id="page-title"
              className="max-w-xl text-4xl font-semibold leading-tight text-[#153433] sm:text-5xl"
            >
              Thiên Vận
            </h1>
            <p className="mt-5 max-w-md text-lg leading-8 text-[#526260]">
              Khởi tạo hồ sơ từ thời điểm và tọa độ nơi bạn chào đời.
            </p>

            <div className="mt-10 border-l-2 border-[#c7633e] pl-5">
              <p className="text-sm font-medium text-[#6f7d7a]">Hồ sơ sinh</p>
              <p className="mt-1 text-xl font-semibold text-[#1d3332]">
                Thông tin nền tảng
              </p>
            </div>

            <aside className="mt-8" aria-labelledby="solar-system-entry-title">
              <Link
                href="/solar-system"
                className="group block rounded-2xl border border-[#cbd6d3] bg-white/65 p-5 shadow-sm transition hover:border-[#9eb7b1] hover:bg-white focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#1c6d68]"
              >
                <span className="flex items-start gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#153433] text-[#f0c46f]">
                    <Orbit aria-hidden="true" size={22} strokeWidth={1.7} />
                  </span>
                  <span className="min-w-0">
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a94f2c]">
                      Trải nghiệm thiên văn
                    </span>
                    <h2
                      id="solar-system-entry-title"
                      className="mt-1 block text-xl font-semibold text-[#153433]"
                    >
                      Hệ Mặt Trời 3D
                    </h2>
                    <span className="mt-2 block text-base leading-6 text-[#526260]">
                      Quan sát Mặt Trời, các hành tinh và Mặt Trăng chuyển động theo ngày giờ thiên văn.
                    </span>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#1c6d68]">
                      Khám phá
                      <ArrowRight
                        aria-hidden="true"
                        className="transition-transform group-hover:translate-x-1"
                        size={16}
                      />
                    </span>
                  </span>
                </span>
              </Link>
            </aside>
          </section>

          <BirthInformationForm />
        </div>
      </main>
    </div>
  );
}
