import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, parseISO } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import koLocale from 'date-fns/locale/ko';
import { t, getLang, onLangChange } from '../../translation';

const MarketSearchSection = ({ onSearch }) => {
  const [startDttm, setStartDttm] = useState('');
  const [endDttm, setEndDttm] = useState('');
  const [word, setWord] = useState('');
  const [lang, setLangState] = useState(getLang());
  useEffect(() => {
    const off = onLangChange(() => setLangState(getLang()));
    return off;
  }, []);

  const handleSearch = () => {
    const newCondition = {
      startDttm,
      endDttm,
      word,
    };
    onSearch(newCondition);
  };

  return (
    <article className="bg-gray-100 p-4 rounded-lg mb-4">
      <div className="flex items-center justify-center space-x-4">
        <DatePicker
          selected={startDttm ? parseISO(startDttm) : null}
          onChange={date => setStartDttm(date ? format(date, 'yyyy-MM-dd') : '')}
          dateFormat="yyyy-MM-dd"
          placeholderText={t('page.market.search.startDate')}
          locale={lang === 'en' ? enUS : koLocale}
          className="border border-gray-300 p-2 rounded w-28 h-10"
          isClearable
        />
        <span>~</span>
        <DatePicker
          selected={endDttm ? parseISO(endDttm) : null}
          onChange={date => setEndDttm(date ? format(date, 'yyyy-MM-dd') : '')}
          dateFormat="yyyy-MM-dd"
          placeholderText={t('page.market.search.endDate')}
          locale={lang === 'en' ? enUS : koLocale}
          className="border border-gray-300 p-2 rounded w-28 h-10"
          isClearable
        />

        <input
          className="border border-gray-300 p-2 rounded w-40 h-10"
          type="text"
          placeholder={t('page.market.search.placeholder')}
          value={word}
          onChange={e => setWord(e.target.value)}
        />

        <button
          type="button"
          className="bg-black text-white p-2 rounded"
          onClick={handleSearch}
        >
          {t('page.market.search.searchBtn')}
        </button>
        <button
          type="button"
          className="bg-gray-200 text-black p-2 rounded"
          onClick={() => {
            setStartDttm('');
            setEndDttm('');
            setWord('');
            onSearch({});
          }}
        >
          {t('page.market.search.resetBtn')}
        </button>
      </div>
    </article>
  );
};

export default MarketSearchSection;


