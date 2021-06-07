import { useCallback, useEffect, useState } from "react";

interface UsePaginationProps<T = any> {
  initialPage: number;
  maxItems: number;
  items: Array<T>;
}

function transformArrayToPages<T = any>(
  items: Array<T>,
  limit: number
): Array<Array<T>> {
  let page = 1;
  let _limit = limit;
  const pages: any = [];
  for (let i = 0; i < items.length; i++) {
    pages.push([]);
  }

  for (const [i, item] of items.entries()) {
    if (i < _limit) {
      pages[page - 1] && pages[page - 1].push(item);
      continue;
    }
    page = page + 1;
    _limit = _limit + 11;
  }
  return pages as Array<Array<T>>;
}

export function usePagination<T>({
  initialPage = 1,
  maxItems,
  items,
}: UsePaginationProps<T>) {
  const [page, setPage] = useState(initialPage);
  const [pages, setPages] = useState([] as T[][]);

  useEffect(() => {
    if (items?.length === 0 || items == null) {
      return;
    }
    const normalizedArr = transformArrayToPages(items, maxItems);
    setPages(normalizedArr);
  }, [items, maxItems]);

  const next = useCallback(() => {
    setPage((old) => old++);
  }, []);

  const previous = useCallback(() => {
    setPage((old) => old--);
  }, []);

  const changePage = useCallback((page: number) => {
    setPage(page);
  }, []);

  return {
    pages,
    currentPage: page,
    changePage,
    next,
    previous,
    totalPages: pages.length,
  };
}
