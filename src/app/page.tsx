import { BirthInformationForm } from "@/components/birth-information-form";
import { SiteHeader } from "@/components/site-header";

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
          </section>

          <BirthInformationForm />
        </div>
      </main>
    </div>
  );
}
