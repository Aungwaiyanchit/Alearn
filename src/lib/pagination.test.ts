import { describe, expect, test } from "bun:test";
import { getVisiblePageSlots, paginateItems } from "@/lib/pagination";

describe("pagination helpers", () => {
  test("slices items and computes 1-based display bounds", () => {
    const data = Array.from({ length: 23 }, (_, i) => `item-${i + 1}`);
    const page2 = paginateItems(data, 2, 10);

    expect(page2.items.length).toBe(10);
    expect(page2.items[0]).toBe("item-11");
    expect(page2.items[9]).toBe("item-20");
    expect(page2.currentPage).toBe(2);
    expect(page2.totalPages).toBe(3);
    expect(page2.startIndex).toBe(11);
    expect(page2.endIndex).toBe(20);
    expect(page2.hasPrevious).toBe(true);
    expect(page2.hasNext).toBe(true);
  });

  test("clamps out-of-range pages and handles empty lists safely", () => {
    const empty = paginateItems([], 3, 10);
    expect(empty.currentPage).toBe(1);
    expect(empty.totalPages).toBe(1);
    expect(empty.startIndex).toBe(0);
    expect(empty.endIndex).toBe(0);
    expect(empty.hasPrevious).toBe(false);
    expect(empty.hasNext).toBe(false);

    const clamped = paginateItems(["a", "b", "c"], 99, 2);
    expect(clamped.currentPage).toBe(2);
    expect(clamped.items).toEqual(["c"]);
    expect(clamped.hasNext).toBe(false);
  });

  test("generates compact page slots with ellipses for large page counts", () => {
    expect(getVisiblePageSlots(1, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(getVisiblePageSlots(5, 10)).toEqual([
      1,
      "ellipsis-left",
      4,
      5,
      6,
      "ellipsis-right",
      10,
    ]);
    expect(getVisiblePageSlots(1, 10)).toEqual([1, 2, "ellipsis-right", 10]);
  });
});
