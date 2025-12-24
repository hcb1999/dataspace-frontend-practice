import React, { useEffect, useState } from 'react';
import { t, getLang, onLangChange } from '../../translation';

const AssetsTableSection = ({ data = [], isLoading }) => {
  const [lang, setLangState] = useState(getLang());
  useEffect(() => {
    const off = onLangChange(() => setLangState(getLang()));
    return off;
  }, []);

  if (isLoading) {
    return <div className="text-center py-6">{t('page.mypage.common.loading')}</div>;
  }

  if (data.length === 0) {
    return (
      <div className="w-full mt-4">
        <p className="text-center py-6">{t('page.mypage.common.noData')}</p>
      </div>
    );
  }

  return (
    <div className="w-full mt-4">
      <table className="w-full">
        <colgroup>
          <col className="w-14" />
          <col className="w-24" />
          <col className="w-60" />
          <col className="w-24" />
          <col className="w-24" />
        </colgroup>

        <thead>
          <tr className="border-t border-b border-black">
            <th className="py-2">{t('page.mypage.common.no')}</th>
            <th className="py-2">{t('page.mypage.common.image')}</th>
            <th className="py-2">{t('page.mypage.common.name')}</th>
            <th className="py-2">{t('page.mypage.common.metaverse')}</th>
            <th className="py-2">{t('page.mypage.common.detail')}</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className="border-b border-gray-300 text-center text-gray-600"
            >
              <td className="py-2">{index + 1}</td>
              <td className="py-2 flex justify-center">
                <img
                  src={item.thumbnailFirst}
                  alt={t('page.assets.list.card.imageAlt')}
                  className="w-16 rounded"
                />
              </td>
              <td className="py-2">{item.marketAssetName}</td>
              <td className="py-2">
                {item.metaverseName === '로블록스'
                  ? '없음'
                  : item.metaverseName}
              </td>
              <td className="py-2">
                <button className="bg-gray-400 text-white py-1 px-3 rounded">
                  <a href={`/mypage/market/purchasedetail/${item.purchaseNo || item.marketNo}`}>
                    {t('page.mypage.common.detail')}
                  </a>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-4">{t('page.mypage.common.totalLabel')} : {data.length}{t('page.mypage.common.countSuffix')}</p>
    </div>
  );
};

export default AssetsTableSection;


