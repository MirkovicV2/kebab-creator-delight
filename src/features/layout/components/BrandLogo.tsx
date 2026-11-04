import { cn } from "@/shared/lib/utils";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  subtitle?: string;
  align?: "left" | "center";
}

const sizeClasses = {
  sm: "text-[3.15rem] sm:text-[4rem]",
  md: "text-[4.5rem] sm:text-[5.75rem]",
  lg: "text-[clamp(5rem,12vw,10rem)]",
} as const;

const BrandLogo = ({
  size = "md",
  className,
  subtitle = "Rivas-Vaciamadrid",
  align = "left",
}: BrandLogoProps) => {
  return (
    <div className={cn("flex flex-col", align === "center" ? "items-center text-center" : "", className)}>
      <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-black/55">{subtitle}</span>
      <span className={cn("brand-wordmark text-black", sizeClasses[size])}>Dejavu</span>
    </div>
  );
};

export default BrandLogo;
