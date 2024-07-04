import React, { useState } from "react";

interface CheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked = false, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = () => {
    setIsChecked(!isChecked);
    if (onChange) {
      onChange(!isChecked);
    }
  };

  return (
    <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        className="form-checkbox text-green-500 mr-3 rounded"
        style={{ width: "20px", height: "20px" }}
        checked={isChecked}
        onChange={handleChange}
        disabled={isChecked}
      />
    </label>
  );
};

export default Checkbox;
