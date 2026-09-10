import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
}

export default function Input({
  label,
  error,
  hint,
  icon,
  className = "",
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-body-sm font-medium text-veyra-aubergine/80"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-veyra-aubergine/40">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          className={`
            w-full px-4 py-2.5 text-body
            bg-white border border-veyra-aubergine/10
            rounded-sm
            text-veyra-aubergine placeholder:text-veyra-aubergine/30
            transition-all duration-200
            hover:border-veyra-aubergine/25
            focus:outline-none focus:border-veyra-aubergine/40 focus:ring-1 focus:ring-veyra-aubergine/10
            disabled:opacity-50 disabled:bg-veyra-champagne/30
            ${icon ? "pl-10" : ""}
            ${error ? "border-veyra-coral/60 focus:border-veyra-coral focus:ring-veyra-coral/10" : ""}
            ${className}
          `}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          {...props}
        />
      </div>
      {error && (
        <p id={`${inputId}-error`} className="text-caption text-veyra-coral" role="alert">
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={`${inputId}-hint`} className="text-caption text-veyra-aubergine/40">
          {hint}
        </p>
      )}
    </div>
  );
}
