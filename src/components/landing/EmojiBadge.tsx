import React from "react";
import clsx from "clsx";

export type EmojiBadgeTone = "red" | "orange" | "green" | "primary" | "neutral";
export type EmojiBadgeSize = "sm" | "md" | "lg";

const toneMap: Record<EmojiBadgeTone, { bg: string; text: string }> = {
  red: { bg: "bg-red-100", text: "text-red-600" },
  orange: { bg: "bg-orange-100", text: "text-orange-600" },
  green: { bg: "bg-green-100", text: "text-green-600" },
  primary: { bg: "bg-primary/10", text: "text-primary" },
  neutral: { bg: "bg-gray-100", text: "text-gray-700" },
};

const sizeMap: Record<EmojiBadgeSize, string> = {
  sm: "w-10 h-10 text-base",
  md: "w-14 h-14 text-2xl",
  lg: "w-16 h-16 text-3xl",
};

export interface EmojiBadgeProps {
  emoji: string;
  tone?: EmojiBadgeTone;
  size?: EmojiBadgeSize;
  label?: string; // aria-label
  className?: string;
}

const EmojiBadge: React.FC<EmojiBadgeProps> = ({
  emoji,
  tone = "primary",
  size = "md",
  label,
  className,
}) => {
  const { bg, text } = toneMap[tone];
  const sizeCls = sizeMap[size];
  const ariaProps = label
    ? { role: "img" as const, "aria-label": label }
    : { "aria-hidden": true };

  return (
    <div
      className={clsx(
        "rounded-full flex items-center justify-center select-none",
        bg,
        text,
        sizeCls,
        className
      )}
      {...ariaProps}
    >
      <span>{emoji}</span>
    </div>
  );
};

export default React.memo(EmojiBadge);
