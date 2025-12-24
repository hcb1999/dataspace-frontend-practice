import React, { useEffect, useState } from 'react';
import { t, getLang, onLangChange } from '../../translation';

const TransactionSection = ({ transactionId, transactionLink }) => {
  const [lang, setLangState] = useState(getLang());
  useEffect(() => {
    const off = onLangChange(() => setLangState(getLang()));
    return off;
  }, []);
  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4 mb-6">
      <h3 className="text-xl font-bold mb-4">{t('page.sections.transaction.title')}</h3>
      <table className="w-full border-collapse">
        <tbody>
          <tr>
            <th className="border bg-gray-100 p-2 text-left w-40">{t('page.sections.transaction.idLabel')}</th>
            <td className="border p-2">
              {transactionId ? (
                <a
                  href={transactionLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {transactionId}
                </a>
              ) : (
                t('page.sections.transaction.none')
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TransactionSection;


