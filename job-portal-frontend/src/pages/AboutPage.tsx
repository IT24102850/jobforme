export function AboutPage() {
  return (
    <section className="card" data-animate="fade-up">
      <span className="page-eyebrow">Our mission</span>
      <h1 style={{ marginBottom: '0.75rem' }}>Connecting Sri Lanka&apos;s talent with the world</h1>
      <p style={{ color: 'rgba(226, 232, 240, 0.7)', marginBottom: '1.5rem', maxWidth: '720px' }}>
        JobForMe pairs human career experts with ethical AI to help professionals find meaningful work faster. We
deliver curated matches, modern tools for employers, and deep support for every candidate journey.
      </p>
      <div className="grid" style={{ marginTop: '2rem' }}>
        <article className="stat-card" data-animate="fade-up" data-animate-delay="1">
          <h2 className="stat-card__value">24k+</h2>
          <p style={{ color: 'rgba(226, 232, 240, 0.7)' }}>Talent profiles crafted with guided storytelling templates.</p>
        </article>
        <article className="stat-card" data-animate="fade-up" data-animate-delay="2">
          <h2 className="stat-card__value">3k+</h2>
          <p style={{ color: 'rgba(226, 232, 240, 0.7)' }}>Employers verified across technology, design, finance, and sustainability.</p>
        </article>
        <article className="stat-card" data-animate="fade-up" data-animate-delay="3">
          <h2 className="stat-card__value">72 hrs</h2>
          <p style={{ color: 'rgba(226, 232, 240, 0.7)' }}>Average time for a candidate to receive their first interview invitation.</p>
        </article>
      </div>
    </section>
  );
}
