import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosApi from '../../hooks/useAxiosApi';
import AssetInfoSection from './MarketInfoSection';
import MainContentSectionSkeleton from '../../skeletonui/goodsdetail/MainContentSectionSkeleton';
import AssetChainSections from '../common/AssetChainSections';
import ProviderSection from '../common/ProviderSection';
import RecipientSection from '../common/RecipientSection';
import FbxImageAvatarSection from './FbxImageAvatarSection';
import AssetVerificationSection from '../common/AssetVerificationSection';
import axios from 'axios';
import environmentConfig from '../../config/config';
import Swal from 'sweetalert2';

const MarketDetailContainer = () => {
  const { marketNo } = useParams();
  const [actualAssetId, setActualAssetId] = useState(null);
  const [assetData, setAssetData] = useState(null);
  const [verificationData, setVerificationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVerificationLoading, setIsVerificationLoading] = useState(false);
  const [showCertModal, setShowCertModal] = useState(false);
  const [assetVc, setAssetVc] = useState(null);
  const [isLoadingVc, setIsLoadingVc] = useState(false);

  const { execute } = useAxiosApi(`/market/${marketNo}`, 'GET');
  const { execute: fetchAssetVerification } = useAxiosApi(
    `/asset/acd/${actualAssetId}`,
    'GET'
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await execute();
        // 서버 응답 구조: { resultCode, resultMessage, data }
        console.log('Market detail response:', response);
        if (response && response.resultCode === 200 && response.data) {
          setAssetData(response);
          // marketVcId에서 숫자 추출하여 assetNo로 사용
          if (response.data.marketVcId) {
            const match = response.data.marketVcId.match(/-(\d+)$/);
            if (match) {
              setActualAssetId(match[1]);
            }
          }
        } else {
          console.error('Invalid response structure:', response);
        }
      } catch (err) {
        console.error('Error fetching market data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (marketNo) {
      fetchData();
    }
  }, [marketNo]);

  useEffect(() => {
    const fetchData = async () => {
      if (!actualAssetId) return;

      try {
        setIsVerificationLoading(true);
        //const response = await fetchAssetVerification();
        //setVerificationData(response);
      } catch (err) {
        console.error('Error fetching verification data:', err);
      } finally {
        setIsVerificationLoading(false);
      }
    };

    fetchData();
  }, [actualAssetId]);

  const handleShowCertificate = async () => {
    try {
      setIsLoadingVc(true);
      if (!marketNo) {
        Swal.fire('오류', '마켓 정보를 찾을 수 없습니다.', 'error');
        setIsLoadingVc(false);
        return;
      }

      // VC API 호출
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
              registrantNickName: vcDataFromApi.registrantEmail || vcDataFromApi.registrantNickName || '-',
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

  if (isLoading || isVerificationLoading) {
    return <MainContentSectionSkeleton />;
  }

  return (
    <>
      <div className="max-w-[1280px] mx-auto mb-24 px-4 py-24">
        <AssetInfoSection 
          assetData={assetData?.data} 
          marketNo={marketNo}
          onShowCertificate={handleShowCertificate}
          isLoadingVc={isLoadingVc}
        />
        <AssetChainSections
          tokenInfo={assetData?.data?.tokenInfo}
          transactionId={assetData?.data?.nftTxId}
          transactionLink={assetData?.data?.nftTxIdUrl}
          contractAddress={assetData?.data?.nftContractAddress}
          contractLink={assetData?.data?.nftContractAddressUrl}
        />
        <ProviderSection
          providerAddress={assetData?.data?.saleAccount}
          providerLink={assetData?.data?.saleAccountUrl}
          option={'판매자'}
        />
      </div>
      
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
            className="relative w-full max-w-[768px] md:max-w-3xl max-h-[90vh] overflow-y-auto custom-scrollbar pr-2 bg-transparent"
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
    </>
  );
};

export default MarketDetailContainer;
