type StatCardProps = {
  title: string;
  value: string;
  helper?: string;
};

function StatCard({ title, value, helper }: StatCardProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-core-muted">{title}</p>
      <p className="mt-3 text-3xl font-bold text-core-ink">{value}</p>
      {helper ? <p className="mt-2 text-sm text-core-muted">{helper}</p> : null}
    </section>
  );
}

export default StatCard;
