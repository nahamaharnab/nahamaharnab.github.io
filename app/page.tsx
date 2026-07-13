const researchAreas = [
  {
    number: "01",
    title: "Working papers",
    description:
      "A home for current drafts, short abstracts, and links to the latest version of each paper.",
  },
  {
    number: "02",
    title: "Research agenda",
    description:
      "A concise overview of the questions, methods, and fields that connect your work.",
  },
  {
    number: "03",
    title: "Publications",
    description:
      "A clear record of published work, with direct links to papers, code, data, and slides where available.",
  },
];

const resources = [
  {
    title: "Curriculum vitae",
    description: "Add the current PDF of your academic CV here.",
    tag: "Coming soon",
  },
  {
    title: "Research materials",
    description: "Share data, code, replication packages, and research notes.",
    tag: "Coming soon",
  },
  {
    title: "Teaching & notes",
    description: "Collect course materials and writing intended for a broader audience.",
    tag: "Coming soon",
  },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#about" aria-label="Maharnab Naha home">
          Maharnab Naha
        </a>
        <nav className="site-nav" aria-label="Main navigation">
          <a href="#about">About Me</a>
          <a href="#research">Research</a>
          <a href="#resources">Resources</a>
        </nav>
      </header>

      <section className="hero" id="about">
        <div className="hero-copy">
          <p className="eyebrow">Academic research</p>
          <h1>Questions worth following.</h1>
          <p className="intro">
            I am Maharnab Naha, an academic researcher. This site brings together
            my research, working papers, and materials for readers and collaborators.
          </p>
          <div className="hero-actions">
            <a className="primary-link" href="#research">
              Explore research <span aria-hidden="true">↓</span>
            </a>
            <a className="text-link" href="#resources">
              View resources
            </a>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="spark spark-large" />
          <div className="spark spark-small" />
          <p>MH</p>
        </div>
      </section>

      <section className="research-section" id="research">
        <div className="section-heading">
          <p className="eyebrow">01 — Research</p>
          <h2>A place for the work in progress.</h2>
          <p>
            Start with the work you most want people to read. This structure can
            grow naturally as papers, projects, and publications accumulate.
          </p>
        </div>

        <div className="research-grid">
          {researchAreas.map((area) => (
            <article className="research-card" key={area.number}>
              <p className="card-number">{area.number}</p>
              <h3>{area.title}</h3>
              <p>{area.description}</p>
              <span className="card-arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section className="resources-section" id="resources">
        <div className="section-heading resources-heading">
          <p className="eyebrow">02 — Resources</p>
          <h2>Useful material, kept easy to find.</h2>
        </div>
        <div className="resource-list">
          {resources.map((resource, index) => (
            <article className="resource-row" key={resource.title}>
              <p>{String(index + 1).padStart(2, "0")}</p>
              <div>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
              </div>
              <span>{resource.tag}</span>
            </article>
          ))}
        </div>
      </section>

      <footer>
        <p>Maharnab Naha</p>
        <p>Academic research · 2026</p>
      </footer>
    </main>
  );
}
