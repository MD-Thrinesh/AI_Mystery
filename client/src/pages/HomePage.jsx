import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function HomePage() {
  return (
    <div className="page-shell">
      <Navbar />

      <main className="hero">
        <section className="hero-copy">
          <p className="eyebrow">Fictional investigation generator</p>
          <h1>Uncover the truth behind an AI-crafted mystery.</h1>
          <p>
            AI Mystery Room turns your idea into an interactive case file: suspects, evidence,
            alibis, motives, and a final accusation awaiting your verdict.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/create">Create a Mystery</Link>
            <a className="button button-secondary" href="#how-it-works">How it Works</a>
          </div>
        </section>

        <aside className="feature-panel">
          <h3>Case Brief</h3>
          <ul>
            <li>Custom story prompts</li>
            <li>Generated suspects and clues</li>
            <li>Evidence timeline and notes</li>
            <li>Accusation + reveal flow</li>
          </ul>
        </aside>
      </main>

      <section id="how-it-works" className="info-grid">
        <div className="info-card">
          <h3>1. Build a case</h3>
          <p>Describe a scenario, choose difficulty, and set the mystery theme.</p>
        </div>
        <div className="info-card">
          <h3>2. Investigate</h3>
          <p>Explore suspect profiles, chat logs, images, CCTV, and timeline evidence.</p>
        </div>
        <div className="info-card">
          <h3>3. Accuse</h3>
          <p>Submit your final verdict and reveal the hidden culprit with the reasoning.</p>
        </div>
      </section>
    </div>
  );
}
