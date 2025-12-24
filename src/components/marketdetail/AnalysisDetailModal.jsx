import React from 'react';

const AnalysisDetailModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto py-10" onClick={onClose}>
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-5xl m-4 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold text-gray-800">상세보기</h2>
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
        <div className="p-8 overflow-y-auto max-h-[80vh]">
          {/* Title Box */}
          <div className="bg-gray-200 p-4 mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800">서울특별시 스마트불편신고 빅데이터 분석</h1>
          </div>

          {/* 1. Overview */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-blue-900 pl-3">1. 개요</h3>
            <p className="text-gray-700 text-base pl-4">
              서울 스마트불편신고의 신고유형별 공간적 시간적 변화의 추이를 분석하여 불편신고의 공간패턴 특성을 도출
            </p>
          </div>

          {/* 2. Used Data */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-blue-900 pl-3">2. 사용 데이터</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border-t border-b border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4 text-center text-sm font-bold text-gray-700 border-b border-gray-300 w-1/2">데이터명</th>
                    <th className="py-2 px-4 text-center text-sm font-bold text-gray-700 border-b border-gray-300 w-1/2">데이터 설명</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-4 text-center text-sm text-gray-700">서울시도로</td>
                    <td className="py-2 px-4 text-center text-sm text-gray-700">서울시도로</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-4 text-center text-sm text-gray-700">용도지역 주거</td>
                    <td className="py-2 px-4 text-center text-sm text-gray-700">용도지역 주거</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-4 text-center text-sm text-gray-700">용도지역 상업</td>
                    <td className="py-2 px-4 text-center text-sm text-gray-700">용도지역 상업</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 text-center text-sm text-gray-700">스마트 불편신고</td>
                    <td className="py-2 px-4 text-center text-sm text-gray-700">2012년~2017년 스마트 불편신고</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 3. Analysis Procedure */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-blue-900 pl-3">3. 분석절차</h3>
            <div className="flex flex-col md:flex-row gap-4 items-stretch justify-center">
              
              {/* Card 1: Orange */}
              <div className="flex-1 border-2 border-orange-400 rounded-xl overflow-hidden shadow-sm flex flex-col">
                <div className="bg-orange-500 text-white text-center py-3 text-lg font-bold">
                  데이터 수집
                </div>
                <div className="p-6 flex-1 flex items-center justify-center bg-white">
                  <div className="bg-gray-200 rounded w-full py-2 px-4 text-center">
                    <div className="font-bold mb-2 text-gray-800 border-b border-gray-300 pb-1">기초데이터</div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>서울시도로</p>
                      <div className="border-t border-dashed border-gray-300 my-1"></div>
                      <p>용도지역 주거</p>
                      <div className="border-t border-dashed border-gray-300 my-1"></div>
                      <p>용도지역 상업</p>
                      <div className="border-t border-dashed border-gray-300 my-1"></div>
                      <p>스마트 불편신고</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center justify-center text-orange-400">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>

              {/* Card 2: Blue */}
              <div className="flex-1 border-2 border-blue-500 rounded-xl overflow-hidden shadow-sm flex flex-col">
                <div className="bg-blue-500 text-white text-center py-3 text-lg font-bold">
                  공간 데이터 분석
                </div>
                <div className="p-6 flex-1 flex flex-col gap-4 justify-center bg-white items-center">
                  <div className="bg-gray-200 rounded w-full py-2 px-4 text-center">
                    <div className="font-bold mb-1 text-sm text-gray-800">100m 격자별 신고 추이</div>
                    <div className="text-xs text-gray-600">신고유형별, 년월별,<br/>요일별, 시간대별</div>
                  </div>
                  <div className="bg-gray-200 rounded w-full py-2 px-4 text-center">
                    <div className="font-bold mb-1 text-sm text-gray-800">신고 분포 분석</div>
                    <div className="text-xs text-gray-600">도로 주변 신고 분석<br/>용도지역 신고 분석</div>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center justify-center text-blue-500">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>

              {/* Card 3: Green */}
              <div className="flex-1 border-2 border-emerald-400 rounded-xl overflow-hidden shadow-sm flex flex-col">
                <div className="bg-emerald-400 text-white text-center py-3 text-lg font-bold">
                  결과 도출
                </div>
                <div className="p-6 flex-1 flex flex-col gap-4 justify-center bg-white items-center">
                  <div className="w-16 h-24 border-4 border-gray-700 rounded-lg flex flex-col items-center justify-center p-1 relative">
                     <div className="w-2 h-2 bg-gray-700 rounded-full mb-1"></div>
                     <svg className="w-8 h-8 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                     </svg>
                     <div className="w-full h-1 bg-gray-300 mt-2 rounded-full"></div>
                  </div>
                  <div className="bg-gray-200 rounded w-full py-2 px-4 text-center mt-auto">
                    <div className="text-xs font-bold text-gray-800">스마트 불편신고<br/>시계열적 공간패턴 분석</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* 4. View Analysis Results */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-blue-900 pl-3">4. 분석결과 보기</h3>
             <div className="pl-4">
                <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors font-medium">
                   결과 확인하기
                </button>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AnalysisDetailModal;

