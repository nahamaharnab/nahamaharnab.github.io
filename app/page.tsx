import { SiteFooter, SiteHeader } from "./components/SiteChrome";

export default function AboutPage() {
  return (
    <main>
      <SiteHeader active="about" />

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">personal academic website</p>
          <div className="intro">
            <p>
              i am a <strong>phd student</strong> in economics at{" "}
              <strong>university of houston</strong>. was born in kolkata, india and
              did my bachelor and master&apos;s studies in bhopal, india. my name is
              pronounced as maha-r-nab.
            </p>
            <p>
              my broad research interests lie in applied economics with evidence-based
              evaluation of policies addressing social and development issues. my work
              falls primarily under the umbrella of labor, development, and public
              economics.
            </p>
          </div>
          <div className="hero-actions">
            <a className="primary-link" href="/research">Explore research</a>
          </div>
        </div>
        <div className="hero-art hero-portrait">
          <img
            src="/maharnab-portrait-transparent-v2.png"
            alt="Painted caricature of Maharnab Naha wearing round glasses and a blue jacket."
          />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
