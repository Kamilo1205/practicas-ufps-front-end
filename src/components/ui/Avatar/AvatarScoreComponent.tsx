


interface AvatarScoreProps {
  score: number
  size?: 'small' | 'medium' | 'large'

}

const AvatarScore: React.FC<AvatarScoreProps> = ({ score, size = 'small' }: AvatarScoreProps) => {
  const sizeClass = size === 'small' ? 'w-12 h-12' : size === 'medium' ? 'w-24 h-24' : 'w-32 h-32'
  const sizeN = size === 'small' ? 35 : size === 'medium' ? 50 : 45
  const radius = (sizeN / 2) - 2; // Ajustar el radio basado en el tamaño
  const strokeDasharray = 2 * Math.PI * radius;  // Circunferencia del círculo (2 * PI * radio) donde radio es 45
  const strokeDashoffset = ((100 - score) / 100) * strokeDasharray;

  const getColor = (score: number) => {
    const red = Math.min(255, 2 * (100 - score));
    const green = Math.min(255, 2 * score);
    return `rgb(${red},${green},0)`;
  };

  const strokeColor = getColor(score);

  return (
    <div className={`relative flex items-center justify-center ${sizeClass}`}>
      <div className={`${sizeClass} rounded-full overflow-hidden flex items-center justify-center`}>
        {/* Contenedor de la imagen o del puntaje */}
        <span style={{ color: strokeColor }} className="text-sm font-bold">{score}</span>
      </div>
      {/* Círculo del borde */}
      <svg className={`absolute top-0 left-0 ${sizeClass} transform -rotate-90`}>
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          className="text-gray-300"
        />
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke={strokeColor}
          strokeWidth="4"
          fill="transparent"
          className="transition-all duration-300"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default AvatarScore;
