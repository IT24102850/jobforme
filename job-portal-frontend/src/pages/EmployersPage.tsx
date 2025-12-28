import { Link } from 'react-router-dom';

export function EmployersPage() {
  return (
    <section className="card" data-animate="fade-up">
      <span className="page-eyebrow">For employers</span>
      <h1 style={{ marginBottom: '0.75rem' }}>Build teams that feel unstoppable</h1>
      <p style={{ color: 'rgba(226, 232, 240, 0.7)', maxWidth: '720px' }}>
        Our employer workspace blends curated recommendations, inclusive branding support, and collaborative hiring flows. Stand out to the island&apos;s brightest talent and close roles with confidence.
      </p>

      <div className="jobs-page__stats" style={{ marginTop: '2rem' }}>
        <div>
          <span className="jobs-page__stat-value">6</span>
          <span className="jobs-page__stat-label">Hiring pipelines in one dashboard</span>
        </div>
        <div>
          <span className="jobs-page__stat-value">94%</span>
          <span className="jobs-page__stat-label">Offer acceptance rate</span>
        </div>
        <div>
          <span className="jobs-page__stat-value">48 hrs</span>
          <span className="jobs-page__stat-label">Average candidate response time</span>
        </div>
      </div>

      <div style={{ display: 'grid', gap: '1.2rem', marginTop: '2.5rem' }}>
        <div className="card card--compact" data-animate="fade-up" data-animate-delay="1">
          <h2 style={{ marginTop: 0 }}>Launch an inclusive brand</h2>
          <p style={{ color: 'rgba(226, 232, 240, 0.7)' }}>
            Partner with our storytellers to craft role narratives, job descriptions, and culture decks that resonate across Sri Lanka&apos;s diverse talent.
          </p>
        </div>
        <div className="card card--compact" data-animate="fade-up" data-animate-delay="2">
          <h2 style={{ marginTop: 0 }}>Automate the busywork</h2>
          <p style={{ color: 'rgba(226, 232, 240, 0.7)' }}>
            Schedule interviews, collect feedback, and nurture talent pools without losing your human touch.
          </p>
        </div>
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Link to="/register" className="primary-btn">Create employer account</Link>
        <Link to="/login" className="secondary-btn">Book a walkthrough</Link>
      </div>
    </section>
  );
}
