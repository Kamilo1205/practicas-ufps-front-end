import { useState } from 'react';
import avatarDefaultImage from '/user-image-no-found.svg';

interface AvatarProps {
  url?: string | null;
  alt?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ url: src, alt = 'Avatar' }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [imgSrc, setImgSrc] = useState<string>(src || avatarDefaultImage);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setImgSrc(avatarDefaultImage);
    setIsLoading(false);
  };

  return (
    <>
      { isLoading && <div className="animate-pulse rounded-full bg-slate-200 w-full h-full"></div> }
      <img
        src={imgSrc}
        alt={alt}
        className='rounded-full'
        onLoad={handleImageLoad}
        onError={handleError}
        style={{ display: isLoading ? 'none' : 'block' }}
      />
    </>
  );
}
