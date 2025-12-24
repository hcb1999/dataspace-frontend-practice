import React, { useEffect, useState } from 'react';
import { t, getLang, onLangChange } from '../../translation';
import LocalizedDatePicker from '../common/LocalizedDatePicker';

const SearchSection = ({ onSearch }) => {
  const [startDttm, setStartDttm] = useState('');
  const [endDttm, setEndDttm] = useState('');
  const [state, setState] = useState('');
  const [word, setWord] = useState('');

  const handleSearch = () => {
    const newCondition = {
      startDttm,
      endDttm,
      state,
      word,
    };
    onSearch(newCondition);
  };

  const [lang, setLangState] = useState(getLang());
  useEffect(() => {
    const off = onLangChange(() => setLangState(getLang()));
    return off;
  }, []);

  return (
    <article className="bg-gray-100 p-4 rounded-lg mb-4">
      <div className="flex items-center justify-center space-x-4">
        <select
          className="border border-gray-300 p-2 rounded w-32 h-10"
          value={state}
          onChange={e => setState(e.target.value)}
        >
          <option value="">{t('page.mypage.common.stateLabel')}</option>
          <option value="S1">{t('page.mypage.marketSell.stateOptions.S1')}</option>
          <option value="S2">{t('page.mypage.marketSell.stateOptions.S2')}</option>
          <option value="S3">{t('page.mypage.marketSell.stateOptions.S3')}</option>
          <option value="S4">{t('page.mypage.marketSell.stateOptions.S4')}</option>
          <option value="S5">{t('page.mypage.marketSell.stateOptions.S5')}</option>
        </select>

        <LocalizedDatePicker
          value={startDttm}
          onChange={setStartDttm}
          lang={lang}
          className="border border-gray-300 p-2 rounded w-28 h-10"
        />
        <span>~</span>
        <LocalizedDatePicker
          value={endDttm}
          onChange={setEndDttm}
          lang={lang}
          className="border border-gray-300 p-2 rounded w-28 h-10"
        />

        <input
          className="border border-gray-300 p-2 rounded w-40 h-10"
          type="text"
          placeholder={t('page.mypage.common.keywordPlaceholder')}
          value={word}
          onChange={e => setWord(e.target.value)}
        />

        <button
          type="button"
          className="bg-black text-white p-2 rounded"
          onClick={handleSearch}
        >
          {t('page.mypage.common.search')}
        </button>
        <button
          type="button"
          className="bg-gray-200 text-black p-2 rounded"
          onClick={() => {
            setState('');
            setStartDttm('');
            setEndDttm('');
            setWord('');
            onSearch({});
          }}
        >
          {t('page.mypage.common.reset')}
        </button>
      </div>
    </article>
  );
};

export default SearchSection;


