import React from "react";

const Topbar: React.FC = () => {
  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b flex items-center px-6 justify-between shadow-sm">
      {/* TODO: Add global search, notifications, profile menu, system status */}
      <div className="font-semibold text-lg">Admin Dashboard</div>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">🔍</button>
        <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">🔔</button>
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="font-medium">Admin</span>
          <span className="bg-green-500 text-xs px-2 py-1 rounded text-white">Normal</span>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
