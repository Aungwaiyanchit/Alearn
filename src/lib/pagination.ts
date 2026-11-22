export interface PaginationResult<T> {
  items: T[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export type PageSlot = number | "ellipsis-left" | "ellipsis-right";

export function paginateItems<T>(
  allItems: readonly T[],
  requestedPage: number,
  requestedPageSize: number,
): PaginationResult<T> {
  const totalItems = allItems.length;
  const pageSize = Math.max(1, Math.floor(requestedPageSize) || 1);
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(
    Math.max(1, Math.floor(requestedPage) || 1),
    totalPages,
  );

  const offset = (currentPage - 1) * pageSize;
  const items = allItems.slice(offset, offset + pageSize);
  const startIndex = totalItems === 0 ? 0 : offset + 1;
  const endIndex = Math.min(offset + items.length, totalItems);

  return {
    items,
    currentPage,
    pageSize,
    totalItems,
    totalPages,
    startIndex,
    endIndex,
    hasPrevious: currentPage > 1,
    hasNext: currentPage < totalPages,
  };
}

export function getVisiblePageSlots(
  currentPage: number,
  totalPages: number,
): PageSlot[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const slots: PageSlot[] = [1];
  const windowStart = Math.max(2, currentPage - 1);
  const windowEnd = Math.min(totalPages - 1, currentPage + 1);

  if (windowStart > 2) {
    slots.push("ellipsis-left");
  }

  for (let page = windowStart; page <= windowEnd; page += 1) {
    slots.push(page);
  }

  if (windowEnd < totalPages - 1) {
    slots.push("ellipsis-right");
  }

  slots.push(totalPages);
  return slots;
}
