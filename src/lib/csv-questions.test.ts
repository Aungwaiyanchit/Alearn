import { describe, expect, test } from "bun:test";
import {
  generateQuestionsCsvTemplate,
  parseQuestionsCsv,
} from "@/lib/csv-questions";

describe("csv-questions helpers", () => {
  test("generates a valid UTF-8 BOM template that round-trips cleanly", () => {
    const template = generateQuestionsCsvTemplate();
    expect(template.charCodeAt(0)).toBe(0xfeff);

    const parsed = parseQuestionsCsv(template);
    expect(parsed.errors).toEqual([]);
    expect(parsed.rows.length).toBe(3);
    expect(parsed.rows[0]?.category).toBe("daily-conversations");
    expect(parsed.rows[0]?.acceptedAnswers.length).toBe(2);
    expect(parsed.rows[2]?.difficulty).toBe("advanced");
  });

  test("handles quoted commas and escaped quotes inside fields", () => {
    const csv = [
      "category,burmese_prompt,english_answer,accepted_answers,hint,difficulty",
      'daily-conversations,"မင်္ဂလာပါ, နေကောင်းလား။","Hello, ""my friend"", how are you?","Hi, how are you?|Hey, how is it going?","Greeting, polite",beginner',
    ].join("\n");

    const parsed = parseQuestionsCsv(csv);
    expect(parsed.errors).toEqual([]);
    expect(parsed.rows.length).toBe(1);
    expect(parsed.rows[0]?.burmesePrompt).toBe("မင်္ဂလာပါ, နေကောင်းလား။");
    expect(parsed.rows[0]?.englishAnswer).toBe(
      'Hello, "my friend", how are you?',
    );
    expect(parsed.rows[0]?.acceptedAnswers).toEqual([
      "Hi, how are you?",
      "Hey, how is it going?",
    ]);
  });

  test("reports missing headers and invalid rows clearly", () => {
    const missingHeader = parseQuestionsCsv("foo,bar\n1,2");
    expect(missingHeader.rows.length).toBe(0);
    expect(missingHeader.errors[0]?.message).toContain(
      "Missing required header",
    );

    const badDifficulty = parseQuestionsCsv(
      "category,burmese_prompt,english_answer,difficulty\ndaily,မင်္ဂလာပါ,Hello,expert",
    );
    expect(badDifficulty.rows.length).toBe(0);
    expect(badDifficulty.errors[0]?.rowNumber).toBe(2);
    expect(badDifficulty.errors[0]?.message).toContain("Invalid difficulty");
  });
});
