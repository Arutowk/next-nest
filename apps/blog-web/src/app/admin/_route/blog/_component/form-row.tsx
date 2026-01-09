import { Label } from "@/components/ui/label";

interface FormRowProps {
  label: string;
  id: string;
  children: React.ReactNode;
  description?: string;
}

export function FormRow({ label, id, children, description }: FormRowProps) {
  return (
    <div className="flex flex-col gap-2 pb-6 border-b last:border-0 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
      <div className="flex flex-col gap-1 sm:w-1/3">
        <Label htmlFor={id} className="text-base font-semibold">
          {label}
        </Label>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="w-full sm:w-2/3">{children}</div>
    </div>
  );
}
