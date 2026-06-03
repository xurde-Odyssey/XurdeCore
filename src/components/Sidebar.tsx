import {
  Bell,
  CalendarCheck,
  CheckCircle2,
  LayoutDashboard,
  LogOut,
  PanelsTopLeft,
  Settings,
  User,
  type LucideIcon,
} from "lucide-react";

export type PageKey =
  | "dashboard"
  | "habits"
  | "reminders"
  | "checkIn"
  | "workspace"
  | "settings";

type NavItem = {
  key: PageKey;
  label: string;
  icon: LucideIcon;
};

type SidebarProps = {
  activePage: PageKey;
  onPageChange: (page: PageKey) => void;
};

const navItems: NavItem[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "habits", label: "Routines", icon: CheckCircle2 },
  { key: "reminders", label: "Reminders", icon: Bell },
  { key: "checkIn", label: "Daily Check-in", icon: CalendarCheck },
  { key: "workspace", label: "Workspace", icon: PanelsTopLeft },
  { key: "settings", label: "Settings", icon: Settings },
];

function Sidebar({ activePage, onPageChange }: SidebarProps) {
  return (
    <aside className="flex h-screen w-72 shrink-0 flex-col border-r border-slate-200 bg-white px-5 py-6">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <img src="/icons/logo.svg" alt="XurdeCore logo" className="h-10 w-10 rounded-xl" />
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-core-accent">
            XurdeCore
          </p>
        </div>
        <h1 className="mt-2 text-2xl font-bold text-core-ink">Development Hub</h1>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = item.key === activePage;
          const Icon = item.icon;

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onPageChange(item.key)}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-semibold transition ${
                isActive
                  ? "bg-core-accent text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-core-ink"
              }`}
            >
              <Icon size={18} strokeWidth={2} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto space-y-2 border-t border-slate-200 pt-4">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-core-ink"
        >
          <User size={18} strokeWidth={2} />
          Account
        </button>
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
        >
          <LogOut size={18} strokeWidth={2} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
