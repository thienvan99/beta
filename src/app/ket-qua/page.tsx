import { redirect } from "next/navigation";
import { isGitHubPages } from "@/config/deployment";
import { ResultRootRedirect } from "@/components/result-root-redirect";

export default function ResultRootPage() {
  if (isGitHubPages) return <ResultRootRedirect />;
  redirect("/ket-qua/bat-tu");
}
