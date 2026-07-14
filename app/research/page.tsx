import { SiteFooter, SiteHeader } from "../components/SiteChrome";

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

export default function ResearchPage() {
  return (
    <main>
      <SiteHeader active="research" />

      <section className="research-section page-section" id="main-content">
        <div className="section-heading">
          <p className="eyebrow">01 — research</p>
          <h1>A place for the work in progress.</h1>
          <p>
            Start with the work you most want people to read. This structure can
            grow naturally as papers, projects, and publications accumulate.
          </p>
          <p>
            i firmly believe my research should be scientific and inform society
            towards its growth, and would like my work to meaningfully motivate in
            this direction.
          </p>
        </div>

        <div className="research-grid">
          {researchAreas.map((area) => (
            <article className="research-card" key={area.number}>
              <p className="card-number">{area.number}</p>
              <h2>{area.title}</h2>
              <p>{area.description}</p>
              <span className="card-arrow" aria-hidden="true">
                ↗
              </span>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
