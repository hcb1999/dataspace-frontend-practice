import React from 'react';
import ContentLoader from 'react-content-loader';

const AssetInfoSectionSkeleton = () => (
  <>
    <div className="flex justify-between w-full items-center border-b-2 py-4 border-gray-200 mb-4">
      <div className="flex items-center space-x-4">
        <ContentLoader
          speed={2}
          width={50}
          height={50}
          viewBox="0 0 50 50"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <circle cx="25" cy="25" r="25" />
        </ContentLoader>
        <ContentLoader
          speed={2}
          width={200}
          height={50}
          viewBox="0 0 200 50"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="10" rx="4" ry="4" width="150" height="15" />
          <rect x="0" y="30" rx="3" ry="3" width="100" height="10" />
        </ContentLoader>
      </div>
      <ContentLoader
        speed={2}
        width={150}
        height={20}
        viewBox="0 0 150 20"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="0" rx="3" ry="3" width="100%" height="15" />
      </ContentLoader>
    </div>

    <div className="flex flex-col space-y-4 mb-8">
      <ContentLoader
        speed={2}
        width="100%"
        height={80}
        viewBox="0 0 400 80"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="0" rx="4" ry="4" width="60%" height="20" />
        <rect x="0" y="30" rx="3" ry="3" width="40%" height="15" />
        <rect x="0" y="60" rx="3" ry="3" width="80%" height="15" />
      </ContentLoader>
    </div>

    <div className="bg-white p-6 rounded-md border border-gray-300 mb-4 mt-4">
      <ContentLoader
        speed={2}
        width="100%"
        height={120}
        viewBox="0 0 400 120"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="0" rx="4" ry="4" width="80%" height="20" />
        <rect x="0" y="30" rx="3" ry="3" width="100%" height="15" />
        <rect x="0" y="55" rx="3" ry="3" width="90%" height="15" />
        <rect x="0" y="80" rx="3" ry="3" width="95%" height="15" />
        <rect x="0" y="105" rx="3" ry="3" width="85%" height="15" />
      </ContentLoader>
    </div>

    <div className="flex justify-end mt-8">
      <ContentLoader
        speed={2}
        width={240}
        height={56}
        viewBox="0 0 240 56"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="0" rx="8" ry="8" width="240" height="56" />
      </ContentLoader>
    </div>
  </>
);

export default AssetInfoSectionSkeleton;


