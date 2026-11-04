import { cn } from "@/shared/lib/utils";

const CheckerDivider = ({ className }: { className?: string }) => {
  return <div className={cn("checker-divider", className)} aria-hidden="true" />;
};

export default CheckerDivider;
