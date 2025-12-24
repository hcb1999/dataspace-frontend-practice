import React, { useEffect, useState } from 'react';
import { t, getLang, onLangChange } from '../../translation';

const Pagination = ({ currentPage, totalPage, onPageChange }) => {
  const [lang, setLangState] = useState(getLang());
  useEffect(() => {
    const off = onLangChange(() => setLangState(getLang()));
    return off;
  }, []);
  const handlePageChange = page => {
    if (page > 0 && page <= totalPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex gap-2 justify-center my-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-gray-200 rounded"
      >
        {t('page.pagination.prev')}
      </button>

      {Array.from({ length: totalPage }, (_, i) => i + 1).map(page => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-3 py-1 ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPage}
        className="px-3 py-1 bg-gray-200 rounded"
      >
        {t('page.pagination.next')}
      </button>
    </div>
  );
};

export default Pagination;


