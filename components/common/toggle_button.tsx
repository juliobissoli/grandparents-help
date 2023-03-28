import { useState } from "react";

interface ToggleButtonOption {
  label: string;
  value: string;
}

interface Props {
  // sulfixClick?: () => void;

  options: Array<ToggleButtonOption>;
  defaultValue?: string;
  onToggle: (value: string) => void;
  disabled?: boolean;
  title?: string;
}

const ToggleButton: React.FC<Props> = ({
  options,
  defaultValue,
  title,
  disabled,
  onToggle,
}: Props) => {
  const [currenValue, toggleValue] = useState(defaultValue || "");

  return (
    <div className="flex flex-col">
      {title}
      <div className="rounded-lg border h-[40px] w-full flex">
        {options.map((opt, i) => (
          <label
            key={i}
            className={`cursor-pointer flex items-center  h-full 
            ${i !== 0 ? "border-l" : ""}
            w-1/${options.length}
            `}
          >
            <span
              className={`  px-2 flex items-center justify-center h-full w-full 
            ${i === 0 ? "rounded-l-lg" : ""}
            ${i === options.length - 1 ? "rounded-r-lg" : ""}
            ${currenValue === opt.value ? "bg-zinc-200" : "bg-white"}
            `}
            >
              {opt.label}
            </span>
            <input
              type="radio"
              className="hidden"
              value={opt.value}
              name="toggleBtn"
              onClick={() => {
                if (!disabled) {
                  toggleValue(opt.value);
                  onToggle(opt.value);
                }
              }}
            />
          </label>
        ))}
      </div>
    </div>
  );
};

export default ToggleButton;
