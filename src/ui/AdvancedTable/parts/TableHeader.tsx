import classNames from 'classnames';
import { isEmpty } from 'lodash';
import moment, { Moment } from 'moment';
import { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import DateTime from 'react-datetime';
import { Input } from 'reactstrap';
import { Icon } from '../../';
import { useTableParams } from '../hooks/useTableParams';
import { DatePickerTypes, HeaderTypeProps, SortFilterProps } from './header-types';

type Props = {
  className?: string;
  label: string | ReactNode;
  param?: string;
  width?: number;
} & HeaderTypeProps &
  SortFilterProps;

export type SortType = 'ASC' | 'DESC' | '';

export function TableHeader(props: Props) {
  const {
    className,
    label,
    param,
    paramOverride,
    filterable = false,
    sortable = false,
    type = 'input',
    width
  } = props;
  const { queryParams, changeParam, sortClassNames, onSort } = useTableParams({
    param,
    sortable,
    paramOverride
  });
  const [value, setValue] = useState<string>(param ? queryParams[param] : '');

  useEffect(() => {
    setValue(param ? queryParams[param] : '');
  }, [param, queryParams]);

  const headerClassNames = classNames('th-column', className);

  function onChange(v: string) {
    setValue(v);
    changeParam(param, v);
  }

  return (
    <th className={headerClassNames} style={{ width }}>
      <div className={sortClassNames} onClick={sortable ? onSort : undefined}>
        <label>{label}</label>
        {sortable && <Icon type="bi-sort-up" color="muted" />}
      </div>
      {filterable && (
        <div className="p-1 d-flex align-items-end">
          {type === 'input' && (
            <Input
              value={value}
              onChange={e => onChange(e.target.value)}
              placeholder={typeof label === 'string' ? label : ''}
            />
          )}
          {/* {props.type === 'enum-select' && (
            <EnumSelect
              enumName={props.enumName}
              id={props.enumName}
              value={value}
              onChange={e => onChange(e.target.value)}
              emptyOptionSelectable
              emptyOption
              emptyOptionText={props.emptyOption || undefined}
              excludedValues={props.exclude}
            />
          )} */}
          {props.type === 'select' && (
            <Select
              options={props.options}
              value={value}
              onChange={e => onChange(e)}
              emptyOptionText={props.emptyOption}
            />
          )}
          {props.type === 'datepicker' && (
            <DateTimePicker {...props} value={value} onChange={onChange} />
          )}
          {value && (
            <div>
              <Icon type="bi-x" color="danger" onClick={() => onChange('')} />
            </div>
          )}
        </div>
      )}
    </th>
  );
}

function Select(props: {
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
  emptyOptionText: string;
  multiple?: boolean;
}) {
  const { value, onChange, emptyOptionText, multiple = false, options } = props;

  const selectProps = {
    className: 'form-control',
    value,
    onChange: (e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value),
    multiple
  };

  return (
    <select {...selectProps}>
      <option value="">{emptyOptionText}</option>
      {options.map(({ value: v, label }) => (
        <option key={v} value={v}>
          {label}
        </option>
      ))}
    </select>
  );
}

function DateTimePicker({
  onChange,
  value,
  dateFormat = 'DD-MM-YYYY',
  timeFormat = 'HH',
  dateOnly
}: DatePickerTypes & { value: string; onChange: (value: string) => void }) {
  const format = dateOnly ? dateFormat : `${dateFormat} ${timeFormat}`;
  function getFormatted(v: string | Moment) {
    return moment.utc(v, format).format(format);
  }

  return (
    <DateTime
      onChange={v => onChange(getFormatted(v))}
      dateFormat={dateFormat}
      timeFormat={dateOnly ? false : timeFormat}
      closeOnSelect
      inputProps={{
        value: !isEmpty(value) ? getFormatted(value) : '',
        placeholder: format,
        autoComplete: 'off',
        readOnly: true
      }}
      className="w-100 cursor-pointer"
      utc
    />
  );
}
