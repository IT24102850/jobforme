import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  onSearch: (event: React.FormEvent<HTMLFormElement>) => void;
}

interface HeroSlide {
  id: string;
  label: string;
  title: string;
  description: string;
  accent: string;
  image: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'collaboration-hub',
    label: 'Trusted by global teams',
    title: 'Build teams that shift industries',
    description: 'Connect with verified employers, showcase your profile, and move from search to signed offer in record time.',
    accent: 'Backend • Design • Product • Data',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: 'future-of-work',
    label: 'Human + AI recruiting',
    title: 'Hiring experiences built for 2025',
    description: 'Employers craft premium journeys, automate outreach, and nurture talent all from one dashboard.',
    accent: 'Smart matching with human warmth',
    image: 'https://images.unsplash.com/photo-1542744173-05336fcc7ad4?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: 'talent-lounge',
    label: 'Opportunities without borders',
    title: 'Your next role is a conversation away',
    description: 'Access curated openings, step into immersive application flows, and track every milestone effortlessly.',
    accent: 'Remote • Hybrid • On-site',
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1600&q=80'
  }
];

export function HeroSection({ onSearch }: HeroSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex(prev => (prev + 1) % HERO_SLIDES.length);
    }, 7500);

    return () => window.clearInterval(timer);
  }, []);

  const activeSlide = HERO_SLIDES[activeIndex];

  return (
    <section className="hero hero--carousel hero--full" data-animate="fade-up" data-glow>
      <div className="hero__background" aria-hidden>
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero__background-layer${index === activeIndex ? ' is-active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}
      </div>
      <div className="hero__gradient" aria-hidden />
      <div className="hero__content">
        <span className="pill" data-animate="fade-up" data-animate-delay="1">{activeSlide.label}</span>
        <h1 className="hero__title" data-animate="fade-up" data-animate-delay="2">{activeSlide.title}</h1>
        <p className="hero__subtitle" data-animate="fade-up" data-animate-delay="3">{activeSlide.description}</p>
        <span className="hero__badge" data-animate="fade-up" data-animate-delay="4">{activeSlide.accent}</span>
        <form className="hero__actions" onSubmit={onSearch} data-animate="fade-up" data-animate-delay="5">
          <input name="keyword" placeholder="Search by title, company, or skill" className="hero__search" />
          <button type="submit" className="primary-btn">Search roles</button>
          <Link to="/jobs" className="secondary-btn">Explore openings</Link>
        </form>
      </div>
      <div className="hero__indicators" role="tablist" aria-label="Hero slides">
        {HERO_SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            className={`hero__indicator${index === activeIndex ? ' is-active' : ''}`}
            aria-pressed={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          >
            <span className="visually-hidden">Show {slide.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
