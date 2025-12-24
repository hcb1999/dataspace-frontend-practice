import { useMemo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, parseISO } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import koLocale from 'date-fns/locale/ko';
import { getLang } from '../../translation';

const LocalizedDatePicker = ({
  value,
  onChange,
  lang: propLang,
  className,
  placeholder,
  isClearable = true,
  ...rest
}) => {
  const lang = propLang || getLang();
  const locale = lang === 'en' ? enUS : koLocale;
  const displayFormat = lang === 'en' ? 'MM/dd/yyyy' : 'yyyy-MM-dd';
  const placeholderText = placeholder || (lang === 'en' ? 'MM/DD/YYYY' : 'YYYY-MM-DD');
  const selectedDate = useMemo(() => {
    if (!value) return null;
    try {
      return parseISO(value);
    } catch (e) {
      return null;
    }
  }, [value]);

  const handleChange = date => {
    if (onChange) {
      onChange(date ? format(date, 'yyyy-MM-dd') : '');
    }
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleChange}
      dateFormat={displayFormat}
      placeholderText={placeholderText}
      locale={locale}
      className={className}
      isClearable={isClearable}
      {...rest}
    />
  );
};

export default LocalizedDatePicker;


