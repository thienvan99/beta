"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function ResultRootRedirect() {
  const router = useRouter();
  useEffect(() => { router.replace("/ket-qua/bat-tu"); }, [router]);
  return <main className="p-8"><Link href="/ket-qua/bat-tu">Mở kết quả hồ sơ</Link></main>;
}
