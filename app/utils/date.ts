import dayjs from 'dayjs';
import 'dayjs/locale/tr';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.locale('tr');

export const formatDate = (date: Date | string) => {
  return dayjs(date).format('DD MMMM YYYY');
};

export const formatDateTime = (date: Date | string) => {
  return dayjs(date).format('DD MMMM YYYY HH:mm');
};

export const formatRelativeTime = (date: Date | string) => {
  return dayjs(date).fromNow();
};

export const addDays = (date: Date | string, days: number) => {
  return dayjs(date).add(days, 'day').toDate();
};

export const subtractDays = (date: Date | string, days: number) => {
  return dayjs(date).subtract(days, 'day').toDate();
};

export const isOverdue = (date: Date | string) => {
  return dayjs(date).isBefore(dayjs());
};

export const getDaysBetween = (start: Date | string, end: Date | string) => {
  return dayjs(end).diff(dayjs(start), 'day');
}; 