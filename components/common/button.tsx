import { SpinnerAnimation } from "./spinner";

interface Props {
  // sulfixClick?: () => void;
  color?: "green" | "outlined-grey" | "red";
  size?: "auto" | "xs" | "sm" | "md" | "lg" | "xl";
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
}

const Button: React.FC<Props> = ({
  color,
  size = "md",
  onClick,
  children,
  disabled,
  loading,
}: Props) => {
  return (
    <button
      disabled={disabled}
      className={`${color ? `btn-${color}` : ""} flex gap-1`}
      onClick={(e: any) => {
        if (!loading) {
          onClick();
        }
        e.preventDefault();
      }}
    >
      {children}
      {loading ? <SpinnerAnimation /> : ""}
    </button>
  );
};

export default Button;
