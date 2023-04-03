import { MagnifyingGlass } from "phosphor-react";
import React from "react";

interface Props {
  // sulfixClick?: () => void;
  type: "text" | "password" | "email" | "number" | "time" | "date" | "datetime-local" | "radio";
  placeholder?: string;
  label?: string;
  sulfix?: Element;
  value: string;
  name?: string;
  onChanged?: (value: string) => void;
  disabled?: boolean;
}

const TextField: React.FC<Props> = ({
  type,
  placeholder,
  label,
  sulfix,
  name,
  value,
  onChanged,
  disabled,
}: any) => {
  return (
    <label className="truncate">
      <span className="w-full truncate">{label}</span>
      <div
        className={`flex items-center text-zinc-500  w-100  justify-between
            ${disabled ? "bg-zinc-50 border border-gray-200 p-2 rounded-lg h-[40px]" : "input"}
            `}
      >
        <input
          className="w-full"
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={
            onChanged ? ($event) => onChanged($event.target.value) : undefined
          }
          disabled={disabled}
        />
        {sulfix}
      </div>
    </label>
  );
};

export default TextField;
