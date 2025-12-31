import React from "react";

const sections = [
  { label: "Dashboard", icon: "📊" },
  { label: "Users", icon: "👤" },
  { label: "Job Seekers", icon: "🧑‍💼" },
  { label: "Employers", icon: "🏢" },
  { label: "Admins", icon: "🛡️", superAdmin: true },
  { label: "Employer Verification", icon: "✅" },
  { label: "Companies", icon: "🏭" },
  { label: "Jobs", icon: "💼", children: [
    { label: "Pending Approval", icon: "⏳" },
    { label: "Active Jobs", icon: "✔️" },
    { label: "Rejected Jobs", icon: "❌" },
    { label: "Removed Jobs", icon: "🚫" },
    { label: "Expired Jobs", icon: "⌛" },
  ]},
  { label: "Applications", icon: "📄" },
  { label: "Reports & Abuse", icon: "🚨" },
  { label: "Notifications", icon: "🔔" },
  { label: "Broadcast", icon: "📢" },
  { label: "Templates", icon: "📑" },
  { label: "Logs", icon: "📝" },
  { label: "Content (CMS Lite)", icon: "📰", children: [
    { label: "Banners", icon: "🎏" },
    { label: "FAQ", icon: "❓" },
    { label: "Terms / Privacy", icon: "📜" },
    { label: "About / Contact", icon: "📬" },
  ]},
  { label: "Analytics & Exports", icon: "📈" },
  { label: "Audit Logs", icon: "🔍" },
  { label: "System Settings", icon: "⚙️" },
  { label: "Security", icon: "🔒", children: [
    { label: "Admin sessions", icon: "🟢" },
    { label: "Rate limiting status", icon: "🚦" },
    { label: "2FA (optional)", icon: "🔑" },
  ]},
  { label: "Support / Tickets (optional)", icon: "🎫" },
];

const AdminSidebar: React.FC = () => {
  return (
    <aside className="w-72 bg-sidebar text-white flex flex-col h-full shadow-lg overflow-y-auto">
      <div className="p-6 font-bold text-2xl tracking-wide border-b border-white/10">Admin Panel</div>
      <nav className="flex-1 flex flex-col gap-1 px-2 py-4">
        {sections.map((section, idx) => (
          <div key={idx}>
            <a href="#" className="flex items-center gap-3 rounded px-3 py-2 hover:bg-accent transition-colors font-medium">
              <span className="text-lg">{section.icon}</span>
              <span>{section.label}</span>
            </a>
            {section.children && (
              <div className="ml-8 flex flex-col gap-1">
                {section.children.map((child, cidx) => (
                  <a key={cidx} href="#" className="flex items-center gap-2 rounded px-3 py-1 hover:bg-accent text-sm transition-colors">
                    <span>{child.icon}</span>
                    <span>{child.label}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
