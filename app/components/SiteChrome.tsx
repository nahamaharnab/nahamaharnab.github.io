type SiteSection = "about" | "research" | "resources";

type SiteHeaderProps = {
  active: SiteSection;
};

const navigation = [
  { id: "about", href: "/", label: "About Me" },
  { id: "research", href: "/research", label: "Research" },
  { id: "resources", href: "/resources", label: "Resources" },
] as const;

export function SiteHeader({ active }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <a className="wordmark" href="/" aria-label="Maharnab Naha home">
        Maharnab Naha
      </a>
      <nav className="site-nav" aria-label="Main navigation">
        {navigation.map((item) => (
          <a
            aria-current={item.id === active ? "page" : undefined}
            className={item.id === active ? "active" : undefined}
            href={item.href}
            key={item.id}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <p>Maharnab Naha</p>
      <p>Personal research website · 2026</p>
    </footer>
  );
}
