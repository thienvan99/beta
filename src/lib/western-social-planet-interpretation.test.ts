import { describe, expect, it } from "vitest";
import {
  socialPlanetInterpretationFactors,
  westernSocialPlanetInterpretationRules,
} from "../data/western-social-planet-interpretations";
import {
  calculateWesternAstrology,
  zodiacSigns,
  type ZodiacSign,
  type WesternAstrologyResult,
} from "./western-astrology";
import {
  WesternSocialPlanetInterpretationError,
  getSocialPlanetInterpretationRule,
  interpretWesternSocialPlanets,
} from "./western-social-planet-interpretation";

const vietnamBirthInput = {
  localDateTime: "1990-01-15T08:30:00",
  utcDateTime: "1990-01-15T01:30:00Z",
  latitude: 10.8231,
  longitude: 106.6297,
  timeZone: "Asia/Ho_Chi_Minh",
} as const;

describe("western social planet interpretation rules", () => {
  it("contains exactly 60 complete Jupiter, Saturn, Uranus, Neptune, and Pluto rules", () => {
    expect(socialPlanetInterpretationFactors).toEqual([
      "Jupiter",
      "Saturn",
      "Uranus",
      "Neptune",
      "Pluto",
    ]);
    expect(westernSocialPlanetInterpretationRules).toHaveLength(60);
    expect(
      new Set(
        westernSocialPlanetInterpretationRules.map(({ ruleId }) => ruleId),
      ).size,
    ).toBe(60);

    for (const rule of westernSocialPlanetInterpretationRules) {
      expect(rule.summary.trim()).not.toBe("");
      expect(rule.summary).not.toMatch(/\brule\b/i);
      expect(rule.strengths.length).toBeGreaterThanOrEqual(2);
      expect(rule.challenges.length).toBeGreaterThanOrEqual(2);
      expect(rule.developmentAdvice.length).toBeGreaterThanOrEqual(1);
      expect(rule.strengths.every((item) => item.trim().length > 0)).toBe(
        true,
      );
      expect(rule.challenges.every((item) => item.trim().length > 0)).toBe(
        true,
      );
      expect(
        rule.developmentAdvice.every((item) => item.trim().length > 0),
      ).toBe(true);
      expect(rule.version).toBe("1.0.0");
      expect(socialPlanetInterpretationFactors).toContain(rule.evidence.body);
    }
  });

  it("covers all twelve zodiac signs for each social planet factor", () => {
    for (const factor of socialPlanetInterpretationFactors) {
      expect(
        westernSocialPlanetInterpretationRules
          .filter(({ evidence }) => evidence.body === factor)
          .map(({ evidence }) => evidence.sign)
          .sort(),
      ).toEqual([...zodiacSigns].sort());
    }
  });

  it("selects the correct Jupiter interpretation by sign", () => {
    expect(getSocialPlanetInterpretationRule("Jupiter", "Aries")).toMatchObject(
      {
        ruleId: "WESTERN-JUPITER-ARIES-V1",
        title: "Sao Mộc Bạch Dương",
        evidence: { body: "Jupiter", sign: "Aries" },
      },
    );
  });

  it("selects the correct Saturn interpretation by sign", () => {
    expect(getSocialPlanetInterpretationRule("Saturn", "Aries")).toMatchObject(
      {
        ruleId: "WESTERN-SATURN-ARIES-V1",
        title: "Sao Thổ Bạch Dương",
        evidence: { body: "Saturn", sign: "Aries" },
      },
    );
  });

  it("selects the correct Uranus interpretation by sign", () => {
    expect(getSocialPlanetInterpretationRule("Uranus", "Aries")).toMatchObject(
      {
        ruleId: "WESTERN-URANUS-ARIES-V1",
        title: "Sao Thiên Vương Bạch Dương",
        evidence: { body: "Uranus", sign: "Aries" },
      },
    );
  });

  it("selects the correct Neptune interpretation by sign", () => {
    expect(getSocialPlanetInterpretationRule("Neptune", "Aries")).toMatchObject(
      {
        ruleId: "WESTERN-NEPTUNE-ARIES-V1",
        title: "Sao Hải Vương Bạch Dương",
        evidence: { body: "Neptune", sign: "Aries" },
      },
    );
  });

  it("selects the correct Pluto interpretation by sign", () => {
    expect(getSocialPlanetInterpretationRule("Pluto", "Aries")).toMatchObject({
      ruleId: "WESTERN-PLUTO-ARIES-V1",
      title: "Sao Diêm Vương Bạch Dương",
      evidence: { body: "Pluto", sign: "Aries" },
    });
  });

  it("keeps Saturn content separate from Jupiter content", () => {
    expect(getSocialPlanetInterpretationRule("Saturn", "Aries").summary).toBe(
      "Saturn Bạch Dương thường học về trách nhiệm qua cách khởi đầu, tự khẳng định và sử dụng ý chí cá nhân. Bạn có xu hướng trưởng thành khi hành động không chỉ đến từ phản xạ nhanh, mà được đặt trong kỷ luật, tiêu chuẩn rõ và khả năng chịu trách nhiệm với bước đi đầu tiên.",
    );
    expect(getSocialPlanetInterpretationRule("Saturn", "Aries").summary).not.toBe(
      getSocialPlanetInterpretationRule("Jupiter", "Aries").summary,
    );
  });

  it("keeps Uranus content separate from Jupiter and Saturn content", () => {
    expect(getSocialPlanetInterpretationRule("Uranus", "Aries").summary).toBe(
      "Uranus Bạch Dương thường biểu hiện nguyên lý đổi mới qua hành động tiên phong, quyền được bắt đầu khác đi và phản ứng nhanh trước những cấu trúc làm mất tự chủ. Ở cấp cá nhân, vị trí này nên được đọc như một cách lá số tiếp xúc với nhu cầu khai mở và độc lập, không phải kết luận rằng bạn luôn bốc đồng hoặc nổi loạn.",
    );
    expect(getSocialPlanetInterpretationRule("Uranus", "Aries").summary).not.toBe(
      getSocialPlanetInterpretationRule("Jupiter", "Aries").summary,
    );
    expect(getSocialPlanetInterpretationRule("Uranus", "Aries").summary).not.toBe(
      getSocialPlanetInterpretationRule("Saturn", "Aries").summary,
    );
  });

  it("keeps rule IDs stable for every sign", () => {
    for (const sign of zodiacSigns) {
      expect(getSocialPlanetInterpretationRule("Jupiter", sign).ruleId).toBe(
        `WESTERN-JUPITER-${sign.toUpperCase()}-V1`,
      );
      expect(getSocialPlanetInterpretationRule("Saturn", sign).ruleId).toBe(
        `WESTERN-SATURN-${sign.toUpperCase()}-V1`,
      );
      expect(getSocialPlanetInterpretationRule("Uranus", sign).ruleId).toBe(
        `WESTERN-URANUS-${sign.toUpperCase()}-V1`,
      );
      expect(getSocialPlanetInterpretationRule("Neptune", sign).ruleId).toBe(
        `WESTERN-NEPTUNE-${sign.toUpperCase()}-V1`,
      );
      expect(getSocialPlanetInterpretationRule("Pluto", sign).ruleId).toBe(
        `WESTERN-PLUTO-${sign.toUpperCase()}-V1`,
      );
    }
  });

  it("fails clearly when a requested rule is missing", () => {
    expect(() =>
      getSocialPlanetInterpretationRule("Jupiter", "Ophiuchus" as ZodiacSign),
    ).toThrow(WesternSocialPlanetInterpretationError);
    expect(() =>
      getSocialPlanetInterpretationRule("Jupiter", "Ophiuchus" as ZodiacSign),
    ).toThrow("Jupiter");
  });
});

