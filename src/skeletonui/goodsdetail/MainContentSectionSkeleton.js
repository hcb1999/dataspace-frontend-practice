import React from 'react';
import ContentLoader from 'react-content-loader';

const MainContentSectionSkeleton = () => (
  <div className="flex gap-8 mb-12 ">
    <div className="bg-[#e4e6ea] ml-12 mr-24 flex justify-center items-center w-1/2 h-[400px] rounded-lg">
      <ContentLoader
        speed={2}
        width={300}
        height={300}
        viewBox="0 0 300 300"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="0" rx="10" ry="10" width="100%" height="100%" />
      </ContentLoader>
    </div>

    <div className="w-1/2 bg-white flex flex-col justify-between p-6 space-y-4">
      <ContentLoader
        speed={2}
        width="100%"
        height={200}
        viewBox="0 0 400 200"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="10" rx="4" ry="4" width="60%" height="20" />
        <rect x="0" y="40" rx="3" ry="3" width="80%" height="20" />
        <rect x="0" y="80" rx="3" ry="3" width="90%" height="20" />
        <rect x="0" y="120" rx="3" ry="3" width="70%" height="20" />
        <rect x="0" y="160" rx="3" ry="3" width="50%" height="20" />
      </ContentLoader>

      <ContentLoader
        speed={2}
        width="100%"
        height={60}
        viewBox="0 0 400 60"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="0" rx="5" ry="5" width="40%" height="40" />
        <rect x="55%" y="0" rx="5" ry="5" width="40%" height="40" />
      </ContentLoader>
    </div>
  </div>
);

export default MainContentSectionSkeleton;


