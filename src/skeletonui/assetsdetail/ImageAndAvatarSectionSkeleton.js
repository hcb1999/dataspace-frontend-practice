import React from 'react';
import ContentLoader from 'react-content-loader';

const ImageAndAvatarSectionSkeleton = () => (
  <div className="flex w-full items-center mb-12 space-x-6">
    <div className="flex justify-center items-center w-1/3 h-[400px] rounded-lg bg-[#e4e6ea]">
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

    <div className="w-2/3 bg-[#e4e6ea] flex justify-center items-center h-[400px] rounded-lg">
      <ContentLoader
        speed={2}
        width="100%"
        height={400}
        viewBox="0 0 400 400"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="0" rx="10" ry="10" width="100%" height="100%" />
      </ContentLoader>
    </div>
  </div>
);

export default ImageAndAvatarSectionSkeleton;


