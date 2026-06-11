import { socials } from "@/data/content";
import { brandIcons } from "./BrandIcons";

/** Reusable icon row (hero, contact, footer). 44×44 touch targets, labelled. */
export default function SocialRow({
  className = "",
  size = 20,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <ul className={`flex items-center gap-1.5 ${className}`}>
      {socials.map((s) => {
        const Icon = brandIcons[s.key];
        return (
          <li key={s.key}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              title={s.label}
              className="grid h-11 w-11 place-items-center rounded-lg text-text-muted transition-colors duration-200 hover:bg-surface-2 hover:text-accent"
            >
              <Icon width={size} height={size} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
