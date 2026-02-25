import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from '../../translation';
import useAxiosApi from '../../hooks/useAxiosApi';
import Swal from 'sweetalert2';

// The content component that will go inside the "Asset Description" box - JUST THE TABLE PART
const DataProductDetailTable = ({ detailData }) => {
  return (
    <div className="w-full">
      {/* Detail Table Section */}
      <div className="border-t border-gray-200">
        {/* Row 1 */}
        <div className="flex border-b border-gray-200 min-h-[60px]">
          <div className="w-40 bg-[#f3f6f9] flex items-center px-4 font-bold text-sm text-gray-800 border-r border-gray-200">
            데이터설명
          </div>
          <div className="flex-1 flex items-center px-4 py-3 text-sm text-gray-700">
            {detailData.description}
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex border-b border-gray-200 min-h-[60px]">
          <div className="w-40 bg-[#f3f6f9] flex items-center px-4 font-bold text-sm text-gray-800 border-r border-gray-200">
            상품유형
          </div>
          <div className="flex-1 flex items-center px-4 py-3 text-sm text-gray-700 border-r border-gray-200">
            {detailData.productType}
          </div>
          <div className="w-40 bg-[#f3f6f9] flex items-center px-4 font-bold text-sm text-gray-800 border-r border-gray-200">
            언어
          </div>
          <div className="flex-1 flex items-center px-4 py-3 text-sm text-gray-700">
            {detailData.language}
          </div>
        </div>

        {/* Row 3 */}
        <div className="flex border-b border-gray-200 min-h-[60px]">
          <div className="w-40 bg-[#f3f6f9] flex items-center px-4 font-bold text-sm text-gray-800 border-r border-gray-200">
            키워드
          </div>
          <div className="flex-1 flex items-center px-4 py-3 text-sm text-gray-700">
            {detailData.keywords}
          </div>
        </div>

        {/* Row 4 */}
        <div className="flex border-b border-gray-200 min-h-[60px]">
          <div className="w-40 bg-[#f3f6f9] flex items-center px-4 font-bold text-sm text-gray-800 border-r border-gray-200">
            주제
          </div>
          <div className="flex-1 flex items-center px-4 py-3 text-sm text-gray-700 border-r border-gray-200">
            {detailData.topic}
          </div>
          <div className="w-40 bg-[#f3f6f9] flex items-center px-4 font-bold text-sm text-gray-800 border-r border-gray-200">
            데이터 발행기관
          </div>
          <div className="flex-1 flex items-center px-4 py-3 text-sm text-gray-700">
            {detailData.publisher}
          </div>
        </div>
      </div>
    </div>
  );
};

