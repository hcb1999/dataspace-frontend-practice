import React, { useEffect, useState } from 'react';
import { t, getLang, onLangChange } from '../../translation';

const RecipientSection = ({ recipientAddress, recipientLink, option }) => {
  const [lang, setLangState] = useState(getLang());
  useEffect(() => {
    const off = onLangChange(() => setLangState(getLang()));
    return off;
  }, []);

  if (!recipientAddress) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4 mb-6">
      <h3 className="text-xl font-bold mb-4">
        {option === '구매자' ? t('page.sections.recipient.buyerTitle') : t('page.sections.recipient.recipientTitle')}
      </h3>
      <table className="w-full border-collapse">
        <tbody>
          <tr>
            <th className="border bg-gray-100 p-2 text-left w-40">{t('page.sections.recipient.walletLabel')}</th>
            <td className="border p-2">
              <a
                href={recipientLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {recipientAddress}
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RecipientSection;


