import React, { useEffect, useState } from 'react';
import { t, getLang, onLangChange } from '../../translation';

const ProviderSection = ({ providerAddress, providerLink, option }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [nickName, setNickName] = useState(null);

  useEffect(() => {
    const storedWalletAddress = localStorage.getItem('walletAddress');
    const storedNickName = localStorage.getItem('nickName');
    setWalletAddress(storedWalletAddress || 'N/A');
    setNickName(storedNickName || 'N/A');
  }, []);
  const [lang, setLangState] = useState(getLang());
  useEffect(() => {
    const off = onLangChange(() => setLangState(getLang()));
    return off;
  }, []);

  if (!providerAddress) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4 mb-6">
      <h3 className="text-xl font-bold mb-4">
        {option === '판매자' ? t('page.sections.provider.sellerTitle') : t('page.sections.provider.providerTitle')}
      </h3>
      <table className="w-full border-collapse">
        <tbody>
          <tr>
            <th className="border bg-gray-100 p-2 text-left w-40">{t('page.sections.provider.walletLabel')}</th>
            <td className="border p-2">
              <a
                href={providerLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {providerAddress || walletAddress}
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProviderSection;


