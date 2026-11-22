import type { EvaluationResult, WordDiffToken } from "@/types/practice";

const CONTRACTION_MAP: Record<string, string> = {
  "i'm": "i am",
  "you're": "you are",
  "he's": "he is",
  "she's": "she is",
  "it's": "it is",
  "we're": "we are",
  "they're": "they are",
  "i've": "i have",
  "you've": "you have",
  "we've": "we have",
  "they've": "they have",
  "i'll": "i will",
  "you'll": "you will",
  "he'll": "he will",
  "she'll": "she will",
  "we'll": "we will",
  "they'll": "they will",
  "i'd": "i would",
  "you'd": "you would",
  "he'd": "he would",
  "she'd": "she would",
  "we'd": "we would",
  "they'd": "they would",
  "don't": "do not",
  "doesn't": "does not",
  "didn't": "did not",
  "can't": "cannot",
  cannot: "cannot",
  "couldn't": "could not",
  "won't": "will not",
  "wouldn't": "would not",
  "shouldn't": "should not",
  "isn't": "is not",
  "aren't": "are not",
  "wasn't": "was not",
  "weren't": "were not",
  "haven't": "have not",
  "hasn't": "has not",
  "hadn't": "had not",
  "let's": "let us",
  "that's": "that is",
  "there's": "there is",
  "what's": "what is",
  "where's": "where is",
  "who's": "who is",
};

export function normalizeEnglish(text: string): string {
  const cleaned = text
    .toLowerCase()
    .replace(/[\u2018\u2019\u02BC]/g, "'")
    .replace(/[^a-z0-9'\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned) {
    return "";
  }

  return cleaned
    .split(" ")
    .map((word) => CONTRACTION_MAP[word] ?? word)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenizeWords(text: string): string[] {
  const normalized = normalizeEnglish(text);
  return normalized ? normalized.split(" ") : [];
}

function buildWordDiff(
  userText: string,
  targetText: string,
): {
  tokens: WordDiffToken[];
  accuracy: number;
} {
  const userWords = tokenizeWords(userText);
  const targetWords = tokenizeWords(targetText);

  if (targetWords.length === 0) {
    return { tokens: [], accuracy: 0 };
  }

  // Longest Common Subsequence (LCS) DP table for accurate word-level alignment
  const m = userWords.length;
  const n = targetWords.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    Array<number>(n + 1).fill(0),
  );

  for (let i = 1; i <= m; i += 1) {
    for (let j = 1; j <= n; j += 1) {
      if (userWords[i - 1] === targetWords[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  const tokens: WordDiffToken[] = [];
  let i = m;
  let j = n;
  let matchedCount = 0;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && userWords[i - 1] === targetWords[j - 1]) {
      tokens.push({ word: userWords[i - 1], status: "correct" });
      matchedCount += 1;
      i -= 1;
      j -= 1;
    } else if (
      i > 0 &&
      j > 0 &&
      dp[i - 1][j] === dp[i][j - 1] &&
      dp[i - 1][j - 1] === dp[i][j]
    ) {
      tokens.push({
        word: userWords[i - 1],
        expected: targetWords[j - 1],
        status: "incorrect",
      });
      i -= 1;
      j -= 1;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      tokens.push({ word: targetWords[j - 1], status: "missing" });
      j -= 1;
    } else {
      tokens.push({ word: userWords[i - 1], status: "extra" });
      i -= 1;
    }
  }

  tokens.reverse();

  const denominator = Math.max(targetWords.length, userWords.length);
  const accuracy = Math.round((matchedCount / denominator) * 100);

  return { tokens, accuracy };
}

export function evaluateAnswer(
  userAnswer: string,
  primaryAnswer: string,
  acceptedAnswers: string[],
): EvaluationResult {
  const candidates = [primaryAnswer, ...acceptedAnswers];
  const normalizedInput = normalizeEnglish(userAnswer);

  let bestTarget = primaryAnswer;
  let bestDiff = buildWordDiff(userAnswer, primaryAnswer);

  for (const candidate of candidates) {
    if (normalizeEnglish(candidate) === normalizedInput && normalizedInput) {
      const exactDiff = buildWordDiff(userAnswer, candidate);
      return {
        isCorrect: true,
        accuracy: 100,
        matchedTarget: candidate,
        wordTokens: exactDiff.tokens,
        feedbackMessage: "Excellent! Your English sentence is spot-on.",
      };
    }

    const diff = buildWordDiff(userAnswer, candidate);
    if (diff.accuracy > bestDiff.accuracy) {
      bestDiff = diff;
      bestTarget = candidate;
    }
  }

  const isCorrect = bestDiff.accuracy >= 92;

  let feedbackMessage =
    "Keep practicing — compare your words with the model answer below.";
  if (isCorrect) {
    feedbackMessage = "Great job! Very natural English phrasing.";
  } else if (bestDiff.accuracy >= 70) {
    feedbackMessage = "Almost there! Just a small word or tense tweak needed.";
  } else if (bestDiff.accuracy >= 40) {
    feedbackMessage =
      "Good effort! Review the highlighted words and try again.";
  }

  return {
    isCorrect,
    accuracy: bestDiff.accuracy,
    matchedTarget: bestTarget,
    wordTokens: bestDiff.tokens,
    feedbackMessage,
  };
}
