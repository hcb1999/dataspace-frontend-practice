import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { t, getLang, onLangChange } from '../../translation';

const goldSealSvg = (
  <img
    src="/icons8-certificate-94.png"
    width={100}
    height={100}
    alt="certificate"
  />
);

const keyMapping = () => ({
  issuer: t('page.certificate.issuer'),
  issuanceDate: t('page.certificate.issuanceDate'),
  expirationDate: t('page.certificate.expirationDate'),
  assetId: t('page.certificate.assetId'),
  registrantNickName: t('page.certificate.registrantNickName'),
  assetName: t('page.assetsdetail.assetName'),
  goodsName: t('page.goods.card.advertiser'),
  metaverseName: t('page.assetsdetail.metaverse'),
  assetType: t('page.certificate.assetType'),
  assetPrice: t('page.assetsdetail.price') + ' ETH',
  registrantEmail: t('page.certificate.registrantEmail'),
  registrantWalletAddress: t('page.certificate.registrantWalletAddress'),
  txId: t('page.sections.transaction.idLabel'),
  contractAddress: t('page.sections.contract.addressLabel'),
  imageURL: t('page.certificate.imageURL'),
  registrationDate: t('page.certificate.registrationDate'),
  // New fields requested
  dataName: t('page.certificate.dataName'),
  provider: t('page.certificate.provider'),
  description: t('page.certificate.description'),
  productType: t('page.certificate.productType'),
  language: t('page.certificate.language'),
  topic: t('page.certificate.topic'),
});

const AssetVerificationSection = ({ assetVc }) => {
  const [lang, setLangState] = useState(getLang());
  useEffect(() => {
    const off = onLangChange(() => setLangState(getLang()));
    return off;
  }, []);

  let parsedData;
  try {
    // If assetVc is not provided, use mock data
    if (!assetVc) {
      parsedData = {
        issuer: 'did:klay:issuer-id-123',
        issuanceDate: '2025-06-10T09:00:00Z',
        expirationDate: '2026-06-10T09:00:00Z',
        credentialSubject: {
          kaaset: {
            assetId: 'ASSET-2025-001',
            assetName: '서울특별시 동작구_건축허가 현황',
            assetType: '데이터서비스',
            metaverseName: '없음',
            assetPrice: '0.05',
            txId: '0x1234...abcd',
            contractAddress: '0xabcd...1234',
            registrantNickName: '서울데이터판매자',
            registrantEmail: 'seoul_data@example.com',
            registrantWalletAddress: '0x9876...5432',
            imageURL: 'https://via.placeholder.com/150',
            // Mock data for new fields
            dataName: '서울특별시 동작구_건축허가 현황',
            provider: '서울특별시',
            description: '이 데이터는 서울특별시 동작구 건축허가 현황입니다.',
            productType: '데이터서비스',
            language: '한국어',
            topic: '건설에너지',
          }
        }
      };
    } else {
      parsedData = typeof assetVc === 'string' ? JSON.parse(assetVc) : assetVc;
    }
  } catch (error) {
    return <div className="text-red-500">{t('page.certificate.parseError')}</div>;
  }
  const kaaset = parsedData?.credentialSubject?.kaaset || {};
  const issuer = parsedData?.issuerDid || parsedData?.issuer || '없음';
  const owner = kaaset.registrantEmail || kaaset.registrantNickName || '-';
  const owneremail = kaaset.registrantEmail || '-';
  const address = kaaset.registrantWalletAddress || '-';
  const issuanceDate = parsedData?.issuanceDate || '-';
  const expirationDate = parsedData?.expirationDate || '-';

  const formatDateLocal = dateString => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    if (isNaN(date)) return dateString;
    if (lang === 'en') {
      return format(date, 'MM/dd/yyyy');
    }
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  const km = keyMapping();
  const infoRows = [
    { label: km.dataName, value: kaaset.dataName || kaaset.assetName },
    { label: km.provider, value: kaaset.provider },
    { label: km.description, value: kaaset.description },
    { label: km.productType, value: kaaset.productType },
    { label: km.language, value: kaaset.language },
    { label: km.topic, value: kaaset.topic },
  ];

  return (
    <div
      className="max-w-3xl min-h-[700px] border-2 border-gray-300 rounded-xl shadow-lg p-10 relative font-serif bg-[#f8f7f2] bg-contain bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/Screenshot at Jul 24 10-58-01 (1).png')",
      }}
    >
      <div className="absolute right-10 top-8">{goldSealSvg}</div>
      <div className="text-center mb-2">
        <div className="text-2xl font-bold tracking-widest">{t('page.mypageDetail.assetCommon.labels.certificate')}</div>
        <div className="text-sm text-gray-500 font-sans">
          {t('page.certificate.subtitle')}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-y-1 text-sm mt-6 mb-4 text-left items-start">
        <div className="flex mt-2 items-center">
          <div className="font-semibold mr-4 min-w-[120px]">{km.issuer}</div>
          <div className="break-all flex-1">{issuer}</div>
        </div>
        <div className="flex mt-2 items-center">
          <div className="font-semibold  mr-4 min-w-[120px]">{km.issuanceDate}</div>
          <div className="break-all flex-1">{formatDateLocal(issuanceDate)}</div>
        </div>
        <div className="flex mt-2 items-center">
          <div className="font-semibold  mr-4 min-w-[120px]">{km.expirationDate}</div>
          <div className="break-all flex-1">{formatDateLocal(expirationDate)}</div>
        </div>
        <div className="flex mt-2 items-center">
          <div className="font-semibold  mr-4 min-w-[120px]">{km.registrantNickName}</div>
          <div className="break-all flex-1">{owner}</div>
        </div>
        <div className="flex mt-2 items-center">
          <div className="font-semibold mr-4 min-w-[120px]">{km.registrantEmail}</div>
          <div className="break-all flex-1">{owneremail}</div>
        </div>
        <div className="flex mt-2 items-center">
          <div className="font-semibold  mr-4 min-w-[120px]">{km.registrantWalletAddress}</div>
          <div className="break-all flex-1">{address}</div>
        </div>
      </div>
      <div className="mt-6 mb-2 text-left">
        <div className="text-base font-bold mb-2 text-gray-700">{t('page.certificate.detailsTitle')}</div>
        <div className="space-y-1  text-sm">
          {infoRows.map(
            (row) =>
              row.value && (
                <div className="flex  items-center" key={row.label}>
                  <div className="font-semibold text-gray-600 mt-2 mr-4 min-w-[120px]">
                    {row.label}
                  </div>
                  <div className={'break-all flex-1 mt-2'}>
                    {row.value}
                  </div>
                </div>
              )
          )}
        </div>
        {kaaset.imageURL && (
          <div className="mt-10 flex flex-col items-center">
            <img
              src={kaaset.imageURL}
              alt={t('page.assetsdetail.assetImageAlt')}
              className="rounded border max-w-xs h-40 object-contain bg-gray-50"
              onError={e => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

AssetVerificationSection.propTypes = {
  assetVc: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default AssetVerificationSection;


