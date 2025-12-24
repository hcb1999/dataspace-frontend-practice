import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { t, getLang, onLangChange } from '../../translation';

const AssetsCardSection = ({ data = [], isLoading }) => {
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

  const formatDate = (dateString) => {
    if (!dateString) return '2025.06.12';
    // 이미 포맷된 문자열인 경우 그대로 반환
    if (typeof dateString === 'string' && dateString.match(/^\d{4}\.\d{2}\.\d{2}$/)) {
      return dateString;
    }
    // Date 객체나 ISO 문자열인 경우 포맷
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '2025.06.12';
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}.${month}.${day}`;
    } catch {
      return '2025.06.12';
    }
  };

  const getStatusBadgeColor = (state, stateDesc) => {
    const status = stateDesc || state;
    if (status.includes('판매중') || status.includes('제공중')) {
      return 'bg-green-100 text-green-800 border-green-300';
    } else if (status.includes('판매전') || status.includes('제공전')) {
      return 'bg-gray-100 text-gray-800 border-gray-300';
    } else if (status.includes('판매완료')) {
      return 'bg-blue-100 text-blue-800 border-blue-300';
    } else if (status.includes('판매종료') || status.includes('제공종료')) {
      return 'bg-red-100 text-red-800 border-red-300';
    } else if (status.includes('중지')) {
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    }
    return 'bg-gray-100 text-gray-800 border-gray-300';
  };

  return (
    <div className="w-full mt-4 space-y-4">
      {data.map((item, index) => (
        <div
          key={item.marketNo || index}
          className="bg-white border-l-4 border-l-orange-500 border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow relative"
        >
          {/* 상단: 판매 데이터 라벨, 태그 및 보관함담기 버튼 */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex flex-wrap gap-2 items-center">
              {/* 판매 데이터 라벨 */}
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-700 border border-orange-300 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                판매 데이터
              </span>
             
            
              <span className="px-2 py-1 text-xs border border-gray-300 rounded bg-white text-gray-700">
                {item.price && item.price > 0 ? '유료' : '무료'}
              </span>
              {item.price && item.price > 0 && (
                <span className="px-2 py-1 text-xs border border-gray-300 rounded bg-white text-gray-700">
                  {Number(item.price).toLocaleString('ko-KR', { maximumFractionDigits: 6 })} ETH
                </span>
              )}
            </div>
            <button className="flex items-center text-gray-600 hover:text-gray-800 text-sm">
              <svg 
                className="w-5 h-5 mr-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" 
                />
              </svg>
              보관함담기
            </button>
          </div>

          {/* 제목 */}
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            <Link 
              to={`/mypage/market/selldetail/${item.marketNo}`}
              className="hover:text-blue-600 transition-colors"
            >
              {item.marketDatatName || item.marketDataName || item.marketAssetName || '제목 없음'}
            </Link>
          </h3>

          {/* 설명 */}
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            {item.marketDataDesc || item.description || `${item.marketDatatName || item.marketDataName || '데이터'}에 대한 상세 정보입니다.`}
          </p>

          {/* 하단: 등록일, 판매 상태, 보유 수량 */}
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                등록일 {formatDate(item.regDttm || item.registrationDate || item.regDate)}
              </span>
              <span className={`px-3 py-1 text-xs font-medium rounded border ${getStatusBadgeColor(item.state, item.stateDesc)}`}>
                {item.stateDesc || '판매중'}
              </span>
              <span className="text-sm text-gray-700">
                보유 현황: <span className="font-semibold">{(item.inventoryCnt !== undefined ? item.inventoryCnt : item.stock || 0).toLocaleString()}</span>개
              </span>
              <span className="text-sm text-gray-700">
                판매 수량: <span className="font-semibold">{(item.saleCnt !== undefined ? item.saleCnt : 0).toLocaleString()}</span>개
              </span>
              <span className="text-sm text-gray-700">
                발행 수량: <span className="font-semibold">{(item.issueCnt !== undefined ? item.issueCnt : 0).toLocaleString()}</span>개
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AssetsCardSection;
