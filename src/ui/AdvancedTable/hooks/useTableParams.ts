import classNames from 'classnames';
import { debounce } from 'lodash';
import { useContext, useMemo } from 'react';
import { AdvancedTableContext } from '../AdvancedTable';
import { SortType } from '../parts/TableHeader';

type UseTableParamsOptions = {
  param?: string;
  sortable: boolean;
};

export function useTableParams({ param, sortable }: UseTableParamsOptions) {
  const { queryParams, onParamChange, sort } = useContext(AdvancedTableContext);

  function onSort() {
    let newSort: SortType | undefined;
    if (sort?.param === param) {
      switch (sort?.direction) {
        case 'ASC':
          newSort = 'DESC';
          break;
        case 'DESC':
          newSort = 'ASC';
          break;
        case '':
          newSort = 'ASC';
          break;
      }
    } else {
      newSort = 'ASC';
    }

    onParamChange({
      ...queryParams,
      sort: newSort ? `${param},${newSort}` : undefined
    });
  }

  const sortClassNames = classNames({
    sort: sortable,
    'sort-asc': sort?.param === param && sort?.direction === 'ASC',
    'sort-desc': sort?.param === param && sort?.direction === 'DESC'
  });

  const changeParam = useMemo(
    () =>
      debounce((label: string | undefined, value: string) => {
        if (!label) {
          return;
        }

        onParamChange({ ...queryParams, [label]: value });
      }, 200),
    [onParamChange, queryParams]
  );

  return { queryParams, changeParam, sortClassNames, onSort };
}
