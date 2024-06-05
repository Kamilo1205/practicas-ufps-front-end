import { FC } from 'react';
import { Link } from 'react-router-dom';
import logoUfps from '/logo-vertical.svg';

interface LogoProps {
  to?: string;
}

export const Logo: FC<LogoProps> = ({ to = "" }) => {
  return (
    <Link className="flex" to={to}>
      <img src={logoUfps} alt="logo UFPS" className="w-8 h-8 rounded-sm"/>
      <div className="flex justify-center flex-col ml-2">
        <div className="text-lg text-gray-900 font-bold leading-4 tracking-tight">
          Prácticas Empresariales
        </div>
        <span className="text-sm font-normal text-gray-400">
          Ingieneria de Sistemas
        </span>
      </div>
    </Link>
  );
}
