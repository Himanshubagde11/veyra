import React from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "coral" | "chartreuse";
type ButtonSize = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-veyra-aubergine text-white hover:bg-veyra-aubergine-light active:bg-veyra-obsidian",
  secondary:
    "bg-veyra-champagne text-veyra-aubergine hover:bg-veyra-champagne-deep active:bg-veyra-champagne-deep",
  ghost:
    "bg-transparent text-veyra-aubergine hover:bg-veyra-champagne/50 active:bg-veyra-champagne",
  outline:
    "bg-transparent text-veyra-aubergine border border-veyra-aubergine/20 hover:border-veyra-aubergine/40 hover:bg-veyra-champagne/30",
  coral:
    "bg-veyra-coral text-white hover:bg-veyra-coral-dark active:bg-veyra-coral-dark",
  chartreuse:
    "bg-veyra-chartreuse text-veyra-obsidian hover:bg-veyra-chartreuse-dark active:bg-veyra-chartreuse-dark",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-body-sm gap-1.5",
  md: "px-6 py-2.5 text-body-sm gap-2",
  lg: "px-8 py-3 text-body gap-2",
  xl: "px-10 py-4 text-body-lg gap-2.5",
};

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  iconRight,
  fullWidth = false,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center font-medium
        rounded-sm transition-all duration-250 ease-out
        select-none cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      ) : (
        icon
      )}
      {children}
      {iconRight}
    </button>
  );
}
