import { FC } from "react";

interface TitleProps {
  titulo: string;
}

const Title: FC<TitleProps> = ({ titulo }) => {
  return (
    <div className="mb-10" >
      <div className="text-gray-600 font-bold text-2xl">{titulo}</div>
    </div>
  );
};

export default Title;
