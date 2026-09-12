export default function TechStack({ tools }: { tools?: string[] }) {
  const items = tools ?? [];
  if (items.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1440px] px-6 pb-16 md:px-12">
      <div className="flex flex-col gap-4">
        <p className="font-display text-sm font-medium uppercase tracking-wide text-muted">Built with</p>
        <div className="flex flex-wrap gap-3">
          {items.map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-white/15 px-4 py-2 font-display text-sm font-medium text-pure-white"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
