import React, { useState, useEffect } from 'react';

const LandingPageModal = ({ url, onClose }) => {
  const [iframeError, setIframeError] = useState(false);

  useEffect(() => {
    // iframe 로드 실패를 감지하기 위한 타이머
    const timer = setTimeout(() => {
      setIframeError(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleIframeError = () => {
    setIframeError(true);
  };

  const handleOpenInNewTab = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto py-10" onClick={onClose}>
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-6xl m-4 relative overflow-hidden flex flex-col"
        style={{ height: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b bg-white">
          <h2 className="text-lg font-bold text-gray-800">랜딩 페이지</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-hidden bg-gray-100 relative">
          {!iframeError ? (
            <iframe
              src={url}
              className="w-full h-full border-0"
              title="Landing Page"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
              onError={handleIframeError}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="mb-4">
                <svg className="w-16 h-16 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">페이지를 로드할 수 없습니다</h3>
              <p className="text-gray-600 mb-6 max-w-md">
                해당 웹사이트가 iframe 임베딩을 허용하지 않아 모달에서 표시할 수 없습니다.
                <br />
                새 탭에서 열어서 확인해주세요.
              </p>
              <div className="space-x-4">
                <button
                  onClick={handleOpenInNewTab}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  새 탭에서 열기
                </button>
                <button
                  onClick={onClose}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  닫기
                </button>
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg max-w-md">
                <p className="text-sm text-blue-800">
                  <strong>URL:</strong> <a href={url} target="_blank" rel="noopener noreferrer" className="underline break-all">{url}</a>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPageModal;

