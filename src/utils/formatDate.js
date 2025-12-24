import { format } from 'date-fns';
import { getLang } from '../translation';

export const formatDate = (datetimeString, lang = getLang()) => {
  if (!datetimeString) return '-';
  const date = new Date(datetimeString);
  if (isNaN(date)) return datetimeString;
  if (lang === 'en') {
    return format(date, 'MM/dd/yyyy');
  }
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};


