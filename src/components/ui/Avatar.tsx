import AvatarImage from '/user-image-no-found.svg';

interface AvatarProps {
  url?: string | null;
}

export const Avatar: React.FC<AvatarProps> = ({ url }) => {
  return (
    <>
      {url ? (
        <img className="rounded-full" src={url} alt="Avatar"/>
      ) : (
        <img src={AvatarImage} className="rounded-ful" alt="Avatar"/>
      )}
    </>
  );
}
