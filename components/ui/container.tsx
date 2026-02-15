import { cn } from "@/lib/utils";

type ContrainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({ children, className }: ContrainerProps) {
  return (
    <div className={cn("mx-auto max-w-4xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}
