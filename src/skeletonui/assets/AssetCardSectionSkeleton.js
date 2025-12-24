import React from 'react';
import ContentLoader from 'react-content-loader';

const AssetCardSectionSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(3)].map((_, index) => (
      <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
        <ContentLoader
          speed={2}
          width="100%"
          height={300}
          viewBox="0 0 400 300"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="100%" height="192" />
          <rect x="0" y="200" rx="4" ry="4" width="70%" height="20" />
          <rect x="0" y="230" rx="3" ry="3" width="60%" height="15" />
          <rect x="0" y="250" rx="3" ry="3" width="80%" height="15" />
          <rect x="0" y="270" rx="3" ry="3" width="90%" height="15" />
          <rect x="0" y="290" rx="3" ry="3" width="50%" height="15" />
        </ContentLoader>
      </div>
    ))}
  </div>
);

export default AssetCardSectionSkeleton;


