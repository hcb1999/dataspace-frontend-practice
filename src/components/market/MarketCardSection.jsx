import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLang, onLangChange } from '../../translation';
import useAxiosApi from '../../hooks/useAxiosApi';

const MarketCardSection = ({ searchCondition = {} }) => {
  const [lang, setLangState] = useState(getLang());
  const [marketList, setMarketList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const { execute: getMarketList } = useAxiosApi('/market', 'GET');
  
  useEffect(() => {
    const off = onLangChange(() => setLangState(getLang()));
    return off;
  }, []);

  useEffect(() => {
    fetchMarketList();
  }, [searchCondition]);

  const fetchMarketList = async () => {
    try {
      setLoading(true);
      const params = {};
      
      if (searchCondition.startDttm) {
        params.startDttm = searchCondition.startDttm;
      }
      if (searchCondition.endDttm) {
        params.endDttm = searchCondition.endDttm;
      }
      if (searchCondition.word) {
        params.word = searchCondition.word;
      }

      const response = await getMarketList(params);
      
      // 서버 응답 구조: { resultCode, resultMessage, data: { pageSize, totalCount, totalPage, list } }
      if (response && response.resultCode === 200 && response.data && response.data.list) {
        console.log('Market list data:', response.data.list);
        setMarketList(response.data.list);
        setTotalCount(response.data.totalCount || 0);
      } else {
        console.log('Invalid response structure:', response);
        setMarketList([]);
        setTotalCount(0);
      }
    } catch (error) {
      console.error('Failed to fetch market list:', error);
      setMarketList([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    // null, undefined, 빈 문자열 체크
    if (price === null || price === undefined || price === '') {
      return '가격 미정';
    }
    
    // 숫자로 변환
    const numPrice = Number(price);
    
    // NaN 체크
    if (isNaN(numPrice)) {
      return '가격 미정';
    }
    
    // 0 체크 (0은 유효한 가격)
    if (numPrice === 0) {
      return '0 ETH';
    }
    
    // 소수점 6자리까지 표시 (ETH는 작은 단위도 중요)
    return `${numPrice.toLocaleString('ko-KR', { 
      minimumFractionDigits: 0,
      maximumFractionDigits: 6 
    })} ETH`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('ko-KR', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit' 
      });
    } catch {
      return dateString;
    }
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

  if (marketList.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-gray-500">등록된 데이터가 없습니다.</div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4 text-sm text-gray-600">
        총 {totalCount}개의 데이터
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {marketList.map((item, index) => {
          // marketNo를 우선 사용, 없으면 marketVcId에서 숫자 추출
          let detailId = item.marketNo;
          if (!detailId && item.marketVcId) {
            const match = item.marketVcId.match(/-(\d+)$/);
            if (match) {
              detailId = match[1];
            }
          }
          // 둘 다 없으면 index 사용
          if (!detailId) {
            detailId = index;
          }
          
          return (
            <Link
              to={`/market/detail/${detailId}`}
              key={item.marketNo || index}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden block"
            >
              {/* 카드 내용 */}
              <div className="p-6">
                {/* 상태 배지 */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.state === 'S2' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {item.stateDesc || '판매중'}
                  </span>
                  {item.marketDoi && (
                    <span className="text-xs text-gray-500 truncate max-w-[120px]">
                      DOI: {item.marketDoi.length > 15 ? item.marketDoi.substring(0, 15) + '...' : item.marketDoi}
                    </span>
                  )}
                </div>

                {/* 제목 */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug line-clamp-2 min-h-[3.5rem]">
                  {item.marketDataName || '제목 없음'}
                </h3>

                {/* 판매자 정보 */}
                <div className="flex items-center mb-3 text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="truncate">{item.saleUserName || '판매자 정보 없음'}</span>
                </div>

                {/* 가격 및 재고 */}
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100">
                  <div className="text-lg font-bold text-blue-600">
                    {formatPrice(item.price)}
                  </div>
                  <div className="text-sm text-gray-500">
                    재고: {item.inventoryCnt || 0}개
                  </div>
                </div>
               

                {/* 판매 기간 */}
                <div className="text-xs text-gray-500"> 
                  <div className="flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(item.startDttm)} ~ {formatDate(item.endDttm)}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default MarketCardSection;
