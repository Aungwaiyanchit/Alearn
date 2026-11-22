import { describe, expect, test } from "bun:test";
import {
  bulkInsertQuestionsFromCsv,
  createCategory,
  createQuestion,
  deleteCategoryById,
  deleteQuestionById,
  listAllQuestions,
  updateCategory,
  updateQuestion,
} from "@/db/admin-repository";
import { getQuestionsForCategory, listCategories } from "@/db/repository";

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

  test("bulk inserts CSV rows and auto-creates missing categories", () => {
    const tempCategoryName = "Bulk Csv Temp Category";
    const summary = bulkInsertQuestionsFromCsv([
      {
        rowNumber: 2,
        category: tempCategoryName,
        categoryBurmese: "စမ်းသပ် CSV ကဏ္ဍ",
        burmesePrompt: "ကျေးဇူးတင်ပါတယ်။",
        englishAnswer: "Thank you.",
        acceptedAnswers: ["Thanks."],
        hint: "Polite thanks",
        grammarNote: "Everyday polite expression.",
        difficulty: "beginner",
      },
      {
        rowNumber: 3,
        category: tempCategoryName,
        categoryBurmese: "စမ်းသပ် CSV ကဏ္ဍ",
        burmesePrompt: "နောက်မှ တွေ့မယ်။",
        englishAnswer: "See you later.",
        acceptedAnswers: ["See you soon."],
        hint: "Casual goodbye",
        grammarNote: "Common casual farewell.",
        difficulty: "beginner",
      },
    ]);

    expect(summary.createdCategories).toBe(1);
    expect(summary.insertedQuestions).toBe(2);

    const createdCategory = listCategories().find(
      (cat) => cat.name === tempCategoryName,
    );
    expect(createdCategory).toBeDefined();
    expect(createdCategory?.questionCount).toBe(2);

    if (createdCategory) {
      expect(deleteCategoryById(createdCategory.id)).toBe(true);
    }
  });
});
