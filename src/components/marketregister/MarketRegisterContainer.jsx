import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import useAxiosApi from '../../hooks/useAxiosApi';
import { useNavigate } from 'react-router-dom';

const MarketRegisterContainer = () => {
  const navigate = useNavigate();
  const { execute: registerMarket } = useAxiosApi('/market', 'POST');
  const { execute: fetchMyAssets } = useAxiosApi('/market/mypage', 'GET');
  const [usedVcTypes, setUsedVcTypes] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    productType: '데이터서비스',
    language: '한국어',
    keywords: '',
    marketDoi: '',
    landingUrl: '',
    topic: '',
    publisher: '',
    price: '',
    stock: '',
    saleStartDate: '',
    saleEndDate: '',
    marketScType: ''
  });

  // 사용자의 판매 데이터를 가져와서 사용된 marketScType 확인
  useEffect(() => {
    const fetchUserAssets = async () => {
      try {
        let allItems = [];
        let currentPage = 1;
        let totalPage = 1;
        
        // 모든 페이지의 데이터를 가져오기
        do {
          const response = await fetchMyAssets({ pageNo: currentPage, pageSize: 10 });
          
          if (response && response.resultCode === 200 && response.data) {
            if (response.data.list && response.data.list.length > 0) {
              allItems = [...allItems, ...response.data.list];
            }
            totalPage = response.data.totalPage || 1;
            currentPage++;
          } else {
            break;
          }
        } while (currentPage <= totalPage);
        
        // 사용된 marketScType 추출
        const usedTypes = allItems
          .map(item => item.marketScType)
          .filter(type => type !== null && type !== undefined && type !== '')
          .map(type => {
            const numType = Number(type);
            // 2 범위의 값만 유효 (현재는 하드코딩된 값 "2"만 사용)
            if (numType === 2) {
              return numType;
            }
            return null;
          })
          .filter(type => type !== null);
        
        console.log('사용된 marketScType:', usedTypes);
        setUsedVcTypes(usedTypes);
      } catch (err) {
        console.error('사용자 판매 데이터 가져오기 실패:', err);
        // 에러가 발생해도 등록은 가능하도록 함
      }
    };

    fetchUserAssets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // 가격 필드에 소수점 6자리 제한 및 1 이하 제한
    if (name === 'price') {
      // 숫자와 소수점만 허용
      const numericValue = value.replace(/[^0-9.]/g, '');
      
      // 소수점이 여러 개 있는 경우 첫 번째만 허용
      const parts = numericValue.split('.');
      if (parts.length > 2) {
        const filteredValue = parts[0] + '.' + parts.slice(1).join('');
        setFormData(prev => ({
          ...prev,
          [name]: filteredValue
        }));
        return;
      }
      
      // 소수점 6자리 제한
      if (parts.length === 2 && parts[1].length > 6) {
        const limitedValue = parts[0] + '.' + parts[1].substring(0, 6);
        setFormData(prev => ({
          ...prev,
          [name]: limitedValue
        }));
        return;
      }
      
      // 1 이하 제한 검증
      const numValue = parseFloat(numericValue);
      if (numericValue !== '' && !isNaN(numValue) && numValue > 1) {
        // 1을 초과하는 경우 1로 제한
        setFormData(prev => ({
          ...prev,
          [name]: '1'
        }));
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        [name]: numericValue
      }));
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.marketScType) {
      Swal.fire({
        icon: 'error',
        title: '등록 불가',
        text: '증명 타입을 선택해주세요.',
        confirmButtonText: '확인'
      });
      return;
    }
    
    // 선택한 marketScType이 이미 사용 중인지 확인
    if (usedVcTypes.includes(Number(formData.marketScType))) {
      Swal.fire({
        icon: 'error',
        title: '등록 불가',
        text: '이미 사용 중인 증명 타입입니다. 다른 타입을 선택해주세요.',
        confirmButtonText: '확인'
      });
      return;
    }
    
    // 가격의 소수점이 7자리 이상인지 확인
    if (formData.price && formData.price.includes('.')) {
      const decimalPart = formData.price.split('.')[1];
      if (decimalPart && decimalPart.length > 6) {
        Swal.fire({
          icon: 'warning',
          title: '가격 입력 오류',
          text: '가격은 소수점 이하 6자리까지 입력할 수 있습니다.',
          confirmButtonText: '확인'
        });
        return;
      }
    }
    
    // 가격이 1을 초과하는지 확인
    const priceValue = parseFloat(formData.price);
    if (formData.price && (!isNaN(priceValue) && priceValue > 1)) {
      Swal.fire({
        icon: 'warning',
        title: '가격 입력 오류',
        text: '가격은 1 이하로 입력해야 합니다.',
        confirmButtonText: '확인'
      });
      return;
    }
    
    // 모든 필수 필드 검증
    const requiredFields = [
      { field: 'title', name: '상품명' },
      { field: 'description', name: '데이터 설명' },
      { field: 'productType', name: '상품유형' },
      { field: 'language', name: '언어' },
      { field: 'topic', name: '주제' },
      { field: 'publisher', name: '데이터 발행기관' },
      { field: 'keywords', name: '키워드' },
      { field: 'marketDoi', name: 'DOI 번호' },
      { field: 'landingUrl', name: '랜딩 페이지 URL' },
      { field: 'price', name: '가격' },
      { field: 'stock', name: '보유 수량' },
      { field: 'saleStartDate', name: '판매 시작일' },
      { field: 'saleEndDate', name: '판매 종료일' },
      { field: 'marketScType', name: '증명 타입' }
    ];
    
    for (const { field, name } of requiredFields) {
      if (!formData[field] || formData[field].toString().trim() === '') {
        Swal.fire({
          icon: 'warning',
          title: '입력 오류',
          text: `${name}을(를) 입력해주세요.`,
          confirmButtonText: '확인'
        });
        return;
      }
    }
    
    try {
      // API Payload Mapping
      const payload = {
        marketDataName: formData.title,
        marketDataDesc: formData.description,
        marketProductType: formData.productType,
        marketLanguage: formData.language,
        marketKeyword: formData.keywords,
        marketDoi: formData.marketDoi,
        marketSubject: formData.topic,
        marketIssuer: formData.publisher,
        marketDoiUrl: formData.landingUrl,
        price: Number(formData.price),
        issueCnt: Number(formData.stock),
        startDttm: formData.saleStartDate ? new Date(formData.saleStartDate).toISOString() : new Date().toISOString(),
        endDttm: formData.saleEndDate ? new Date(formData.saleEndDate).toISOString() : new Date().toISOString(),
        marketScType: formData.marketScType
      };

      console.log('Register Payload:', payload);

      const response = await registerMarket(payload, true); // multipart/form-data
      
      if (response) {
         Swal.fire({
           title: '등록 성공',
           text: '데이터가 성공적으로 등록되었습니다. 잠시만 기다려주세요...',
           icon: 'success',
           allowOutsideClick: false,
           didOpen: () => {
             Swal.showLoading();
           }
         });
         
         // 7초 대기
         await new Promise(resolve => setTimeout(resolve, 7000));
         
         Swal.close();
         navigate('/market'); // Redirect to market list
      }
    } catch (error) {
      console.error('Registration failed:', error);
      Swal.fire('등록 실패', '데이터 등록 중 오류가 발생했습니다.', 'error');
    }
  };

  return (
    <div className="max-w-[1024px] mx-auto mb-24 px-4 py-12">
      <div className="mb-10 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">데이터 등록</h1>
        <p className="text-gray-600 mt-2">새로운 데이터 상품을 등록합니다.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center text-gray-800">
            <span className="w-1.5 h-6 bg-blue-600 mr-3 rounded-r"></span>
            기본 정보
          </h2>
          
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">상품명 <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="예: 췌장암 Imputation 데이터 (국립암센터)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">데이터 설명 <span className="text-red-500">*</span></label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                placeholder="데이터에 대한 상세한 설명을 입력하세요."
              />
            </div>
          </div>
        </div>

        {/* Detail Info */}
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center text-gray-800">
            <span className="w-1.5 h-6 bg-blue-600 mr-3 rounded-r"></span>
            상세 정보
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">상품유형 <span className="text-red-500">*</span></label>
              <select
                name="productType"
                value={formData.productType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="데이터서비스">데이터서비스</option>
                <option value="비디오">비디오</option>
                <option value="CSV 파일">CSV 파일</option>
                <option value="OpenAPI">OpenAPI</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">언어 <span className="text-red-500">*</span></label>
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="한국어">한국어</option>
                <option value="영어">영어</option>
                <option value="중국어">중국어</option>
                <option value="일본어">일본어</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">증명 타입 <span className="text-red-500">*</span></label>
              <select
                name="marketScType"
                value={formData.marketScType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">증명 타입을 선택하세요</option>
                <option value="2" disabled={usedVcTypes.includes(2)}>데이터증명</option>
              </select>
              {formData.marketScType && usedVcTypes.includes(Number(formData.marketScType)) && (
                <p className="mt-1 text-sm text-red-600">이미 사용 중인 증명 타입입니다.</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">주제 <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="예: 건강의료복지"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">데이터 발행기관 <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="publisher"
                value={formData.publisher}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="예: 헬스케어"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">키워드 (쉼표로 구분) <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="keywords"
                value={formData.keywords}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="예: 암, 췌장암, Cancer, Imputation"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">DOI 번호 <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="marketDoi"
                value={formData.marketDoi}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="예: 10.1000/xyz123"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">랜딩 페이지 URL <span className="text-red-500">*</span></label>
              <input
                type="url"
                name="landingUrl"
                value={formData.landingUrl}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://..."
              />
            </div>
            
            <div className="md:col-span-2">
               <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800 flex items-center">
                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                     </svg>
                     입력하신 <strong>주제</strong>와 <strong>데이터 발행기관</strong> 정보는 상세 페이지의 <strong>태그</strong>로 자동 생성되어 노출됩니다.
                  </p>
               </div>
            </div>
          </div>
        </div>

        {/* Sales Info */}
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center text-gray-800">
            <span className="w-1.5 h-6 bg-blue-600 mr-3 rounded-r"></span>
            판매 정보
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">가격 (원, 1 이하) <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">보유 수량 <span className="text-red-500">*</span></label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">판매 시작일 <span className="text-red-500">*</span></label>
              <input
                type="date"
                name="saleStartDate"
                value={formData.saleStartDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">판매 종료일 <span className="text-red-500">*</span></label>
              <input
                type="date"
                name="saleEndDate"
                value={formData.saleEndDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-10">
          <button
            type="button"
            className="px-8 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-colors"
            onClick={() => window.history.back()}
          >
            취소
          </button>
          <button
            type="submit"
            className="px-8 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition-colors shadow-sm"
          >
            등록하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default MarketRegisterContainer;

