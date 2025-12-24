import React from 'react';
import { Link } from 'react-router-dom';

const OtherDataSection = () => {
  const otherData = [
    {
      id: 1,
      tags: [
        { text: '소방안전', type: 'default' },
        { text: '재난안전', type: 'danger' }, 
        { text: '유료', type: 'outline-danger' } 
      ],
      title: '소방용수 현황 2024',
      desc: '소방용수 현황'
    },
    {
      id: 2,
      tags: [
        { text: '소방안전', type: 'default' },
        { text: '건설에너지', type: 'primary' }, 
        { text: '유료', type: 'outline-danger' }
      ],
      title: '구조출동 현황 2024',
      desc: '구조출동 현황 좌표계 GRS80(TM5186)'
    },
    {
      id: 3,
      tags: [
        { text: '소방안전', type: 'default' },
        { text: '재난안전', type: 'danger' },
        { text: '유료', type: 'outline-danger' }
      ],
      title: '산악사고 구조출동 현황 2024',
      desc: '산악사고 구조출동 현황 좌표계 GRS80(TM5186)'
    }
  ];

  const renderTag = (tag, idx) => {
    let classes = "px-2 py-0.5 text-xs border rounded-sm mr-1";
    if (tag.type === 'default') {
      classes += " border-gray-400 text-gray-600 bg-white";
    } else if (tag.type === 'danger') {
      classes += " border-[#e03249] bg-[#e03249] text-white";
    } else if (tag.type === 'primary') {
      classes += " border-[#4a6eff] bg-[#4a6eff] text-white";
    } else if (tag.type === 'outline-danger') {
      classes += " border-[#e03249] text-[#e03249] bg-white";
    }
    return (
      <span key={idx} className={classes}>
        {tag.text}
      </span>
    );
  };

  return (
    <div className="mt-20 w-full">
      <h2 className="text-xl font-bold mb-6 text-gray-900">제공자의 다른 데이터</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {otherData.map((item) => (
          <div key={item.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-white relative flex flex-col min-h-[200px]">
            <div className="absolute top-6 right-6 text-gray-400 cursor-pointer hover:text-gray-600">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>
            <div className="flex flex-wrap mb-4 pr-8">
              {item.tags.map((tag, idx) => renderTag(tag, idx))}
            </div>
            <h3 className="text-lg font-bold mb-4 text-gray-900">{item.title}</h3>
            <div className="border-t border-gray-100 my-4 mt-auto"></div>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="border-t-2 border-black pt-8">
        <Link to="/market" className="px-8 py-3 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 bg-white text-sm font-medium inline-block">
          목록
        </Link>
      </div>
    </div>
  );
};

export default OtherDataSection;

