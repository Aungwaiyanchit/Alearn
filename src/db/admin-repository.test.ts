import { describe, expect, test } from "bun:test";
import {
  createCategory,
  createQuestion,
  deleteCategoryById,
  deleteQuestionById,
  listAllQuestions,
  updateCategory,
  updateQuestion,
} from "@/db/admin-repository";
import { getQuestionsForCategory } from "@/db/repository";

describe("admin sqlite repository", () => {
  test("creates, updates, and deletes a category and its questions", () => {
    const category = createCategory({
      name: "Admin Test Category",
      burmeseName: "စမ်းသပ်ကဏ္ဍ",
      description: "Temporary test category for CRUD checks.",
      icon: "book-open",
      accentColor: "sky",
    });

    expect(category.name).toBe("Admin Test Category");
    expect(category.isRandom).toBe(false);

    const updatedCategory = updateCategory(category.id, {
      name: "Admin Test Updated",
      burmeseName: "ပြင်ဆင်ထားသောကဏ္ဍ",
      description: "Updated description.",
      icon: "sparkles",
      accentColor: "emerald",
    });

    expect(updatedCategory?.name).toBe("Admin Test Updated");
    expect(updatedCategory?.accentColor).toBe("emerald");

    const question = createQuestion({
      categoryId: category.id,
      burmesePrompt: "မင်္ဂလာပါ၊ နေကောင်းလား။",
      englishAnswer: "Hello, how are you?",
      acceptedAnswers: ["Hi, how are you doing?"],
      hint: "Greeting phrase",
      grammarNote: "Use a comma after 'Hello'.",
      difficulty: "beginner",
    });

    expect(question.categoryId).toBe(category.id);
    expect(getQuestionsForCategory(category.id).length).toBe(1);

    const updatedQuestion = updateQuestion(question.id, {
      categoryId: category.id,
      burmesePrompt: "မင်္ဂလာနံနက်ခင်းပါ။",
      englishAnswer: "Good morning.",
      acceptedAnswers: ["Good morning!"],
      hint: "Morning greeting",
      grammarNote: "Standard morning greeting.",
      difficulty: "beginner",
    });

    expect(updatedQuestion?.englishAnswer).toBe("Good morning.");
    expect(listAllQuestions().some((item) => item.id === question.id)).toBe(
      true,
    );

    expect(deleteQuestionById(question.id)).toBe(true);
    expect(deleteCategoryById(category.id)).toBe(true);
  });
});
