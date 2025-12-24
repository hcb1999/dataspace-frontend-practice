import React, { useEffect, useState } from 'react';
import { t, getLang, onLangChange } from '../../translation';

const OwnerAddressSection = ({ tokenInfo }) => {
  const [lang, setLangState] = useState(getLang());
  useEffect(() => {
    const off = onLangChange(() => setLangState(getLang()));
    return off;
  }, []);
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg space-y-6 mb-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">{t('page.sections.owner.title')}</h3>
      <div className="overflow-y-auto max-h-72">
        {tokenInfo && tokenInfo.length > 0 ? (
          <div className="space-y-4">
            {tokenInfo.map((token, index) => (
              <div
                key={index}
                className={
                  'bg-gray-50 p-4 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-xl'
                }
                style={{
                  marginBottom: index === tokenInfo.length - 1 ? '16px' : '0',
                }}
              >
                <div className="text-gray-600 mb-2">
                  <span className="font-semibold text-gray-800">{t('page.sections.owner.tokenId')}:</span>{' '}
                  {token.tokenId}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-800">{t('page.sections.owner.ownerAddress')}:</span>
                  <a
                    href={token.ownerAccountUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 underline"
                  >
                    {token.ownerAccount}
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">{t('page.sections.owner.empty')}</div>
        )}
      </div>
    </div>
  );
};

export default OwnerAddressSection;


