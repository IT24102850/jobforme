import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { fetchJobs } from '../api/jobs';
import { Job, PaginationResponse } from '../types';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { JobCard } from '../components/JobCard';
import { Pagination } from '../components/Pagination';

const TYPES = ['FULL_TIME', 'PART_TIME', 'INTERN', 'CONTRACT'];

export function JobListPage() {
  const [params, setParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<PaginationResponse<Job>>({ items: [], totalItems: 0, totalPages: 0, page: 0, size: 10 });
  const [error, setError] = useState<string | null>(null);

  const filters = useMemo(() => ({
    keyword: params.get('keyword') ?? '',
    type: params.get('type') ?? '',
    skills: params.get('skills') ?? '',
    page: Number(params.get('page') ?? 0),
    size: Number(params.get('size') ?? 10)
  }), [params]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchJobs(filters)
      .then(setData)
      .catch(() => setError('Failed to load jobs'))
      .finally(() => setLoading(false));
  }, [filters.keyword, filters.type, filters.skills, filters.page, filters.size]);

  const handleFilterChange = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const next = new URLSearchParams();
    formData.forEach((value, key) => {
      if (value) {
        next.set(key, value.toString());
      }
    });
    next.set('page', '0');
    next.set('size', filters.size.toString());
    setParams(next);
  };

  const handlePageChange = (page: number) => {
    const next = new URLSearchParams(params);
    next.set('page', String(page));
    setParams(next);
  };

  const activeFilters = [
    filters.keyword && { label: 'Keyword', value: filters.keyword },
    filters.type && { label: 'Type', value: filters.type.replace('_', ' ') },
    filters.skills && { label: 'Skills', value: filters.skills }
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div className="jobs-page" data-animate="fade-up">
      <section className="card card--compact jobs-page__intro" data-animate="fade-up" data-animate-delay="1">
        <div>
          <span className="page-eyebrow">Discover your next role</span>
          <h1 className="jobs-page__title">Opportunities curated for you</h1>
          <p className="jobs-page__subtitle">Refine the filters to surface roles that align with your ambitions, skills, and preferred way of working.</p>
        </div>
        <div className="jobs-page__stats" aria-label="Job marketplace stats">
          <div>
            <span className="jobs-page__stat-value">{data.totalItems}</span>
            <span className="jobs-page__stat-label">Live openings</span>
          </div>
          <div>
            <span className="jobs-page__stat-value">{activeFilters.length}</span>
            <span className="jobs-page__stat-label">Filters applied</span>
          </div>
          <div>
            <span className="jobs-page__stat-value">{data.totalPages || 1}</span>
            <span className="jobs-page__stat-label">Pages of results</span>
          </div>
        </div>
      </section>

      <div className="card card--compact jobs-page__filters" data-animate="fade-up" data-animate-delay="2">
        <form onSubmit={handleFilterChange} className="jobs-page__filter-grid">
          <label className="jobs-page__filter-field">
            <span className="jobs-page__field-label">Keyword</span>
            <div className="jobs-page__field-control">
              <span className="jobs-page__field-icon" aria-hidden="true">
                <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5 12.5L17 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9.5 13.5C11.9853 13.5 14 11.4853 14 9C14 6.51472 11.9853 4.5 9.5 4.5C7.01472 4.5 5 6.51472 5 9C5 11.4853 7.01472 13.5 9.5 13.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <input className="jobs-page__field-input" name="keyword" placeholder="e.g. Product Designer" defaultValue={filters.keyword} />
            </div>
          </label>
          <label className="jobs-page__filter-field">
            <span className="jobs-page__field-label">Job type</span>
            <div className="jobs-page__field-control">
              <span className="jobs-page__field-icon" aria-hidden="true">
                <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 7.5V6.4C6 5.06863 6 4.40295 6.27248 3.90148C6.51217 3.46176 6.86176 3.11217 7.30148 2.87248C7.80295 2.6 8.46863 2.6 9.8 2.6H10.2C11.5314 2.6 12.197 2.6 12.6985 2.87248C13.1382 3.11217 13.4878 3.46176 13.7275 3.90148C14 4.40295 14 5.06863 14 6.4V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M3.6 7.5H16.4C17.2837 7.5 17.7256 7.5 18.0128 7.78718C18.3 8.07435 18.3 8.51632 18.3 9.4V14.1C18.3 14.9837 18.3 15.4256 18.0128 15.7128C17.7256 16 17.2837 16 16.4 16H3.6C2.71632 16 2.27435 16 1.98718 15.7128C1.7 15.4256 1.7 14.9837 1.7 14.1V9.4C1.7 8.51632 1.7 8.07435 1.98718 7.78718C2.27435 7.5 2.71632 7.5 3.6 7.5Z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M1.7 11.5H18.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
              <select className="jobs-page__field-input" name="type" defaultValue={filters.type}>
                <option value="">Any type</option>
                {TYPES.map(type => (
                  <option key={type} value={type}>{type.replace('_', ' ')}</option>
                ))}
              </select>
            </div>
          </label>
          <label className="jobs-page__filter-field jobs-page__filter-field--skills">
            <span className="jobs-page__field-label">Key skills</span>
            <div className="jobs-page__field-control">
              <span className="jobs-page__field-icon" aria-hidden="true">
                <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 2.8V5.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M15.657 4.343L13.914 6.086" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M17.2 10H14.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M15.657 15.657L13.914 13.914" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M10 17.2V14.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M4.343 15.657L6.086 13.914" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M2.8 10H5.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M4.343 4.343L6.086 6.086" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="10" cy="10" r="2.6" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </span>
              <input className="jobs-page__field-input" name="skills" placeholder="UI, Java, leadership" defaultValue={filters.skills} />
            </div>
          </label>
          <div className="jobs-page__filter-actions">
            <button className="secondary-btn" type="button" onClick={() => setParams(new URLSearchParams({ page: '0', size: filters.size.toString() }))}>Clear</button>
            <button className="primary-btn" type="submit">Update results</button>
          </div>
        </form>

        {activeFilters.length > 0 && (
          <div className="jobs-page__active-filters" role="status" aria-live="polite">
            {activeFilters.map(filter => (
              <span key={filter.label} className="badge">
                <strong>{filter.label}:</strong> {filter.value}
              </span>
            ))}
          </div>
        )}
      </div>

      <section className="jobs-page__results" data-animate="fade-up" data-animate-delay="3">
        <header className="jobs-page__results-header">
          <div>
            <h2>Showing {data.items.length} of {data.totalItems} roles</h2>
            <p>Page {data.page + 1} of {Math.max(data.totalPages, 1)} — tailored for your filters.</p>
          </div>
        </header>

        {loading && <LoadingSpinner />}
        {error && <p className="jobs-page__error">{error}</p>}

        {!loading && !error && (
          <div className="jobs-page__list">
            {data.items.map(job => <JobCard key={job.id} job={job} />)}
            {data.items.length === 0 && <p className="jobs-page__empty">No jobs match your filters.</p>}
          </div>
        )}
      </section>

      <Pagination page={data.page} totalPages={data.totalPages} onPageChange={handlePageChange} />
    </div>
  );
}
