import { UTCDate } from '@date-fns/utc';
import { format as dateFormat, parseISO, setDefaultOptions } from 'date-fns';
import { nl } from 'date-fns/locale/nl';

setDefaultOptions({ locale: nl });

const dateFormats = {
  SHORT: 'd-M-y H:mm',
  DEFAULT: 'dd-MM-yyyy HH:mm',
  DATE_LONG: 'dd-MM-yyyy',
  LONG: 'EEEE d MMMM yyyy HH:mm',
  LONG_DATE: 'EEEE d MMMM yyyy',
  DETAILED: 'dd-MM-yyyy HH:mm:ss'
};

export function format(
  date: Date | string | null | undefined,
  type: keyof typeof dateFormats = 'DEFAULT'
) {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  if (!date) {
    return '-';
  }

  return dateFormat(date, dateFormats[type]);
}

export function now() {
  return new UTCDate();
}

export function roundTime(date: Date) {
  const minutes = date.getMinutes();
  let hours = date.getHours();

  const m = (Math.round(minutes / 15) * 15) % 60;
  const h = minutes > 52 ? (hours === 23 ? 0 : ++hours) : hours;

  return { minutes: m, hours: h };
}

export function fromString(value: string) {
  return parseISO(value);
}

export function toString(value: Date) {
  return dateFormat(value, "yyyy-MM-dd'T'HH:mm:ss.SSS");
}

export * as dateUtils from './';
