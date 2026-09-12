export type SectionNavItem = { id: string; label: string };

export default function SectionNav({ items }: { items: SectionNavItem[] }) {
  if (items.length < 2) return null;

  return (
    <nav
      aria-label="Page sections"
      className="sticky top-[88px] z-40 mx-auto hidden max-w-[1440px] px-6 md:block md:px-12"
    >
      <div className="flex items-center gap-8 overflow-x-auto border-b border-white/10 bg-forge-black/95 py-4 backdrop-blur">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="press shrink-0 whitespace-nowrap font-display text-sm font-medium text-body-text transition-colors hover:text-forge-orange-text"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
