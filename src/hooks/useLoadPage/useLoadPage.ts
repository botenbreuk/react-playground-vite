import { useEffect, useState } from 'react';
import { Page, emptyPage } from './spring-models';

type LoadPageOptions<T, P> = {
  pageRequest: (pageNumber: number, queryParams: P) => Promise<Page<T>>;
  queryParams?: P;
  pageNumber?: number;
  mergePages?: boolean;
};

type LoadPageReturn<T> = {
  loading: boolean;
  loadPage: (pageNumber: number) => void;
  pageItems: Page<T>;
};

function applyPage<T>(
  items: ReturnType<typeof emptyPage<T>>,
  newPageItems: ReturnType<typeof emptyPage<T>>,
  mergePages: boolean
) {
  return mergePages ? mergePagesOrReset(items, newPageItems) : newPageItems;
}

export function useLoadPage<T, P>(options: LoadPageOptions<T, P>): LoadPageReturn<T> {
  const { pageRequest, queryParams, pageNumber = 1, mergePages = true } = options;
  const [loading, setLoading] = useState(true);
  const [pageItems, setPageItems] = useState(emptyPage<T>());

  async function loadPage(page: number) {
    const newPageItems = await pageRequest(page, (queryParams ?? {}) as P);
    setPageItems(items => applyPage(items, newPageItems, mergePages));
  }

  useEffect(() => {
    // Flag to protect against race condition
    let ignore = false;

    void (async () => {
      try {
        setLoading(true);
        const newPageItems = await pageRequest(pageNumber, (queryParams ?? {}) as P);
        if (!ignore) {
          setPageItems(items => applyPage(items, newPageItems, mergePages));
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    })();

    return () => {
      ignore = true;
    };
  }, [pageRequest, queryParams, pageNumber, mergePages]);

  return { loading, loadPage, pageItems };
}

export function mergePagesOrReset<T>(page1: Page<T>, page2: Page<T>): Page<T> {
  // A new search was made so page 2 is the first page and should be the new base.
  if (page2.number <= 1) {
    return page2;
  }

  // the next page was loaded, so merge page content.
  return { ...page2, content: [...page1.content, ...page2.content] };
}
