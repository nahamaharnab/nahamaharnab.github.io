import { SiteFooter, SiteHeader } from "../components/SiteChrome";

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

export default function ResourcesPage() {
  return (
    <main>
      <SiteHeader active="resources" />

      <section className="resources-section page-section">
        <div className="section-heading resources-heading">
          <p className="eyebrow">02 — resources</p>
          <h1>Useful material, kept easy to find.</h1>
        </div>
        <div className="resource-list">
          {resources.map((resource, index) => (
            <article className="resource-row" key={resource.title}>
              <p>{String(index + 1).padStart(2, "0")}</p>
              <div>
                <h2>{resource.title}</h2>
                <p>{resource.description}</p>
              </div>
              <span>{resource.tag}</span>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
