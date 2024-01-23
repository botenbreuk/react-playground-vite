export type HeaderTypeProps =
  | EnumSelectTypes
  | SelectTypes
  | InputTypes
  | DatePickerTypes
  | DefultTypes;

export type SortFilterProps = (Sortable | SortableDefault) &
  (Filterable | FilterableDefault);

type Sortable = {
  param: string;
  sortable: true;
};

type SortableDefault = {
  sortable?: boolean;
};

type Filterable = {
  param: string;
  filterable: true;
};

type FilterableDefault = {
  filterable?: boolean;
};

type EnumSelectTypes = {
  filterable: true;
  type: 'enum-select';
  enumName: string;
  emptyOption?: string;
  exclude?: string[];
};

type SelectTypes = {
  filterable: true;
  type: 'select';
  options: { value: string; label: string }[];
  emptyOption: string;
};

type InputTypes = {
  filterable: true;
  type: 'input';
};

export type DatePickerTypes = {
  filterable: true;
  type: 'datepicker';
  dateFormat?: string;
  timeFormat?: string;
  dateOnly?: boolean;
};

type DefultTypes = {
  type?: 'input';
};
