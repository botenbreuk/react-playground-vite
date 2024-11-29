import moment, { Moment } from 'moment';
import 'moment/locale/nl';
import { DateFormatType, MomentType } from './types';

const dateFormat = {
  SHORT: 'D-M-Y H:mm',
  DEFAULT: 'DD-MM-YYYY HH:mm',
  LONG: 'LLLL',
  LONG_DATE: 'LL',
  DETAILED: 'DD-MM-YYYY HH:mm:ss'
};

export function format(date?: MomentType | null, type?: DateFormatType) {
  if (date === undefined || date === null) {
    return '-';
  }

  if (typeof date === 'string') {
    date = moment.utc(date);
  }

  const formatType = type || 'DEFAULT';

  return date.isValid() ? date.format(dateFormat[formatType]) : '';
}

export function now() {
  return moment.utc(new Date().toLocaleString('nl-NL'), 'DD-M-YYYY HH:mm:ss');
}

export function toISOString(date?: Moment) {
  return date ? moment.utc(date).toISOString() : '';
}

export * as dateUtils from './';
