import { useMemo, useState } from "react";
import Sidebar, { type PageKey } from "./components/Sidebar";
import ToastContainer from "./components/ToastContainer";
import CheckIn from "./pages/CheckIn";
import Dashboard from "./pages/Dashboard";
import Habits from "./pages/Habits";
import Reminders from "./pages/Reminders";
import Settings from "./pages/Settings";
import Workspace from "./pages/Workspace";

function App() {
  const [activePage, setActivePage] = useState<PageKey>("dashboard");

  const pages = useMemo<Record<PageKey, JSX.Element>>(
    () => ({
      dashboard: <Dashboard onNavigate={setActivePage} />,
      habits: <Habits />,
      reminders: <Reminders />,
      checkIn: <CheckIn />,
      workspace: <Workspace />,
      settings: <Settings />,
    }),
    [],
  );

  return (
    <div className="flex h-screen overflow-hidden bg-core-soft text-core-ink">
      <Sidebar activePage={activePage} onPageChange={setActivePage} />
      <main className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden px-8 py-7">
        {pages[activePage]}
      </main>
      <ToastContainer />
    </div>
  );
}

export default App;
