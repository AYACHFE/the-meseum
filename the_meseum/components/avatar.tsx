import { initials } from "@/lib/utils";

type Props = {
  name: string;
  color: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
};

const sizes = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-lg",
  xl: "h-24 w-24 text-3xl",
};

export function Avatar({ name, color, size = "md", className = "" }: Props) {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-full font-semibold text-cream shadow-inner ring-2 ring-white/10 ${sizes[size]} ${className}`}
      style={{
        background: `linear-gradient(145deg, ${color}, color-mix(in srgb, ${color} 70%, #0c0a09))`,
      }}
      aria-hidden
    >
      <span className="display-font tracking-wide">{initials(name)}</span>
    </div>
  );
}
