import React from "react";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-sidebar text-white flex flex-col h-full shadow-lg">
      {/* TODO: Add navigation items and icons */}
      <div className="p-6 font-bold text-xl tracking-wide">Admin</div>
      <nav className="flex-1 flex flex-col gap-2 px-2">
        {/* Example nav items */}
        <a href="#" className="rounded px-3 py-2 hover:bg-accent">Dashboard</a>
        <a href="#" className="rounded px-3 py-2 hover:bg-accent">Users</a>
        <a href="#" className="rounded px-3 py-2 hover:bg-accent">Employers</a>
        <a href="#" className="rounded px-3 py-2 hover:bg-accent">Jobs</a>
        <a href="#" className="rounded px-3 py-2 hover:bg-accent">Reports</a>
        {/* ...more nav items */}
      </nav>
    </aside>
  );
};

export default Sidebar;
