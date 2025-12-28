import { Outlet, Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { JobsPage as AdminJobsPage } from './pages/admin/JobsPage';
import { UsersPage } from './pages/admin/UsersPage';
import { ApplicantsPage } from './pages/employer/ApplicantsPage';
import { CompanyProfilePage } from './pages/employer/CompanyProfilePage';
import { EmployerDashboard } from './pages/employer/EmployerDashboard';
import { MyJobsPage } from './pages/employer/MyJobsPage';
import { PostJobPage } from './pages/employer/PostJobPage';
import { HomePage } from './pages/HomePage';
import { JobDetailsPage } from './pages/JobDetailsPage';
import { JobListPage } from './pages/JobListPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ApplicationsPage } from './pages/seeker/ApplicationsPage';
import { ProfilePage } from './pages/seeker/ProfilePage';
import { SeekerDashboard } from './pages/seeker/SeekerDashboard';
import { AboutPage } from './pages/AboutPage';
import { EmployersPage } from './pages/EmployersPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ChangePasswordPage } from './pages/ChangePasswordPage';

function LayoutRoute() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

function NotFoundPage() {
  return (
    <div className="card">
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist or was moved.</p>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<LayoutRoute />}>
        <Route index element={<HomePage />} />
        <Route path="jobs" element={<JobListPage />} />
        <Route path="jobs/:id" element={<JobDetailsPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="employers" element={<EmployersPage />} />
        <Route path="resources" element={<ResourcesPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="account/security" element={<ChangePasswordPage />} />
        </Route>

        <Route element={<ProtectedRoute roles={["SEEKER"]} />}>
          <Route path="seeker" element={<SeekerDashboard />} />
          <Route path="seeker/profile" element={<ProfilePage />} />
          <Route path="seeker/applications" element={<ApplicationsPage />} />
        </Route>

        <Route element={<ProtectedRoute roles={["EMPLOYER"]} />}>
          <Route path="employer" element={<EmployerDashboard />} />
          <Route path="employer/profile" element={<CompanyProfilePage />} />
          <Route path="employer/jobs" element={<MyJobsPage />} />
          <Route path="employer/jobs/new" element={<PostJobPage />} />
          <Route path="employer/jobs/:id/applicants" element={<ApplicantsPage />} />
        </Route>

        <Route element={<ProtectedRoute roles={["ADMIN"]} />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/users" element={<UsersPage />} />
          <Route path="admin/jobs" element={<AdminJobsPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
