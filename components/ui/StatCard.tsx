export default function StatCard({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="border-l border-line pl-4">
      <p className="font-heading text-2xl font-semibold text-cyan">{value}</p>
      <p className="mt-1 text-sm leading-5 text-muted">{label}</p>
    </div>
  );
}
