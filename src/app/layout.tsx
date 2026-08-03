import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thiên Vận | Hồ sơ sinh",
  description: "Nhập thông tin sinh và khởi tạo hồ sơ Thiên Vận.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
