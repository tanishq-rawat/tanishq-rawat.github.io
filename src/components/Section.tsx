import Reveal from "./Reveal";

interface SectionProps {
  id: string;
  index: string; // "01", "02"… mono structural label
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

/** Standard section shell: mono index eyebrow, display title, optional intro. */
export default function Section({
  id,
  index,
  eyebrow,
  title,
  intro,
  children,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`scroll-mt-24 py-24 md:py-32 ${className}`}
    >
      <div className="container-page">
        <Reveal className="mb-12 md:mb-16 max-w-2xl">
          <p className="eyebrow mb-4">
            <span className="text-text-faint">{index}</span>
            <span aria-hidden>/</span>
            {eyebrow}
          </p>
          <h2
            id={`${id}-heading`}
            className="display text-3xl sm:text-4xl md:text-5xl text-text"
          >
            {title}
          </h2>
          {intro && (
            <p className="mt-5 text-base md:text-lg leading-relaxed text-text-muted">
              {intro}
            </p>
          )}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
