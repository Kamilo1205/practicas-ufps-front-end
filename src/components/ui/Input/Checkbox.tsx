import React, { useEffect, useState } from "react";

interface CheckboxProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  isEstudiante: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  isEstudiante,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleChange = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    if (onChange) {
      onChange(newChecked);
    }
  };

  return (
    <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        className="form-checkbox text-green-500 mr-3 rounded cursor-pointer"
        style={{ width: "20px", height: "20px" }}
        checked={isChecked}
        onChange={handleChange}
        disabled={isChecked || isEstudiante}
      />
    </label>
  );
};

export default Checkbox;
