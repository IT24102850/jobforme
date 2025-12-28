import { PropsWithChildren } from 'react';

import { NavBar } from './NavBar';

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className="layout-shell">
      <NavBar />
      <main className="layout-main">
        <div className="container" data-animate="fade-up">
          {children}
        </div>
      </main>
    </div>
  );
}
