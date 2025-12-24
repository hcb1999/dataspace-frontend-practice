import React, { useEffect, useState } from 'react';
import LeftMenu from '../common/LeftMenu';
import Pagination from '../common/Pagination';
import SearchSection from './SearchSection';
import AssetsCardSection from './AssetsCardSection';
import useAxiosApi from '../../hooks/useAxiosApi';
import { t, getLang, onLangChange } from '../../translation';

const MyMarketPurchaseContainer = ({
  titleKey = 'page.mypage.marketPurchase.title',
  endpointPath = '/purchase',
}) => {
  const [searchCondition, setSearchCondition] = useState({
    startDttm: '',
    endDttm: '',
    word: '',
  });

  const [currentSellPage, setCurrentSellPage] = useState(1);
  const [sellData, setSellData] = useState(null);
  const [isSellingLoading, setIsSellingLoading] = useState(false);

  const { execute: fetchMyAssets } = useAxiosApi('/purchase', 'GET');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsSellingLoading(true);
        
        // 쿼리 파라미터 구성
        const params = {};
        Object.keys(searchCondition).forEach(key => {
          if (searchCondition[key]) {
            params[key] = searchCondition[key];
          }
        });
        params.pageNo = currentSellPage;
        
        // 실제 API 호출
        const response = await fetchMyAssets(params);
        
        // 서버 응답 구조: { resultCode, resultMessage, data: { pageSize, totalCount, totalPage, list } }
        if (response && response.resultCode === 200 && response.data) {
          console.log('Purchase data response:', response);
          setSellData(response);
        } else {
          console.error('Invalid response structure:', response);
          setSellData({ data: { list: [], totalPage: 0, totalCount: 0 } });
        }
      } catch (err) {
        console.error('구매 에셋 데이터 가져오기 에러:', err);
        setSellData({ data: { list: [], totalPage: 0, totalCount: 0 } });
      } finally {
        setIsSellingLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchCondition, currentSellPage]);

  const handleSearchChange = condition => {
    setSearchCondition(condition);
    setCurrentSellPage(1);
  };

  const [lang, setLangState] = useState(getLang());
  useEffect(() => {
    const off = onLangChange(() => setLangState(getLang()));
    return off;
  }, []);

  return (
    <>
      <main>
        <section className="flex justify-center mt-16">
          <LeftMenu pageName="mypage" />
          <section className="flex-1 ml-4 max-w-screen-lg">
            <div className="flex justify-between">
              <h2 className="text-2xl mb-5">{t(titleKey)}</h2>
            </div>

            <SearchSection onSearch={handleSearchChange} />

            {sellData?.data?.totalCount !== undefined && (
              <div className="mb-4 text-sm text-gray-600">
                총 {sellData.data.totalCount}개의 구매 데이터
              </div>
            )}

            <AssetsCardSection
              data={sellData?.data?.list || []}
              isLoading={isSellingLoading}
            />
            <Pagination
              currentPage={currentSellPage}
              totalPage={sellData?.data?.totalPage || 0}
              onPageChange={setCurrentSellPage}
            />
          </section>
        </section>
      </main>
    </>
  );
};

export default MyMarketPurchaseContainer;


