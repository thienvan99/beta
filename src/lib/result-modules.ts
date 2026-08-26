export const resultModules = [
  { slug: "bat-tu", label: "Bát Tự" },
  { slug: "tu-vi", label: "Tử Vi" },
  { slug: "tay-phuong", label: "Chiêm tinh Tây phương" },
  { slug: "ve-da", label: "Chiêm tinh Vệ Đà" },
] as const;

export type ResultModuleSlug = (typeof resultModules)[number]["slug"];

export function isResultModuleSlug(value: string): value is ResultModuleSlug {
  return resultModules.some(({ slug }) => slug === value);
}

export function getResultModulePath(module: ResultModuleSlug) {
  return `/ket-qua/${module}` as const;
}
