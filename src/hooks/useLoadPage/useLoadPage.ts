import { useCallback, useEffect, useState } from 'react';
import { Page, emptyPage } from './spring-models';

interface LoadPageOptions<T, P> {
  pageRequest: (pageNumber: number, queryParams: P) => Promise<Page<T>>;
  queryParams?: P;
  pageNumber?: number;
  mergePages?: boolean;
}

interface LoadPageReturn<T> {
  loading: boolean;
  loadPage: (pageNumber: number) => void;
  pageItems: Page<T>;
}

export default function useLoadPage<T, P>(
  options: LoadPageOptions<T, P>
): LoadPageReturn<T> {
  const { pageRequest, queryParams, pageNumber = 1, mergePages = true } = options;
  const [loading, setLoading] = useState(true);
  const [pageItems, setPageItems] = useState(emptyPage<T>());

  const loadPage = useCallback(
    async (page: number) => {
      const newPageItems = await pageRequest(page, queryParams as P);
      setPageItems(items =>
        mergePages ? mergePagesOrReset(items, newPageItems) : newPageItems
      );
    },
    [queryParams, pageRequest, mergePages]
  );

  const loadPageWithoutParams = useCallback(
    async (page: number) => {
      const newPageItems = await pageRequest(page, {} as P);
      setPageItems(items =>
        mergePages ? mergePagesOrReset(items, newPageItems) : newPageItems
      );
    },
    [pageRequest, mergePages]
  );

  useEffect(() => {
    async function init() {
      setLoading(true);
      if (!queryParams) {
        await loadPageWithoutParams(pageNumber);
      } else {
        await loadPage(pageNumber);
      }
      setLoading(false);
    }

    init();
  }, [loadPage, loadPageWithoutParams, queryParams, pageNumber]);

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
