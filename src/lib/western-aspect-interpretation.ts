import {
  westernAspectInterpretationRules,
  type AspectInterpretationRule,
} from "../data/western-aspect-interpretations";
import type {
  MajorAspect,
  WesternAstrologyResult,
} from "./western-astrology";
import { canonicalizeWesternAspectPair } from "../config/western-aspect-feasibility";

export function canonicalizeAspectBodyPair(body1: string, body2: string) {
  return canonicalizeWesternAspectPair(body1, body2);
}

function aspectRuleKey(body1: string, body2: string, aspect: string) {
  const [firstBody, secondBody] = canonicalizeAspectBodyPair(body1, body2);
  return `${firstBody}:${secondBody}:${aspect}`;
}

const rulesByAspect = new Map(
  westernAspectInterpretationRules.map((rule) => [
    aspectRuleKey(rule.body1, rule.body2, rule.aspect),
    rule,
  ]),
);

export function getAspectInterpretationRule(
  body1: string,
  body2: string,
  aspect: string,
): AspectInterpretationRule | null {
  return rulesByAspect.get(aspectRuleKey(body1, body2, aspect)) ?? null;
}

export type AspectInterpretation = Readonly<{
  rule: AspectInterpretationRule;
  evidence: MajorAspect;
}>;

export function interpretWesternAspects(
  result: Pick<WesternAstrologyResult, "aspects">,
): AspectInterpretation[] {
  return result.aspects.flatMap((aspect) => {
    const rule = getAspectInterpretationRule(
      aspect.body1,
      aspect.body2,
      aspect.aspect,
    );
    return rule ? [{ rule, evidence: aspect }] : [];
  });
}
