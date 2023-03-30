import { useState } from "react";

export interface  SelectOption {
  label: string;
  value: string;
}

interface Props {
  options: Array<SelectOption>;
  defaultValue?: string;
  onSelect: (value: string) => void;
  disabled?: boolean;
  title?: string;
}

const Select: React.FC<Props> = ({
  options,
  defaultValue,
  title,
  disabled,
  onSelect,
}: Props) => {
  const [currenValue, changeValue] = useState(defaultValue || "");

  return (
    <label>
      {title}
      <select
        className="input focus:border-none w-full"
        value={currenValue}
        disabled={disabled}
        onChange={(value) => {
          changeValue(value.target.value);
          onSelect(value.target.value);
        }}
      >
        {options.map((opt, i) => (
          <option key={i} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Select;
