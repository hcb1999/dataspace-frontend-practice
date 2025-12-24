import React, { useState, useEffect } from 'react';
import LeftMenu from '../common/LeftMenu';
import MarketSearchSection from './MarketSearchSection';
import CardSection from './MarketCardSection';
import { t, getLang, onLangChange } from '../../translation';

const MarketContainer = () => {
  const [lang, setLangState] = useState(getLang());
  const [searchCondition, setSearchCondition] = useState({});

  useEffect(() => {
    const off = onLangChange(() => setLangState(getLang()));
    return off;
  }, []);

  const handleSearchChange = condition => {
    setSearchCondition(condition || {});
  };

  return (
    <>
      <main>
        <section className="flex justify-center mt-10 mb-12">
          <LeftMenu pageName="list" />
          <section className="flex-1 ml-4 max-w-screen-lg">
            <div className="flex justify-between">
              <h2 className="text-2xl mb-5">{t('page.market.title')}</h2>
            </div>
            <MarketSearchSection onSearch={handleSearchChange} />
            <CardSection searchCondition={searchCondition} />
          </section>
        </section>
      </main>
    </>
  );
};

export default MarketContainer;


