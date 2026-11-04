import type { IconName } from "@/lib/types";
import Card from "@/components/ui/Card";
import IconBox from "@/components/ui/IconBox";

export default function StepCard({
  number,
  icon,
  title,
  description,
}: {
  number: string;
  icon: IconName;
  title: string;
  description: string;
}) {
  return (
    <Card className="h-full min-h-56">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold tracking-[0.16em] text-cyan">{number}</span>
        <IconBox icon={icon} className="text-cyan" />
      </div>
      <h3 className="mt-8 font-heading text-lg font-semibold text-copy">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
    </Card>
  );
}
