import { useQueryParams } from '@42.nl/react-url';
import { QueryObserverSuccessResult, useQuery } from '@tanstack/react-query';
import { ReactNode, createContext, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Table } from 'reactstrap';
import { Spinner } from '../';
import { Page } from '../../hooks/useLoadPage/spring-models';
import Pagination from '../Pagination/Pagination';
import './_table.scss';
import { SortType } from './parts/TableHeader';

type Props<T, QP extends Record<string, any>> = {
  loadData: (queryParams: QP) => Promise<Page<T>>;
  emptyMessage?: string;
  headColumns: ReactNode;
  onParamChange: (params: QP) => void;
  defaultParams: QP;
  children: (state: QueryObserverSuccessResult<Page<T>>) => ReactNode | ReactNode[];
};

type CurrentSort = { param: string; direction: SortType };

type ContextProps = {
  queryParams: Record<string, any>;
  onParamChange: (params: Record<string, any>) => void;
  sort: CurrentSort | undefined;
};

function getSort(queryParams?: Record<string, any>): any {
  if (!queryParams) {
    return {};
  }

  const sortParam: string = queryParams['sort'];

  if (sortParam) {
    const strArr = sortParam.split(',');
    return {
      param: strArr[0],
      direction: strArr[1].toLocaleUpperCase() as SortType
    };
  }

  return {};
}

export const AdvancedTableContext = createContext<ContextProps>({
  queryParams: {},
  onParamChange: () => undefined,
  sort: {} as CurrentSort
});

export function AdvancedTable<T, QP extends Record<string, any>>(props: Props<T, QP>) {
  const { loadData, emptyMessage, headColumns, onParamChange, defaultParams, children } =
    props;
  const [sort, setSort] = useState<CurrentSort>();

  const location = useLocation();
  const queryParams = useQueryParams({
    location,
    defaultQueryParams: defaultParams
  });
  const state = useQuery({
    queryKey: ['loadZorgaanbieders', queryParams],
    queryFn: () => loadData(queryParams)
  });

  const values = useMemo<ContextProps>(
    () => ({
      queryParams,
      onParamChange: value => onParamChange(value as QP),
      sort
    }),
    [onParamChange, queryParams, sort]
  );

  useEffect(() => {
    setSort(getSort(queryParams));
  }, [queryParams]);

  return (
    <AdvancedTableContext.Provider value={values}>
      <Table striped hover>
        <thead>{headColumns}</thead>
        {state.isSuccess && state.data.content.length !== 0 && (
          <tbody>{children(state)}</tbody>
        )}
      </Table>
      {state.isSuccess && state.data.content.length === 0 && (
        <div className="d-flex justify-content-center p-5 border-primary border">
          {emptyMessage}
        </div>
      )}
      {state.isLoading && (
        <div className="d-flex justify-content-center p-5 gap-2 border-primary border">
          Gegevens worden opgehaald <Spinner size={25} color="#000" />
        </div>
      )}
      {state.isError && (
        <div className="d-flex justify-content-center p-5 gap-2 border-primary border">
          Er is iets mis gegaan! Probeer het later nog een keer.
        </div>
      )}
      <Pagination
        className="d-flex justify-content-center mt-2"
        totalPages={state.isSuccess ? state.data.number : 0}
        activePage={state.isSuccess ? state.data.number : 1}
        onSelect={page => onParamChange({ ...queryParams, page })}
      />
    </AdvancedTableContext.Provider>
  );
}