describe("interpretWesternSocialPlanets", () => {
  it("uses the calculated Jupiter, Saturn, Uranus, Neptune, and Pluto positions in order", () => {
    const result = calculateWesternAstrology(vietnamBirthInput);
    const interpretation = interpretWesternSocialPlanets(result);
    const jupiter = result.bodies.find(({ name }) => name === "Jupiter");
    const saturn = result.bodies.find(({ name }) => name === "Saturn");
    const uranus = result.bodies.find(({ name }) => name === "Uranus");
    const neptune = result.bodies.find(({ name }) => name === "Neptune");
    const pluto = result.bodies.find(({ name }) => name === "Pluto");

    expect(
      interpretation.positions.map(({ factor, sign, rule }) => [
        factor,
        sign,
        rule.ruleId,
      ]),
    ).toEqual([
      [
        "Jupiter",
        jupiter?.sign,
        `WESTERN-JUPITER-${jupiter?.sign.toUpperCase()}-V1`,
      ],
      [
        "Saturn",
        saturn?.sign,
        `WESTERN-SATURN-${saturn?.sign.toUpperCase()}-V1`,
      ],
      [
        "Uranus",
        uranus?.sign,
        `WESTERN-URANUS-${uranus?.sign.toUpperCase()}-V1`,
      ],
      [
        "Neptune",
        neptune?.sign,
        `WESTERN-NEPTUNE-${neptune?.sign.toUpperCase()}-V1`,
      ],
      [
        "Pluto",
        pluto?.sign,
        `WESTERN-PLUTO-${pluto?.sign.toUpperCase()}-V1`,
      ],
    ]);
  });

  it("does not depend on body array order", () => {
    const result = calculateWesternAstrology(vietnamBirthInput);
    const reordered: WesternAstrologyResult = {
      ...result,
      bodies: [...result.bodies].reverse(),
    };
    const jupiter = result.bodies.find(({ name }) => name === "Jupiter");
    const saturn = result.bodies.find(({ name }) => name === "Saturn");
    const uranus = result.bodies.find(({ name }) => name === "Uranus");
    const neptune = result.bodies.find(({ name }) => name === "Neptune");
    const pluto = result.bodies.find(({ name }) => name === "Pluto");
    const positions = interpretWesternSocialPlanets(reordered).positions;
    const jupiterPosition = positions.find(({ factor }) => factor === "Jupiter");
    const saturnPosition = positions.find(({ factor }) => factor === "Saturn");
    const uranusPosition = positions.find(({ factor }) => factor === "Uranus");
    const neptunePosition = positions.find(
      ({ factor }) => factor === "Neptune",
    );
    const plutoPosition = positions.find(({ factor }) => factor === "Pluto");

    expect(jupiterPosition).toMatchObject({
      factor: "Jupiter",
      longitude: jupiter?.longitude,
      sign: jupiter?.sign,
      degree: jupiter?.degree,
      minute: jupiter?.minute,
      retrograde: jupiter?.retrograde,
    });
    expect(saturnPosition).toMatchObject({
      factor: "Saturn",
      longitude: saturn?.longitude,
      sign: saturn?.sign,
      degree: saturn?.degree,
      minute: saturn?.minute,
      retrograde: saturn?.retrograde,
    });
    expect(uranusPosition).toMatchObject({
      factor: "Uranus",
      longitude: uranus?.longitude,
      sign: uranus?.sign,
      degree: uranus?.degree,
      minute: uranus?.minute,
      retrograde: uranus?.retrograde,
    });
    expect(neptunePosition).toMatchObject({
      factor: "Neptune",
      longitude: neptune?.longitude,
      sign: neptune?.sign,
      degree: neptune?.degree,
      minute: neptune?.minute,
      retrograde: neptune?.retrograde,
    });
    expect(plutoPosition).toMatchObject({
      factor: "Pluto",
      longitude: pluto?.longitude,
      sign: pluto?.sign,
      degree: pluto?.degree,
      minute: pluto?.minute,
      retrograde: pluto?.retrograde,
    });
  });

  it("returns the same output for the same input", () => {
    const result = calculateWesternAstrology(vietnamBirthInput);
    const first = interpretWesternSocialPlanets(result);
    const second = interpretWesternSocialPlanets(result);

    expect(second).toEqual(first);
    expect(JSON.stringify(second)).toBe(JSON.stringify(first));
  });

  it("does not mutate calculation engine output", () => {
    const result = calculateWesternAstrology(vietnamBirthInput);
    const snapshot = structuredClone(result);

    interpretWesternSocialPlanets(result);

    expect(result).toEqual(snapshot);
  });

  it("keeps Jupiter evidence traceable from the selected output", () => {
    const result = calculateWesternAstrology(vietnamBirthInput);
    const jupiter = result.bodies.find(({ name }) => name === "Jupiter");
    const [position] = interpretWesternSocialPlanets(result).positions;

    expect(position).toMatchObject({
      factor: "Jupiter",
      longitude: jupiter?.longitude,
      sign: jupiter?.sign,
      degree: jupiter?.degree,
      minute: jupiter?.minute,
      retrograde: jupiter?.retrograde,
      rule: {
        ruleId: `WESTERN-JUPITER-${jupiter?.sign.toUpperCase()}-V1`,
        version: "1.0.0",
        evidence: {
          body: "Jupiter",
          sign: jupiter?.sign,
        },
      },
    });
  });

  it("keeps Saturn evidence traceable from the selected output", () => {
    const result = calculateWesternAstrology(vietnamBirthInput);
    const saturn = result.bodies.find(({ name }) => name === "Saturn");
    const position = interpretWesternSocialPlanets(result).positions.find(
      ({ factor }) => factor === "Saturn",
    );

    expect(position).toMatchObject({
      factor: "Saturn",
      longitude: saturn?.longitude,
      sign: saturn?.sign,
      degree: saturn?.degree,
      minute: saturn?.minute,
      retrograde: saturn?.retrograde,
      rule: {
        ruleId: `WESTERN-SATURN-${saturn?.sign.toUpperCase()}-V1`,
        version: "1.0.0",
        evidence: {
          body: "Saturn",
          sign: saturn?.sign,
        },
      },
    });
  });

  it("keeps Uranus evidence traceable from the selected output", () => {
    const result = calculateWesternAstrology(vietnamBirthInput);
    const uranus = result.bodies.find(({ name }) => name === "Uranus");
    const position = interpretWesternSocialPlanets(result).positions.find(
      ({ factor }) => factor === "Uranus",
    );

    expect(position).toMatchObject({
      factor: "Uranus",
      longitude: uranus?.longitude,
      sign: uranus?.sign,
      degree: uranus?.degree,
      minute: uranus?.minute,
      retrograde: uranus?.retrograde,
      rule: {
        ruleId: `WESTERN-URANUS-${uranus?.sign.toUpperCase()}-V1`,
        version: "1.0.0",
        evidence: {
          body: "Uranus",
          sign: uranus?.sign,
        },
      },
    });
  });

  it("keeps Neptune evidence traceable from the selected output", () => {
    const result = calculateWesternAstrology(vietnamBirthInput);
    const neptune = result.bodies.find(({ name }) => name === "Neptune");
    const position = interpretWesternSocialPlanets(result).positions.find(
      ({ factor }) => factor === "Neptune",
    );

    expect(position).toMatchObject({
      factor: "Neptune",
      longitude: neptune?.longitude,
      sign: neptune?.sign,
      degree: neptune?.degree,
      minute: neptune?.minute,
      retrograde: neptune?.retrograde,
      rule: {
        ruleId: `WESTERN-NEPTUNE-${neptune?.sign.toUpperCase()}-V1`,
        version: "1.0.0",
        evidence: {
          body: "Neptune",
          sign: neptune?.sign,
        },
      },
    });
  });

  it("keeps Pluto evidence traceable from the selected output", () => {
    const result = calculateWesternAstrology(vietnamBirthInput);
    const pluto = result.bodies.find(({ name }) => name === "Pluto");
    const position = interpretWesternSocialPlanets(result).positions.find(
      ({ factor }) => factor === "Pluto",
    );

    expect(position).toMatchObject({
      factor: "Pluto",
      longitude: pluto?.longitude,
      sign: pluto?.sign,
      degree: pluto?.degree,
      minute: pluto?.minute,
      retrograde: pluto?.retrograde,
      rule: {
        ruleId: `WESTERN-PLUTO-${pluto?.sign.toUpperCase()}-V1`,
        version: "1.0.0",
        evidence: {
          body: "Pluto",
          sign: pluto?.sign,
        },
      },
    });
  });

  it("fails clearly when Jupiter is missing", () => {
    const result = calculateWesternAstrology(vietnamBirthInput);
    const missingJupiter: WesternAstrologyResult = {
      ...result,
      bodies: result.bodies.filter(({ name }) => name !== "Jupiter"),
    };

    expect(() => interpretWesternSocialPlanets(missingJupiter)).toThrow(
      WesternSocialPlanetInterpretationError,
    );
    expect(() => interpretWesternSocialPlanets(missingJupiter)).toThrow(
      "Jupiter",
    );
  });

  it("fails clearly when Saturn is missing", () => {
    const result = calculateWesternAstrology(vietnamBirthInput);
    const missingSaturn: WesternAstrologyResult = {
      ...result,
      bodies: result.bodies.filter(({ name }) => name !== "Saturn"),
    };

    expect(() => interpretWesternSocialPlanets(missingSaturn)).toThrow(
      WesternSocialPlanetInterpretationError,
    );
    expect(() => interpretWesternSocialPlanets(missingSaturn)).toThrow(
      "Saturn",
    );
  });

  it("fails clearly when Uranus is missing", () => {
    const result = calculateWesternAstrology(vietnamBirthInput);
    const missingUranus: WesternAstrologyResult = {
      ...result,
      bodies: result.bodies.filter(({ name }) => name !== "Uranus"),
    };

    expect(() => interpretWesternSocialPlanets(missingUranus)).toThrow(
      WesternSocialPlanetInterpretationError,
    );
    expect(() => interpretWesternSocialPlanets(missingUranus)).toThrow(
      "Uranus",
    );
  });

  it("fails clearly when Neptune is missing", () => {
    const result = calculateWesternAstrology(vietnamBirthInput);
    const missingNeptune: WesternAstrologyResult = {
      ...result,
      bodies: result.bodies.filter(({ name }) => name !== "Neptune"),
    };

    expect(() => interpretWesternSocialPlanets(missingNeptune)).toThrow(
      WesternSocialPlanetInterpretationError,
    );
    expect(() => interpretWesternSocialPlanets(missingNeptune)).toThrow(
      "Neptune",
    );
  });

  it("fails clearly when Pluto is missing", () => {
    const result = calculateWesternAstrology(vietnamBirthInput);
    const missingPluto: WesternAstrologyResult = {
      ...result,
      bodies: result.bodies.filter(({ name }) => name !== "Pluto"),
    };

    expect(() => interpretWesternSocialPlanets(missingPluto)).toThrow(
      WesternSocialPlanetInterpretationError,
    );
    expect(() => interpretWesternSocialPlanets(missingPluto)).toThrow(
      "Pluto",
    );
  });
});
