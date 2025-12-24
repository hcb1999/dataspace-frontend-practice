import React, { useEffect, useState } from 'react';
import { t, getLang, onLangChange } from '../../translation';

const AssetsTableSection = ({ data = [], isLoading }) => {
  const [lang, setLangState] = useState(getLang());
  useEffect(() => {
    const off = onLangChange(() => setLangState(getLang()));
    return off;
  }, []);
  const getStatusLabel = (state, stateDesc, currentLang) => {
    const code = String(state ?? '').toUpperCase();
    const desc = (stateDesc || '').trim();
    const koByCode = {
      '1': '판매전',
      '2': '판매중',
      '3': '판매중지',
      '4': '판매종료',
      '5': '판매완료',
      'S1': '제공전',
      'S2': '제공중',
      'S3': '제공중지',
      'S4': '제공종료',
      'S5': '제공완료',
      'S6': '판매삭제',
    };
    const enByCode = {
      '1': 'Before Sale',
      '2': 'On Sale',
      '3': 'Sale Suspended',
      '4': 'Sale Ended',
      '5': 'Sale Completed',
      'S1': 'Not Provided',
      'S2': 'Providing',
      'S3': 'Provision Suspended',
      'S4': 'Provision Ended',
      'S5': 'Provision Completed',
      'S6': 'Sale Deleted',
    };
    const koByDesc = {
      '판매전': '판매전',
      '판매중': '판매중',
      '판매중지': '판매중지',
      '판매종료': '판매종료',
      '판매완료': '판매완료',
      '판매삭제': '판매삭제',
      '제공전': '제공전',
      '제공중': '제공중',
      '제공중지': '제공중지',
      '제공종료': '제공종료',
      '제공완료': '제공완료',
    };
    const enByDesc = {
      '판매전': 'Before Sale',
      '판매중': 'On Sale',
      '판매중지': 'Sale Suspended',
      '판매종료': 'Sale Ended',
      '판매완료': 'Sale Completed',
      '판매삭제': 'Sale Deleted',
      '제공전': 'Not Provided',
      '제공중': 'Providing',
      '제공중지': 'Provision Suspended',
      '제공종료': 'Provision Ended',
      '제공완료': 'Provision Completed',
    };
    if (currentLang === 'ko') {
      return koByCode[code] || koByDesc[desc] || desc || '판매중';
    }
    return enByCode[code] || enByDesc[desc] || (desc ? enByDesc[desc] : 'On Sale');
  };
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
          <col className="w-48" />
          <col className="w-24" />
        </colgroup>

        <thead>
          <tr className="border-t border-b border-black">
            <th className="py-2">{t('page.mypage.common.no')}</th>
            <th className="py-2">{t('page.mypage.common.image')}</th>
            <th className="py-2">{t('page.mypage.common.name')}</th>
            <th className="py-2">{t('page.mypage.common.metaverse')}</th>
            <th className="py-2">{t('page.mypage.common.status')}</th>
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
              <td className="py-2">{getStatusLabel(item.state, item.stateDesc, lang)}</td>
              <td className="py-2">
                <button className="bg-gray-400 text-white py-1 px-3 rounded">
                  <a href={`/mypage/market/selldetail/${item.marketNo}`}>
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


