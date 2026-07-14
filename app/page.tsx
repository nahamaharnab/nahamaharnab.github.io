import { SiteFooter, SiteHeader } from "./components/SiteChrome";

export default function AboutPage() {
  return (
    <main>
      <SiteHeader active="about" />

      <section className="hero" id="main-content" aria-labelledby="about-title">
        <div className="hero-copy">
          <h1 className="sr-only" id="about-title">
            Maharnab Naha — personal academic website
          </h1>
          <p className="eyebrow">personal academic website</p>
          <div className="intro">
            <p>
              my name is pronounced as ma-her-nub. was born in Kolkata, India and did
              my bachelor and masters&apos; in Bhopal, India.
            </p>
            <p>
              currently i am a phd student in economics at University of Houston. my
              broad research interests lie in applied economics with evidence-based
              evaluation of policies to address social and development issues. primarily,
              my work falls under the umbrella of labor, development, and public
              economics.
            </p>
          </div>
          <div className="hero-actions">
            <a className="primary-link" href="/research">Explore research</a>
          </div>
        </div>
        <div className="hero-art hero-portrait">
          <img
            src="/maharnab-profile-reference-details.png"
            alt="Painted caricature of Maharnab Naha wearing round glasses and a blue jacket."
          />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
