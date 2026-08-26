import { describe, expect, it } from "vitest";
import {
  getResultModulePath,
  isResultModuleSlug,
  resultModules,
} from "./result-modules";

describe("result modules", () => {
  it("defines the four canonical private result routes", () => {
    expect(resultModules.map(({ slug }) => slug)).toEqual([
      "bat-tu",
      "tu-vi",
      "tay-phuong",
      "ve-da",
    ]);
    expect(resultModules.map(({ slug }) => getResultModulePath(slug))).toEqual([
      "/ket-qua/bat-tu",
      "/ket-qua/tu-vi",
      "/ket-qua/tay-phuong",
      "/ket-qua/ve-da",
    ]);
  });

  it("rejects invalid slugs", () => {
    expect(isResultModuleSlug("tay-phuong")).toBe(true);
    expect(isResultModuleSlug("western")).toBe(false);
  });
});
