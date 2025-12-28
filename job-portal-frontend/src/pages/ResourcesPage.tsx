export function ResourcesPage() {
  return (
    <section className="card" data-animate="fade-up">
      <span className="page-eyebrow">Resources</span>
      <h1 style={{ marginBottom: '0.75rem' }}>Guides to level up your job search</h1>
      <p style={{ color: 'rgba(226, 232, 240, 0.7)', marginBottom: '1.5rem', maxWidth: '720px' }}>
        Explore playbooks designed by Sri Lankan career strategists covering portfolios, interviews, and compensation conversations.
      </p>

      <div className="grid">
        {[{
          title: 'Interview rituals that calm nerves',
          description: 'Breathing techniques and confidence frameworks from top coaches.',
          action: 'Read ritual guide'
        }, {
          title: 'Remote-first readiness kit',
          description: 'Design the ideal workspace, communication cadence, and onboarding checklist.',
          action: 'Download toolkit'
        }, {
          title: 'Salary insights 2025',
          description: 'Benchmark compensation across tech, product, and design roles with localized data.',
          action: 'View report'
        }].map((resource, index) => (
          <article key={resource.title} className="card card--compact" data-animate="fade-up" data-animate-delay={(index + 1).toString()}>
            <h2 style={{ marginTop: 0 }}>{resource.title}</h2>
            <p style={{ color: 'rgba(226, 232, 240, 0.7)' }}>{resource.description}</p>
            <a href="#" className="secondary-btn" style={{ width: 'fit-content' }}>{resource.action}</a>
          </article>
        ))}
      </div>
    </section>
  );
}
