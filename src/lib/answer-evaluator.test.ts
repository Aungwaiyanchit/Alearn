import { describe, expect, test } from "bun:test";
import { evaluateAnswer, normalizeEnglish } from "@/lib/answer-evaluator";

describe("answer-evaluator", () => {
  test("normalizes contractions and punctuation consistently", () => {
    expect(normalizeEnglish("I'm practicing English!")).toBe(
      "i am practicing english",
    );
    expect(normalizeEnglish("I am practicing English.")).toBe(
      "i am practicing english",
    );
    expect(normalizeEnglish("Can't eat spicy food?")).toBe(
      "cannot eat spicy food",
    );
  });

  test("marks exact and accepted answers as 100% correct", () => {
    const result = evaluateAnswer(
      "the weather is really nice today",
      "The weather is very nice today.",
      ["The weather is really nice today."],
    );

    expect(result.isCorrect).toBe(true);
    expect(result.accuracy).toBe(100);
    expect(result.matchedTarget).toBe("The weather is really nice today.");
  });

  test("produces word-level diff tokens for partial answers", () => {
    const result = evaluateAnswer(
      "I have live in this city for five years",
      "I have lived in this city for five years.",
      [],
    );

    expect(result.isCorrect).toBe(false);
    expect(result.accuracy).toBeGreaterThan(75);
    expect(
      result.wordTokens.some(
        (token) =>
          token.status === "incorrect" &&
          token.word === "live" &&
          token.expected === "lived",
      ),
    ).toBe(true);
  });
});
