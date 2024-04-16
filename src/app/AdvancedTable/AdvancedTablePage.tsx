import { Page as PageType } from '../../hooks/useLoadPage/spring-models';
import { Icon, Page } from '../../ui';
import { AdvancedTable } from '../../ui/AdvancedTable/AdvancedTable';
import { TableColumn } from '../../ui/AdvancedTable/parts/TableColumn';
import { TableHeader } from '../../ui/AdvancedTable/parts/TableHeader';

function getPage<T = { name: string; age: number }>(items: T[]): Promise<PageType<T>> {
  return Promise.resolve({
    content: items,
    number: 1,
    numberOfElements: items.length,
    size: items.length,
    totalElements: items.length,
    totalPages: 1,
    first: true,
    last: true
  });
}

export default function AdvancedTablePage() {
  return (
    <Page>
      <AdvancedTable
        loadData={() => getPage([{ name: 'test', age: 18 }])}
        defaultParams={{}}
        onParamChange={() => undefined}
        headColumns={
          <tr>
            <TableHeader label="Name" />
            <TableHeader label="Actions" />
          </tr>
        }
      >
        {({ data }) =>
          data.content.map(v => (
            <tr key={v.name}>
              <TableColumn>{v.name}</TableColumn>
              <TableColumn>
                <Icon type="bi-pencil-fill" />
              </TableColumn>
            </tr>
          ))
        }
      </AdvancedTable>
    </Page>
  );
}
