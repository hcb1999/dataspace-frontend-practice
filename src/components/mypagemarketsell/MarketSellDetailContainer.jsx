import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LeftMenu from '../common/LeftMenu';
import Swal from 'sweetalert2';
import AssetChainSections from '../common/AssetChainSections';
import AssetVerificationSection from '../common/AssetVerificationSection';
import useAxiosApi from '../../hooks/useAxiosApi';
import axios from 'axios';
import environmentConfig from '../../config/config';

const MarketSellDetailContainer = () => {
  const { marketNo } = useParams();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCertModal, setShowCertModal] = useState(false);
  const [assetVc, setAssetVc] = useState(null);
  const [isLoadingVc, setIsLoadingVc] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    productType: '데이터서비스',
    language: '한국어',
    keywords: '',
    landingUrl: '',
    topic: '',
    publisher: '',
    price: '',
    stock: '',
    saleStartDate: '',
    saleEndDate: '',
    state: '2',
    stateDesc: '판매중',
    marketVcType: '',
  });

  const { execute: fetchMarketDetail } = useAxiosApi(`/market/${marketNo}`, 'GET');
  const { execute: fetchVc } = useAxiosApi(`/market/vc/${marketNo}`, 'GET');
  const { execute: deleteMarket } = useAxiosApi(`/market/${marketNo}`, 'DELETE');
  const { execute: updateMarket } = useAxiosApi(`/market/${marketNo}`, 'PUT');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetchMarketDetail();
        
        // 서버 응답 구조: { resultCode, resultMessage, data }
        if (response && response.resultCode === 200 && response.data) {
          console.log('Market detail response:', response);
          const data = response.data;
          setDetailData(data);
          
          // 날짜 포맷팅 (YYYY-MM-DD HH:mm:ss -> YYYY-MM-DD)
          const formatDateForInput = (dateString) => {
            if (!dateString) return '';
            return dateString.split(' ')[0];
          };

          // 상세보기 모드일 때는 데이터만 표시
          setFormData({
            title: data.marketDataName || data.marketDatatName || '',
            description: data.marketDataDesc || '',
            productType: data.marketProductType || '데이터서비스',
            language: data.marketLanguage || '한국어',
            keywords: data.marketKeyword || '',
            landingUrl: data.marketDoiUrl || '',
            topic: data.marketSubject || '',
            publisher: data.marketIssuer || '',
            price: data.price || 0,
            stock: data.inventoryCnt || 0,
            saleStartDate: formatDateForInput(data.startDttm) || '',
            saleEndDate: formatDateForInput(data.endDttm) || '',
            state: data.state || '2',
            stateDesc: data.state === 'S1' ? '판매전' : data.state === 'S2' ? '판매중' : (data.stateDesc || '판매중'),
            marketVcType: data.marketVcType || '',
          });
        } else {
          console.error('Invalid response structure:', response);
          Swal.fire('오류', '데이터를 불러올 수 없습니다.', 'error');
        }
      } catch (err) {
        console.error('Error fetching market detail:', err);
        Swal.fire('오류', '데이터를 불러오는 중 오류가 발생했습니다.', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    if (marketNo) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketNo]);

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
      { field: 'landingUrl', name: '랜딩 페이지 URL' },
      { field: 'price', name: '가격' },
      { field: 'stock', name: '보유 현황' },
      { field: 'saleStartDate', name: '판매 시작일' },
      { field: 'saleEndDate', name: '판매 종료일' }
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
      Swal.fire({
        title: '수정 중...',
        text: '판매 데이터를 수정하고 있습니다...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      // API Payload Mapping
      const payload = {
        marketDataName: formData.title,
        marketDataDesc: formData.description,
        marketProductType: formData.productType,
        marketLanguage: formData.language,
        marketKeyword: formData.keywords,
        marketDoi: detailData?.marketDoi || '',
        marketSubject: formData.topic,
        marketIssuer: formData.publisher,
        marketDoiUrl: formData.landingUrl,
        price: Number(formData.price),
        issueCnt: Number(formData.stock),
        startDttm: formData.saleStartDate ? new Date(formData.saleStartDate).toISOString() : new Date().toISOString(),
        endDttm: formData.saleEndDate ? new Date(formData.saleEndDate).toISOString() : new Date().toISOString(),
       
      };

      console.log('Update Payload:', payload);

      const response = await updateMarket(payload);
      
      if (response && response.resultCode === 200) {
        Swal.fire({
          title: '수정 완료',
          text: '판매 데이터가 성공적으로 수정되었습니다.',
          icon: 'success',
          confirmButtonText: '확인'
        }).then(() => {
          setIsEditMode(false);
          // 데이터 다시 불러오기
          window.location.reload();
        });
      } else {
        throw new Error(response?.resultMessage || '수정 처리 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('Update error:', error);
      const errorMessage = error?.response?.data?.resultMessage || error?.message || '수정 처리 중 오류가 발생했습니다.';
      Swal.fire({
        icon: 'error',
        title: '수정 실패',
        text: errorMessage
      });
    }
  };

  const handleEdit = () => {
    // state가 "S4"이면 수정 불가 (판매종료 및 삭제 상태)
    if (detailData?.state === 'S4' || detailData?.state === '4') {
      Swal.fire({
        icon: 'warning',
        title: '수정 불가',
        text: '판매종료 상태에서는 수정할 수 없습니다.',
        confirmButtonText: '확인'
      });
      return;
    }
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    // 원래 데이터로 복원
    if (detailData) {
      const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        return dateString.split(' ')[0];
      };

      setFormData({
        title: detailData.marketDataName || detailData.marketDatatName || '',
        description: detailData.marketDataDesc || '',
        productType: detailData.marketProductType || '데이터서비스',
        language: detailData.marketLanguage || '한국어',
        keywords: detailData.marketKeyword || '',
        landingUrl: detailData.marketDoiUrl || '',
        topic: detailData.marketSubject || '',
        publisher: detailData.marketIssuer || '',
        price: detailData.price || 0,
        stock: detailData.inventoryCnt || 0,
        saleStartDate: formatDateForInput(detailData.startDttm) || '',
        saleEndDate: formatDateForInput(detailData.endDttm) || '',
        state: detailData.state || '2',
        stateDesc: detailData.state === 'S1' ? '판매전' : detailData.state === 'S2' ? '판매중' : (detailData.stateDesc || (detailData.state === '1' ? '판매전' : '판매중')),
        marketVcType: detailData.marketVcType || '',
      });
    }
  };

  const handleChangeState = async (newState) => {
    try {
      const result = await Swal.fire({
        title: '상태 변경 확인',
        text: newState === '2' ? '판매중으로 상태를 변경하시겠습니까?' : '판매전으로 상태를 변경하시겠습니까?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '확인',
        cancelButtonText: '취소'
      });

      if (result.isConfirmed) {
        Swal.fire({
          title: '처리 중...',
          text: '상태를 변경하는 중입니다.',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        const token = localStorage.getItem('accessToken');
        const response = await axios.patch(
          `${environmentConfig.apiUrl}/market/${marketNo}/state/${newState}`,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              'accept': 'application/json',
              ...(token && { Authorization: `Bearer ${token}` }),
            },
          }
        );

        if (response && response.data && response.data.resultCode === 200) {
          Swal.fire({
            icon: 'success',
            title: '상태 변경 완료',
            text: '상태가 성공적으로 변경되었습니다.',
            confirmButtonText: '확인'
          }).then(() => {
            // 데이터 다시 불러오기
            const fetchData = async () => {
              try {
                setIsLoading(true);
                const response = await fetchMarketDetail();
                if (response && response.resultCode === 200 && response.data) {
                  const data = response.data;
                  setDetailData(data);
                  const formatDateForInput = (dateString) => {
                    if (!dateString) return '';
                    return dateString.split(' ')[0];
                  };
                  setFormData({
                    title: data.marketDataName || data.marketDatatName || '',
                    description: data.marketDataDesc || '',
                    productType: data.marketProductType || '데이터서비스',
                    language: data.marketLanguage || '한국어',
                    keywords: data.marketKeyword || '',
                    landingUrl: data.marketDoiUrl || '',
                    topic: data.marketSubject || '',
                    publisher: data.marketIssuer || '',
                    price: data.price || 0,
                    stock: data.inventoryCnt || 0,
                    saleStartDate: formatDateForInput(data.startDttm) || '',
                    saleEndDate: formatDateForInput(data.endDttm) || '',
                    state: data.state || '2',
                    stateDesc: data.state === 'S1' ? '판매전' : data.state === 'S2' ? '판매중' : (data.stateDesc || (data.state === '1' ? '판매전' : '판매중')),
                    marketVcType: data.marketVcType || '',
                  });
                }
              } catch (error) {
                console.error('Error fetching market detail:', error);
              } finally {
                setIsLoading(false);
              }
            };
            fetchData();
          });
        } else {
          throw new Error(response?.data?.resultMessage || '상태 변경 중 오류가 발생했습니다.');
        }
      }
    } catch (error) {
      console.error('Change state error:', error);
      const errorMessage = error?.response?.data?.resultMessage || error?.message || '상태 변경 중 오류가 발생했습니다.';
      Swal.fire({
        icon: 'error',
        title: '상태 변경 실패',
        text: errorMessage
      });
    }
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: '삭제 확인',
      text: '정말로 이 판매 데이터를 삭제하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '삭제',
      cancelButtonText: '취소'
    });

    if (result.isConfirmed) {
      try {
        Swal.fire({
          title: '삭제 중...',
          text: '판매 데이터를 삭제하고 있습니다...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        const response = await deleteMarket();
        
        if (response && response.resultCode === 200) {
          Swal.fire({
            title: '삭제 완료',
            text: '판매 데이터가 성공적으로 삭제되었습니다.',
            icon: 'success',
            confirmButtonText: '확인'
          }).then(() => {
            navigate('/mypage/market/sell');
          });
        } else {
          throw new Error(response?.resultMessage || '삭제 처리 중 오류가 발생했습니다.');
        }
      } catch (error) {
        console.error('Delete error:', error);
        const errorMessage = error?.response?.data?.resultMessage || error?.message || '삭제 처리 중 오류가 발생했습니다.';
        Swal.fire({
          icon: 'error',
          title: '삭제 실패',
          text: errorMessage
        });
      }
    }
  };

  const handleShowCertificate = async () => {
    try {
      setIsLoadingVc(true);
      const response = await fetchVc();
      
      // 서버 응답 구조: { resultCode, resultMessage, data: { vc: {...} } }
      if (response && response.resultCode === 200 && response.data && response.data.vc) {
        const vcData = response.data.vc;
        
        // AssetVerificationSection이 기대하는 형식으로 변환
        const convertedVc = {
          issuerDid: vcData.issuerDid || vcData.issuer || null,
          issuer: vcData.issuer || '-',
          issuanceDate: vcData.registrationDate || new Date().toISOString(),
          expirationDate: vcData.registrationDate ? new Date(new Date(vcData.registrationDate).getTime() + 365 * 24 * 60 * 60 * 1000).toISOString() : new Date().toISOString(),
          credentialSubject: {
            kaaset: {
              assetId: vcData.dataId || '-',
              assetName: vcData.dataName || '-',
              dataName: vcData.dataName || '-',
              provider: vcData.issuer || '-',
              description: vcData.dataDesc || '-',
              productType: vcData.productType || '-',
              language: vcData.language || '-',
              topic: vcData.subject || '-',
              registrantEmail: vcData.registrantEmail || '-',
              registrantWalletAddress: vcData.registrantWalletAddress || '-',
              assetPrice: vcData.dataPrice || '0',
              txId: vcData.txId || '-',
              contractAddress: vcData.contractAddress || '-',
              imageURL: vcData.imageURL || '',
            }
          }
        };
        
        setAssetVc(convertedVc);
        setShowCertModal(true);
      } else {
        console.error('Invalid VC response structure:', response);
        Swal.fire('오류', '등록증 데이터를 불러올 수 없습니다.', 'error');
      }
    } catch (err) {
      console.error('Error fetching VC data:', err);
      Swal.fire('오류', '등록증 데이터를 불러오는 중 오류가 발생했습니다.', 'error');
    } finally {
      setIsLoadingVc(false);
    }
  };

  const getStatusBadgeColor = (state, stateDesc) => {
    // state 값 우선 확인
    if (state === 'S2' || state === '2' || stateDesc?.includes('판매중')) {
      return 'bg-green-100 text-green-800 border-green-300';
    } else if (state === 'S1' || state === '1' || stateDesc?.includes('판매전')) {
      return 'bg-gray-100 text-gray-800 border-gray-300';
    } else if (stateDesc?.includes('판매완료')) {
      return 'bg-blue-100 text-blue-800 border-blue-300';
    } else if (stateDesc?.includes('판매종료')) {
      return 'bg-red-100 text-red-800 border-red-300';
    }
    return 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const getStatusLabel = (state, stateDesc) => {
    // state 값 우선 확인
    if (state === 'S2' || state === '2') {
      return '판매중';
    } else if (state === 'S1' || state === '1') {
      return '판매전';
    }
    return stateDesc || '판매중';
  };

  const getStatusOptions = () => {
    return [
      { value: '1', label: '판매전' },
      { value: '2', label: '판매중' },
      { value: '3', label: '판매중지' },
      { value: '4', label: '판매종료' },
      { value: '5', label: '판매완료' },
      { value: 'S1', label: '판매전' },
      { value: 'S2', label: '판매중' },
      { value: 'S3', label: '판매중지' },
      { value: 'S4', label: '판매종료' },
      { value: 'S5', label: '판매완료' },
    ];
  };

  return (
    <main>
      <section className="flex justify-center mt-16 mb-12">
        <LeftMenu pageName="mypage" />
        <section className="flex-1 ml-4 max-w-screen-lg">
          <div className="bg-white border-l-4 border-l-orange-500 border border-gray-200 rounded-lg p-8">
            {/* 상단: 판매 데이터 라벨 및 뒤로가기 */}
            <div className="flex justify-between items-start mb-6">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-700 border border-orange-300 flex items-center gap-1 w-fit">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                판매 데이터
              </span>
              <button
                onClick={() => navigate('/mypage/market/sell')}
                className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50"
              >
                목록으로
              </button>
            </div>

            {isEditMode ? (
              // 수정 모드
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">판매 데이터 수정</h1>
                  <p className="text-gray-600">판매 데이터 정보를 수정합니다.</p>
                </div>

                {/* 기본 정보 */}
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
                      />
                    </div>
                  </div>
                </div>

                {/* 상세 정보 */}
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
                        <option value="데이터셋">데이터셋</option>
                        <option value="API">API</option>
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">주제 <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        name="topic"
                        value={formData.topic}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                      />
                    </div>
                  </div>
                </div>

                {/* 판매 정보 */}
                <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                  <h2 className="text-xl font-bold mb-6 flex items-center text-gray-800">
                    <span className="w-1.5 h-6 bg-blue-600 mr-3 rounded-r"></span>
                    판매 정보
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">가격 (ETH, 1 이하) <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">보유 현황 <span className="text-red-500">*</span></label>
                      <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        required
                        disabled
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-500 cursor-not-allowed text-right"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">판매 상태</label>
                      <div className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-700">
                        {getStatusLabel(formData.state, formData.stateDesc)}
                      </div>
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

                {/* 버튼 */}
                <div className="flex justify-end gap-4 mt-10">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-8 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition-colors shadow-sm"
                  >
                    수정 완료
                  </button>
                </div>
              </form>
            ) : isLoading ? (
              // 로딩 상태
              <div className="text-center py-20">
                <div className="text-gray-500">데이터를 불러오는 중...</div>
              </div>
            ) : !detailData ? (
              // 데이터 없음
              <div className="text-center py-20">
                <div className="text-gray-500">데이터를 찾을 수 없습니다.</div>
              </div>
            ) : (
              // 상세보기 모드
              <>
                {/* 제목 */}
                <h1 className="text-3xl font-bold text-gray-900 mb-6">
                  {detailData.marketDataName || detailData.marketDatatName || '제목 없음'}
                </h1>

                {/* 태그 */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-2 py-1 text-xs border border-gray-300 rounded bg-white text-gray-700">
                    공공데이터포털
                  </span>
                  {detailData.marketSubject && (
                    <span className="px-2 py-1 text-xs rounded bg-blue-600 text-white">
                      {detailData.marketSubject}
                    </span>
                  )}
                  <span className="px-2 py-1 text-xs border border-gray-300 rounded bg-white text-gray-700">
                    {detailData.price && detailData.price > 0 ? '유료' : '무료'}
                  </span>
                  <span className={`px-3 py-1 text-xs font-medium rounded border ${getStatusBadgeColor(detailData.state, detailData.stateDesc)}`}>
                    {getStatusLabel(detailData.state, detailData.stateDesc)}
                  </span>
                </div>

                {/* 가격 및 보유 수량 */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">판매 가격</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {detailData.price && detailData.price > 0 
                          ? `${Number(detailData.price).toLocaleString('ko-KR', { maximumFractionDigits: 6 })} ETH` 
                          : '무료'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">보유 현황</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {(detailData.inventoryCnt || 0).toLocaleString()}개
                      </p>
                    </div>
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

                    {detailData.marketDoi && (
                      <div className="flex border-b border-gray-200 min-h-[60px]">
                        <div className="w-40 bg-[#f3f6f9] flex items-center px-4 font-bold text-sm text-gray-800 border-r border-gray-200">
                          DOI 번호
                        </div>
                        <div className="flex-1 flex items-center px-4 py-3 text-sm text-gray-700">
                          {detailData.marketDoi}
                        </div>
                      </div>
                    )}

                    {detailData.marketDoiUrl && (
                      <div className="flex border-b border-gray-200 min-h-[60px]">
                        <div className="w-40 bg-[#f3f6f9] flex items-center px-4 font-bold text-sm text-gray-800 border-r border-gray-200">
                          DOI URL
                        </div>
                        <div className="flex-1 flex items-center px-4 py-3 text-sm text-gray-700">
                          <a 
                            href={detailData.marketDoiUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 underline"
                          >
                            {detailData.marketDoiUrl}
                          </a>
                        </div>
                      </div>
                    )}

                    {detailData.regDttm && (
                      <div className="flex border-b border-gray-200 min-h-[60px]">
                        <div className="w-40 bg-[#f3f6f9] flex items-center px-4 font-bold text-sm text-gray-800 border-r border-gray-200">
                          등록일
                        </div>
                        <div className="flex-1 flex items-center px-4 py-3 text-sm text-gray-700">
                          {detailData.regDttm}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 버튼 */}
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => navigate('/mypage/market/sell')}
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
                  <button
                    onClick={handleEdit}
                    disabled={detailData?.state === 'S4' || detailData?.state === '4'}
                    className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    title={detailData?.state === 'S4' || detailData?.state === '4' ? '판매종료 상태에서는 수정할 수 없습니다.' : ''}
                  >
                    수정하기
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    삭제
                  </button>
                </div>
              </>
            )}
          </div>
          {detailData && (
            <AssetChainSections
              tokenInfo={detailData.tokenInfo}
              transactionId={detailData.nftTxId}
              transactionLink={detailData.nftTxIdUrl}
              contractAddress={detailData.nftContractAddress}
              contractLink={detailData.nftContractAddressUrl}
            />
          )}
        </section>
         {/* 공용 체인 섹션 */}
       
      </section>

      {/* 데이터 등록증 모달 */}
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

export default MarketSellDetailContainer;