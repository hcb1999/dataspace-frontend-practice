import { getLang } from '../translation';

export default function timeAgoFromNow(targetTimeString) {
  const now = new Date();
  const targetTime = new Date(targetTimeString);
  const timeDifference = now - targetTime;
  const seconds = Math.floor(timeDifference / 1000);
  const lang = getLang();
  const formatLabel = (value, koUnit, enSingular, enPlural) => {
    if (lang === 'en') {
      const isPlural = value !== 1;
      const unit = isPlural ? enPlural : enSingular;
      return `${value} ${unit} ago`;
    }
    return `${value}${koUnit} 전`;
  };

  if (seconds >= 86400) {
    const days = Math.floor(seconds / 86400);
    return formatLabel(days, '일', 'day', 'days');
  } else if (seconds >= 3600) {
    const hours = Math.floor(seconds / 3600);
    return formatLabel(hours, '시간', 'hour', 'hours');
  } else if (seconds >= 60) {
    const minutes = Math.floor(seconds / 60);
    return formatLabel(minutes, '분', 'minute', 'minutes');
  } else {
    return lang === 'en' ? 'Just now' : '방금 전';
  }
}


