import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { createJob, updateJob } from '../../api/employer';
import { fetchJob } from '../../api/jobs';
import { JobFormValues, JobType } from '../../types';

const TYPES: JobType[] = ['FULL_TIME', 'PART_TIME', 'INTERN', 'CONTRACT'];

const emptyForm: JobFormValues = {
  title: '',
  description: '',
  location: '',
  type: 'FULL_TIME',
  minSalary: '',
  maxSalary: '',
  skills: ''
};

export function PostJobPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<JobFormValues>(emptyForm);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isEdit = Boolean(id);

  useEffect(() => {
    if (!id) return;
    fetchJob(id)
      .then(job => setForm({
        title: job.title,
        description: job.description,
        location: job.location,
        type: job.type,
        minSalary: job.minSalary ?? '',
        maxSalary: job.maxSalary ?? '',
        skills: job.skills ?? ''
      }))
      .catch(() => setError('Failed to load job details'));
  }, [id]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    setError(null);
    const payload: JobFormValues = {
      ...form,
      minSalary: form.minSalary === '' ? undefined : Number(form.minSalary),
      maxSalary: form.maxSalary === '' ? undefined : Number(form.maxSalary)
    };
    try {
      if (isEdit && id) {
        await updateJob(id, payload);
        setMessage('Job updated');
      } else {
        const job = await createJob(payload);
        setMessage('Job created');
        navigate(`/employer/jobs/${job.id}/applicants`, { replace: true });
      }
    } catch (err) {
      setError('Failed to save job. Ensure company profile exists.');
    }
  };

  return (
    <div className="card content-narrow" data-animate="fade-up">
      <h2 style={{ marginBottom: '0.4rem' }}>{isEdit ? 'Edit job posting' : 'Post a new job'}</h2>
      <p style={{ color: 'rgba(148, 163, 184, 0.82)', marginBottom: '1.5rem' }}>Craft a compelling listing to connect with top talent.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Job title</label>
          <input id="title" name="title" value={form.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" rows={6} value={form.description} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input id="location" name="location" value={form.location} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="type">Job type</label>
          <select id="type" name="type" value={form.type} onChange={handleChange}>
            {TYPES.map(type => (
              <option key={type} value={type}>{type.replace('_', ' ')}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="minSalary">Minimum salary</label>
          <input id="minSalary" name="minSalary" type="number" value={form.minSalary ?? ''} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="maxSalary">Maximum salary</label>
          <input id="maxSalary" name="maxSalary" type="number" value={form.maxSalary ?? ''} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="skills">Skills</label>
          <input id="skills" name="skills" value={form.skills ?? ''} onChange={handleChange} />
        </div>
        {message && <p style={{ color: '#86efac' }}>{message}</p>}
        {error && <p style={{ color: '#fda4af' }}>{error}</p>}
        <button className="primary-btn" type="submit">{isEdit ? 'Update job' : 'Create job'}</button>
      </form>
    </div>
  );
}
