import React from "react";

type BadgeVariant = "default" | "coral" | "chartreuse" | "outline" | "success" | "warning" | "danger";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-veyra-champagne text-veyra-aubergine",
  coral: "bg-veyra-coral/10 text-veyra-coral",
  chartreuse: "bg-veyra-chartreuse/20 text-veyra-obsidian",
  outline: "border border-veyra-aubergine/15 text-veyra-aubergine/70",
  success: "bg-emerald-50 text-emerald-700",
  warning: "bg-amber-50 text-amber-700",
  danger: "bg-red-50 text-red-700",
};

export default function Badge({
  variant = "default",
  children,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5
        text-overline font-medium rounded-sm
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