const AssetInfoSection = ({ assetData, marketNo, onShowCertificate, isLoadingVc }) => {
  const navigate = useNavigate();
  const [purchaseCnt, setPurchaseCnt] = useState(1);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const { execute: purchaseExecute } = useAxiosApi('/purchase', 'POST');

  // 서버 데이터가 없으면 로딩 상태 표시
  if (!assetData) {
    return (
      <div className="w-full py-20 text-center text-gray-500">
        데이터를 불러오는 중...
      </div>
    );
  }

  // 태그 생성 (주제와 발행기관을 태그로 사용)
  const tags = [];
  if (assetData.marketSubject) {
    tags.push({ text: assetData.marketSubject, type: "primary" });
  }
  if (assetData.marketIssuer) {
    tags.push({ text: assetData.marketIssuer, type: "default" });
  }
  if (assetData.price === 0 || !assetData.price) {
    tags.push({ text: "무료", type: "default" });
  }

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

  // 가격 포맷팅
  const formatPrice = (price) => {
    if (price === null || price === undefined || price === '') return '가격 미정';
    const numPrice = Number(price);
    if (isNaN(numPrice)) return '가격 미정';
    if (numPrice === 0) return '무료';
    return `${numPrice.toLocaleString('ko-KR', { 
      minimumFractionDigits: 0,
      maximumFractionDigits: 6 
    })} ETH`;
  };

  const detailData = {
    description: assetData.marketDataDesc || '-',
    productType: assetData.marketProductType || '-',
    language: assetData.marketLanguage || '-',
    keywords: assetData.marketKeyword || '-',
    marketDoi: assetData.marketDoi || '-',
    topic: assetData.marketSubject || '-',
    publisher: assetData.marketIssuer || '-'
  };

  const outerData = {
    seller: assetData.saleUserName || '판매자 정보 없음',
    saleStart: formatDate(assetData.startDttm),
    saleEnd: formatDate(assetData.endDttm),
    descriptionTitle: "데이터 설명",
    price: formatPrice(assetData.price),
    stock: assetData.inventoryCnt || 0
  };

  // 총 가격 계산
  const calculateTotalPrice = () => {
    if (!assetData.price || assetData.price === 0) return '무료';
    const total = Number(assetData.price) * purchaseCnt;
    return formatPrice(total);
  };

  // 구매 개수 변경 핸들러
  const handlePurchaseCntChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    const maxStock = assetData.inventoryCnt || 0;
    if (value < 1) {
      setPurchaseCnt(1);
    } else if (value > maxStock) {
      setPurchaseCnt(maxStock);
    } else {
      setPurchaseCnt(value);
    }
  };

  // 결제하기 핸들러
  const handlePurchase = async () => {
    if (!marketNo) {
      Swal.fire('오류', '마켓 정보를 찾을 수 없습니다.', 'error');
      return;
    }

    if (purchaseCnt < 1) {
      Swal.fire('오류', '구매 개수는 1개 이상이어야 합니다.', 'error');
      return;
    }

    const maxStock = assetData.inventoryCnt || 0;
    if (purchaseCnt > maxStock) {
      Swal.fire('오류', `구매 가능한 수량은 최대 ${maxStock}개입니다.`, 'error');
      return;
    }

    try {
      setIsPurchasing(true);
      
      // NFT 이전 중 메시지 표시
      Swal.fire({
        title: '결제 진행 중...',
        html: `
          <div class="text-center">
            <div class="mb-4">
              <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
            <p class="text-gray-700 font-medium mb-2">NFT 이전 중입니다</p>
            <p class="text-gray-500 text-sm mb-2">블록체인에서 NFT를 이전하고 있습니다</p>
            <p class="text-gray-500 text-sm">잠시만 기다려주세요...(약 15초 소요)</p>
          </div>
        `,
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Swal이 완전히 렌더링되도록 약간의 지연
      await new Promise(resolve => setTimeout(resolve, 300));

      // 구매 API 호출 후 8초 동안 로딩 표시 (프론트 처리)
      const apiPromise = purchaseExecute({
        marketNo: parseInt(marketNo),
        purchaseCnt: purchaseCnt
      });
      await new Promise(resolve => setTimeout(resolve, 25000));
      const response = await apiPromise;

      if (response && response.resultCode === 200) {
        Swal.fire({
          title: '결제 완료',
          text: '결제가 성공적으로 완료되었습니다.',
          icon: 'success',
          confirmButtonText: '확인'
        });
        
        // 마이페이지 구매데이터로 이동
        navigate('/mypage/market/purchase');
      } else {
        throw new Error(response?.resultMessage || '결제 처리 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('Purchase error:', error);
      const errorMessage = error?.response?.data?.resultMessage || error?.message || '결제 처리 중 오류가 발생했습니다.';
      Swal.fire({
        icon: 'error',
        title: '결제 실패',
        text: errorMessage
      });
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <div className="w-full">
      {/* Top Info Row */}
      <div className="flex justify-between w-full items-center border-b-2 py-4 border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
             {/* Placeholder for profile image */}
             <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
             </svg>
          </div>
          <div>
            <p className="text-lg font-bold">
              판매자: {outerData.seller}
            </p>
          </div>
        </div>
        <p className="text-gray-600 text-sm">
          판매일시: {outerData.saleStart} ~ {outerData.saleEnd}
        </p>
      </div>

      {/* NEW Header Section (Replaces market test...) */}
      <div className="mb-8 mt-8 relative">
        <div className="flex justify-between items-start mb-4">
          <div className="flex space-x-2">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className={`px-2 py-1 text-xs font-medium border rounded-sm ${
                  tag.type === 'primary'
                    ? 'bg-[#00607d] text-white border-[#00607d]'
                    : 'bg-white text-gray-600 border-gray-300'
                }`}
              >
                {tag.text}
              </span>
            ))}
          </div>
          <button className="flex items-center text-gray-500 hover:text-gray-700 text-sm">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            보관함담기
          </button>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          {assetData.marketDataName || '제목 없음'}
        </h1>

        <div className="flex flex-col mb-6 space-y-2">
          <p className="text-xl text-blue-500 font-bold">
            가격: {outerData.price}
          </p>
          <div className="flex flex-wrap gap-6 mt-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-600 font-medium">보유 현황:</span>
              <span className="text-gray-800 font-bold">{outerData.stock}개</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600 font-medium">판매 현황:</span>
              <span className="text-gray-800 font-bold">{assetData?.saleCnt || 0}개</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600 font-medium">발행 현황:</span>
              <span className="text-gray-800 font-bold">{assetData.issueCnt || assetData.inventoryCnt || 0}개</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-4 mb-6">
          <button className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 bg-white">
            데이터 문의하기
          </button>
          {onShowCertificate && (
            <button
              onClick={onShowCertificate}
              disabled={isLoadingVc}
              className="px-4 py-2 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoadingVc ? '로딩 중...' : '데이터 등록증 보기'}
            </button>
          )}
        </div>

        <div className="border-t-2 border-gray-800 mb-8"></div>
      </div>

      {/* Description Box with Inner Content (Table Only) */}
      <div className="bg-white p-6 rounded-md border border-gray-300">
        <h3 className="text-xl font-bold mb-6">{outerData.descriptionTitle}</h3>
        
        <DataProductDetailTable detailData={detailData} />
      </div>

      {/* Purchase Section */}
      <div className="mt-8 border-t border-gray-200 pt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">
              구매 개수:
            </label>  
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  if (purchaseCnt > 1) {
                    setPurchaseCnt(purchaseCnt - 1);
                  }
                }}
                disabled={purchaseCnt <= 1 || isPurchasing}
                className="w-8 h-8 rounded border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <input
                type="number"
                min="1"
                max={assetData.inventoryCnt || 0}
                value={purchaseCnt}
                onChange={handlePurchaseCntChange}
                disabled={isPurchasing}
                className="w-20 h-10 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                type="button"
                onClick={() => {
                  const maxStock = assetData.inventoryCnt || 0;
                  if (purchaseCnt < maxStock) {
                    setPurchaseCnt(purchaseCnt + 1);
                  }
                }}
                disabled={purchaseCnt >= (assetData.inventoryCnt || 0) || isPurchasing}
                className="w-8 h-8 rounded border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
              <span className="text-sm text-gray-500">
                / 최대 {assetData.inventoryCnt || 0}개
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-gray-500">총 결제 금액</div>
              <div className="text-xl font-bold text-blue-600">
                {calculateTotalPrice()}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handlePurchase}
            disabled={isPurchasing || (assetData.inventoryCnt || 0) === 0}
            className="bg-blue-500 text-white w-40 h-12 px-5 rounded-lg justify-center items-center flex hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-white text-lg font-bold">
              {isPurchasing ? '결제 중...' : '결제하기'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssetInfoSection;
