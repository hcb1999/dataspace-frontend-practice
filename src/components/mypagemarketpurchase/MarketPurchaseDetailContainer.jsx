import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LeftMenu from '../common/LeftMenu';
import LandingPageModal from '../marketdetail/LandingPageModal';
import AssetChainSections from '../common/AssetChainSections';
import AssetVerificationSection from '../common/AssetVerificationSection';
import useAxiosApi from '../../hooks/useAxiosApi';
import Swal from 'sweetalert2';
import axios from 'axios';
import environmentConfig from '../../config/config';
import { getTransactionUrl, getContractUrl, getAccountUrl } from '../../utils/ledgerUrl';

const MarketPurchaseDetailContainer = () => {
  const { purchaseNo } = useParams();
  const navigate = useNavigate();
  const [detailData, setDetailData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLandingModal, setShowLandingModal] = useState(false);
  const [showCertModal, setShowCertModal] = useState(false);
  const [assetVc, setAssetVc] = useState(null);
  const [isLoadingVc, setIsLoadingVc] = useState(false);
  const [vcData, setVcData] = useState(null); // VC 데이터를 저장하여 체인 정보에 사용

  const { execute: fetchPurchaseDetail } = useAxiosApi(`/purchase/${purchaseNo}`, 'GET');
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetchPurchaseDetail();
        
        // 서버 응답 구조: { resultCode, resultMessage, data }
        if (response && response.resultCode === 200 && response.data) {
          console.log('Purchase detail response:', response);
          setDetailData(response.data);
        } else {
          console.error('Invalid response structure:', response);
          Swal.fire('오류', '데이터를 불러올 수 없습니다.', 'error');
        }
      } catch (err) {
        console.error('Error fetching purchase detail:', err);
        Swal.fire('오류', '데이터를 불러오는 중 오류가 발생했습니다.', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    if (purchaseNo) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchaseNo]);

  const handleShowCertificate = async () => {
    try {
      setIsLoadingVc(true);
      // detailData에서 marketNo를 가져와서 사용
      const marketNo = detailData?.marketNo;
      if (!marketNo) {
        Swal.fire('오류', '마켓 정보를 찾을 수 없습니다.', 'error');
        setIsLoadingVc(false);
        return;
      }

      // 동적으로 API 호출
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(`${environmentConfig.apiUrl}/market/vc/${marketNo}`, {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      
      const vcResponse = response.data;
      console.log('VC response:', vcResponse);
      
      // 서버 응답 구조: { resultCode, resultMessage, data: { vc: {...} } }
      if (vcResponse && vcResponse.resultCode === 200 && vcResponse.data && vcResponse.data.vc) {
        const vcDataFromApi = vcResponse.data.vc;
        
        // VC 데이터 저장 (체인 정보에 사용)
        setVcData(vcDataFromApi);
        
        // AssetVerificationSection이 기대하는 형식으로 변환
        const convertedVc = {
          issuerDid: vcDataFromApi.issuerDid || vcDataFromApi.issuer || null,
          issuer: vcDataFromApi.issuer || '-',
          issuanceDate: vcDataFromApi.registrationDate || new Date().toISOString(),
          expirationDate: vcDataFromApi.registrationDate ? new Date(new Date(vcDataFromApi.registrationDate).getTime() + 365 * 24 * 60 * 60 * 1000).toISOString() : new Date().toISOString(),
          credentialSubject: {
            kaaset: {
              assetId: vcDataFromApi.dataId || '-',
              assetName: vcDataFromApi.dataName || '-',
              dataName: vcDataFromApi.dataName || '-',
              provider: vcDataFromApi.issuer || '-',
              description: vcDataFromApi.dataDesc || '-',
              productType: vcDataFromApi.productType || '-',
              language: vcDataFromApi.language || '-',
              topic: vcDataFromApi.subject || '-',
              registrantEmail: vcDataFromApi.registrantEmail || '-',
              registrantWalletAddress: vcDataFromApi.registrantWalletAddress || '-',
              assetPrice: vcDataFromApi.dataPrice || '0',
              txId: vcDataFromApi.txId || '-',
              contractAddress: vcDataFromApi.contractAddress || '-',
              imageURL: vcDataFromApi.imageURL || '',
            }
          }
        };
        
        setAssetVc(convertedVc);
        setShowCertModal(true);
      } else {
        console.error('Invalid VC response structure:', vcResponse);
        Swal.fire('오류', '등록증 데이터를 불러올 수 없습니다.', 'error');
      }
    } catch (err) {
      console.error('Error fetching VC data:', err);
      Swal.fire('오류', '등록증 데이터를 불러오는 중 오류가 발생했습니다.', 'error');
    } finally {
      setIsLoadingVc(false);
    }
  };

  // 가격 포맷팅
  const formatPrice = (price) => {
    if (price === null || price === undefined || price === '') return '무료';
    const numPrice = Number(price);
    if (isNaN(numPrice)) return '무료';
    if (numPrice === 0) return '무료';
    return `${numPrice.toLocaleString('ko-KR', { 
      minimumFractionDigits: 0,
      maximumFractionDigits: 6 
    })} ETH`;
  };

  // 날짜 포맷팅
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  if (isLoading) {
    return (
      <main>
        <section className="flex justify-center mt-16 mb-12">
          <LeftMenu pageName="mypage" />
          <section className="flex-1 ml-4 max-w-screen-lg">
            <div className="text-center py-20">
              <div className="text-gray-500">데이터를 불러오는 중...</div>
            </div>
          </section>
        </section>
      </main>
    );
  }

  if (!detailData) {
    return (
      <main>
        <section className="flex justify-center mt-16 mb-12">
          <LeftMenu pageName="mypage" />
          <section className="flex-1 ml-4 max-w-screen-lg">
            <div className="text-center py-20">
              <div className="text-gray-500">데이터를 찾을 수 없습니다.</div>
            </div>
          </section>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="flex justify-center mt-16 mb-12">
        <LeftMenu pageName="mypage" />
        <section className="flex-1 ml-4 max-w-screen-lg">
          <div className="bg-white border-l-4 border-l-blue-500 border border-gray-200 rounded-lg p-8">
            {/* 상단: 구매 데이터 라벨 및 뒤로가기 */}
            <div className="flex justify-between items-start mb-6">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 border border-blue-300 flex items-center gap-1 w-fit">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                구매 데이터
              </span>
              <button
                onClick={() => navigate('/mypage/market/purchase')}
                className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50"
              >
                목록으로
              </button>
            </div>

            {/* 제목 */}
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              {detailData.marketDataName || '제목 없음'}
            </h1>

            {/* 태그 */}
            <div className="flex flex-wrap gap-2 mb-6">
              {detailData.marketSubject && (
                <span className="px-2 py-1 text-xs rounded bg-blue-600 text-white">
                  {detailData.marketSubject}
                </span>
              )}
              <span className="px-2 py-1 text-xs border border-gray-300 rounded bg-white text-gray-700">
                {detailData.price && detailData.price > 0 ? '유료' : '무료'}
              </span>
              {detailData.stateDesc && (
                <span className={`px-2 py-1 text-xs border rounded ${
                  detailData.stateDesc.includes('완료') 
                    ? 'bg-green-100 text-green-700 border-green-300' 
                    : 'bg-gray-100 text-gray-700 border-gray-300'
                }`}>
                  {detailData.stateDesc}
                </span>
              )}
            </div>

            {/* 구매 정보 */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">구매 가격</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatPrice(detailData.price)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">결제일</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatDate(detailData.payDttm)}
                  </p>
                </div>
                {detailData.purchaseCnt !== undefined && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">구매 개수</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {detailData.purchaseCnt}개
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* 상세 정보 테이블 */}
            <div className="bg-white p-6 rounded-md border border-gray-300 mb-6">
              <h3 className="text-xl font-bold mb-6">데이터 설명</h3>
              
              <div className="border-t border-gray-200">
                <div className="flex border-b border-gray-200 min-h-[60px]">
                  <div className="w-40 bg-[#f3f6f9] flex items-center px-4 font-bold text-sm text-gray-800 border-r border-gray-200">
                    데이터설명
                  </div>
                  <div className="flex-1 flex items-center px-4 py-3 text-sm text-gray-700">
                    {detailData.marketDataDesc || '-'}
                  </div>
                </div>

                <div className="flex border-b border-gray-200 min-h-[60px]">
                  <div className="w-40 bg-[#f3f6f9] flex items-center px-4 font-bold text-sm text-gray-800 border-r border-gray-200">
                    상품유형
                  </div>
                  <div className="flex-1 flex items-center px-4 py-3 text-sm text-gray-700 border-r border-gray-200">
                    {detailData.marketProductType || '-'}
                  </div>
                  <div className="w-40 bg-[#f3f6f9] flex items-center px-4 font-bold text-sm text-gray-800 border-r border-gray-200">
                    언어
                  </div>
                  <div className="flex-1 flex items-center px-4 py-3 text-sm text-gray-700">
                    {detailData.marketLanguage || '-'}
                  </div>
                </div>

                <div className="flex border-b border-gray-200 min-h-[60px]">
                  <div className="w-40 bg-[#f3f6f9] flex items-center px-4 font-bold text-sm text-gray-800 border-r border-gray-200">
                    키워드
                  </div>
                  <div className="flex-1 flex items-center px-4 py-3 text-sm text-gray-700">
                    {detailData.marketKeyword || '-'}
                  </div>
                </div>

                {detailData.marketDoi && (
                  <>
                    <div className="flex border-b border-gray-200 min-h-[60px]">
                      <div className="w-40 bg-[#f3f6f9] flex items-center px-4 font-bold text-sm text-gray-800 border-r border-gray-200">
                        DOI 번호
                      </div>
                      <div className="flex-1 flex items-center px-4 py-3 text-sm text-gray-700">
                        {detailData.marketDoi}
                      </div>
                    </div>
                    <div className="flex border-b border-gray-200 min-h-[60px]">
                      <div className="w-40 bg-[#f3f6f9] flex items-center px-4 font-bold text-sm text-gray-800 border-r border-gray-200">
                        DOI URL
                      </div>
                      <div className="flex-1 flex flex-col justify-center px-4 py-3 text-sm text-gray-700">
                        <div className="flex items-center mb-1">
                          <a 
                            href={`${detailData.marketDoiUrl}`}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="border border-gray-300 rounded px-3 py-2 bg-white text-blue-700 flex items-center w-fit cursor-pointer hover:bg-blue-50 transition-colors"
                          >
                            <span className="mr-2 hover:underline truncate max-w-md">
                             {detailData.marketDoiUrl}
                            </span>
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="flex border-b border-gray-200 min-h-[60px]">
                  <div className="w-40 bg-[#f3f6f9] flex items-center px-4 font-bold text-sm text-gray-800 border-r border-gray-200">
                    주제
                  </div>
                  <div className="flex-1 flex items-center px-4 py-3 text-sm text-gray-700 border-r border-gray-200">
                    {detailData.marketSubject || '-'}
                  </div>
                  <div className="w-40 bg-[#f3f6f9] flex items-center px-4 font-bold text-sm text-gray-800 border-r border-gray-200">
                    데이터 발행기관
                  </div>
                  <div className="flex-1 flex items-center px-4 py-3 text-sm text-gray-700">
                    {detailData.marketIssuer || '-'}
                  </div>
                </div>
              </div>
            </div>

            {/* 버튼 */}
            <div className="flex justify-end gap-4">
              <button
                onClick={() => navigate('/mypage/market/purchase')}
                className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
              >
                목록으로
              </button>
              
              <button
                onClick={handleShowCertificate}
                disabled={isLoadingVc}
                className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoadingVc ? '로딩 중...' : '데이터 등록증 보기'}
              </button>
            </div>

           
          </div>
           {/* 공용 체인 섹션 */}
            <AssetChainSections
              tokenInfo={detailData?.tokenInfo?.map(token => ({
                ...token,
                ownerAccountUrl: getAccountUrl(token.ownerAccount)
              })) || (vcData ? [{
                tokenId: vcData.dataId || '-',
                ownerAccount: vcData.registrantWalletAddress || detailData?.saleAccount || '-',
                ownerAccountUrl: getAccountUrl(vcData.registrantWalletAddress || detailData?.saleAccount)
              }] : undefined)}
              transactionId={detailData?.nftTxId || vcData?.txId}
              transactionLink={getTransactionUrl(detailData?.nftTxId || vcData?.txId)}
              contractAddress={detailData?.nftContractAddress || vcData?.contractAddress}
              contractLink={getContractUrl(detailData?.nftContractAddress || vcData?.contractAddress)}
            />          
        </section>
        
      </section>
      {showLandingModal && detailData?.marketDoiUrl && (
        <LandingPageModal url={detailData.marketDoiUrl} onClose={() => setShowLandingModal(false)} />
      )}
      {showCertModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
          onClick={() => {
            setShowCertModal(false);
            setAssetVc(null);
          }}
        >
          <div
            className="relative w-full max-width[768px] md:max-w-3xl max-h-[90vh] overflow-y-auto custom-scrollbar pr-2 bg-transparent"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setShowCertModal(false);
                setAssetVc(null);
              }}
              className="absolute top-2 right-2 text-3xl text-gray-700 bg-white bg-opacity-80 rounded-full px-3 py-1 hover:bg-gray-300 hover:bg-opacity-100 focus:outline-none z-10 shadow"
              aria-label="닫기"
            >
              &times;
            </button>
            {isLoadingVc ? (
              <div className="bg-white p-20 text-center">
                <div className="text-gray-500">등록증 데이터를 불러오는 중...</div>
              </div>
            ) : (
              <AssetVerificationSection assetVc={assetVc} />
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default MarketPurchaseDetailContainer;

