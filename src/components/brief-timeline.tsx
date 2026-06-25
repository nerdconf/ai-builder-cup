import type { ReactNode } from "react";

export function BriefTimeline({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`brief-timeline grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-3 sm:grid-cols-[2.5rem_minmax(0,1fr)] sm:gap-x-4 ${className}`}
    >
      {children}
    </div>
  );
}

export function BriefTimelineSection({
  number,
  label,
  children,
}: {
  number: string;
  label: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="brief-timeline-section col-span-2 grid grid-cols-subgrid [&:not(:first-child)]:mt-10 sm:[&:not(:first-child)]:mt-12">
      <span className="brief-section-index col-start-1 flex h-[1.25em] items-center justify-end text-neon sm:h-[1.2em]">
        {number}
      </span>
      <div className="col-start-2 min-w-0">
        <h2 className="brief-section-heading">{label}</h2>
        {children}
      </div>
    </section>
  );
}
