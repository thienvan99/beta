import { notFound } from "next/navigation";
import { PrivateResultClient } from "@/components/private-result-client";
import { isResultModuleSlug, resultModules } from "@/lib/result-modules";

export const dynamicParams = false;

export function generateStaticParams() {
  return resultModules.map(({ slug }) => ({ module: slug }));
}

export default async function PrivateResultPage({
  params,
}: {
  params: Promise<{ module: string }>;
}) {
  const { module } = await params;
  if (!isResultModuleSlug(module)) notFound();
  return <PrivateResultClient activeModule={module} />;
}
