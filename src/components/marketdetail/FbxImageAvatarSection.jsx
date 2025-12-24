import React, { useEffect, useState, useRef } from 'react';
import { t, getLang, onLangChange } from '../../translation';
import ImageAndAvatarSectionSkeleton from '../../skeletonui/assetsdetail/ImageAndAvatarSectionSkeleton';
import AssetVerificationSection from '../common/AssetVerificationSection';

const FbxImageAvatarSection = ({ assetData, assetVc }) => {
  const [showAssetInfo, setShowAssetInfo] = useState(false);
  const [showFullModal, setShowFullModal] = useState(false);
  const popoverRef = useRef(null);
  const [lang, setLangState] = useState(getLang());
  useEffect(() => {
    const off = onLangChange(() => setLangState(getLang()));
    return off;
  }, []);

  useEffect(() => {
    if (!assetData || !assetData.assetDesc) return;
  }, [assetData]);

  const handleShowAssetCertificate = () => {
    setShowAssetInfo(!showAssetInfo);
  };

  const handleShowFullAssetCertificate = () => {
    setShowFullModal(true);
  };

  useEffect(() => {
    if (!showAssetInfo) return;
    const handleClickOutside = e => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setShowAssetInfo(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showAssetInfo]);

  if (!assetData) {
    return (
      <div className="flex w-full items-center mb-12 space-x-6">
        <ImageAndAvatarSectionSkeleton />
      </div>
    );
  }

  const mv = String(assetData.metaverseName || '').toLowerCase().trim();
  const isRoblox = mv === '로블록스' || mv === 'roblox';
  const isZepeto = mv === '제페토' || mv === 'zepeto';
  const isIncheon =
    mv === '인천월드' || mv === 'incheon world' || mv === 'incheonworld' || mv === 'incheon-world';
  const labelColor = isRoblox
    ? 'bg-green-200 text-green-800'
    : isZepeto
      ? 'bg-yellow-200 text-yellow-800'
      : isIncheon
        ? 'bg-purple-200 text-purple-800'
        : 'bg-blue-200 text-blue-800';

  return (
    <div className="flex w-full items-center mb-12 space-x-6">
      <div className="relative flex justify-center items-center w-1/3 h-[400px] rounded-lg bg-[#e4e6ea]">
        <img
          src={assetData.fileUrlFirst || null}
          alt={t('page.assetsdetail.assetImageAlt')}
          className="w-[300px] h-[300px] rounded-lg"
        />
        <span
          className={`absolute top-16 right-16 px-2 py-1 text-xs font-semibold rounded-full ${labelColor}`}
        >
          {isRoblox ? 'roblox' : isZepeto ? 'zepeto' : isIncheon ? 'inc-world' : 'rpm'}
        </span>
        <span
          className={`absolute top-16 left-16  px-2 py-1 text-xs font-bold rounded-full  text-white shadow-md cursor-pointer hover:bg-yellow-500 hover:shadow-lg transition-all duration-200`}
          onClick={handleShowAssetCertificate}
        >
          <img
            src="/icons8-certification-48.png"
            alt={t('page.mypageDetail.assetCommon.labels.certificate')}
            className="w-8 h-8 inline-block"
          />
        </span>
        {showAssetInfo && (
          <div ref={popoverRef} className="absolute top-24 right-30 bg-white p-4 rounded-lg shadow-md w-48">
            <h4 className="text-lg font-bold mb-2 border-b pb-2">{t('page.mypageDetail.assetCommon.labels.certificate')}</h4>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="border-b pb-2">{t('page.assetsdetail.assetName')}: {assetData.assetName}</li>
              <li className="border-b pb-2">{t('page.assetsdetail.creator')}: {assetData.assetRegName}</li>
              <li className="border-b pb-2">{t('page.assetsdetail.price')}: {assetData.price} ETH</li>
              <li className="border-b pb-2">{t('page.assetsdetail.metaverse')}: {assetData.metaverseName}</li>
            </ul>
            <button
              onClick={handleShowFullAssetCertificate}
              className="mt-2 text-blue-500 underline text-sm"
            >
              {t('page.assetsdetail.more')}
            </button>
          </div>
        )}

        {showFullModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={() => setShowFullModal(false)}>
            <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto custom-scrollbar pr-2 bg-transparent" onClick={e => e.stopPropagation()}>
              <button
                onClick={() => setShowFullModal(false)}
                className="absolute top-2 right-2 text-3xl text-gray-700 bg-white bg-opacity-80 rounded-full px-3 py-1 hover:bg-gray-300 hover:bg-opacity-100 focus:outline-none z-10 shadow"
                aria-label={t('page.assetsdetail.close')}
              >
                &times;
              </button>
              <AssetVerificationSection assetVc={assetVc} />
            </div>
          </div>
        )}
      </div>

      <div className="w-2/3 bg-[#e4e6ea] flex justify-center items-center h-[400px] rounded-lg">
        <div className="text-gray-600">3D Viewer Placeholder</div>
      </div>
    </div>
  );
};

export default FbxImageAvatarSection;


