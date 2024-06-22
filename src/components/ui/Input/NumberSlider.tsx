// src/components/NumberSlider.tsx
import React, { useState } from "react";
import { Label } from "../Label/Label";

interface NumberSliderProps {
  progreso: number;
  setProgreso(value: number): void;
}
const NumberSlider: React.FC<NumberSliderProps> = ({
  progreso,
  setProgreso,
}) => {
  const [value, setValue] = useState(progreso);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value));
    setProgreso(Number(event.target.value));
  };

  return (
    <div className="w-full p-4 flex flex-col items-center">
      <div className="flex">
        <Label>Avance</Label>
        <div className="ml-2">{value}%</div>
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleChange}
        className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
};

export default NumberSlider;
