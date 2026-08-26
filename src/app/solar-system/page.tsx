import type { Metadata } from "next";
import { SolarSystemExplorer } from "@/features/solar-system/solar-system-explorer";
import { getAbsoluteSiteUrl } from "@/config/site-url";

const canonicalUrl = getAbsoluteSiteUrl("/solar-system");

export const metadata: Metadata = {
  title: "Hệ Mặt Trời 3D | Thiên Vận",
  description:
    "Khám phá Mặt Trời, tám hành tinh và hệ Trái Đất–Mặt Trăng trong một mô phỏng không gian 3D tương tác.",
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: "Hệ Mặt Trời 3D | Thiên Vận",
    description: "Quan sát, xoay, thu phóng và khám phá từng hành tinh trong Hệ Mặt Trời.",
    url: canonicalUrl,
    type: "website",
    locale: "vi_VN",
  },
};

export default function SolarSystemPage() {
  return <SolarSystemExplorer />;
}
