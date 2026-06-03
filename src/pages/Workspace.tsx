import { useEffect, useMemo, useState } from "react";
import { ExternalLink, MonitorUp, PanelTopOpen } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { openInBrowser, openInPersonalCore } from "../services/workspaceService";

type WorkspaceApp = {
  name: string;
  description: string;
  url: string;
};

type PreviewStatus = "idle" | "loading" | "loaded" | "blocked";

const workspaceApps: WorkspaceApp[] = [
  {
    name: "XurdeCore",
    description: "Open the hosted XurdeCore workspace from inside PersonalCore.",
    url: "https://xurdecore.vercel.app",
  },
  {
    name: "Letter Generator",
    description: "Draft polished letters and documents from a focused web app.",
    url: "https://letter-generator.vercel.app",
  },
  {
    name: "Business Dashboard",
    description: "Review business metrics and operations from your hosted dashboard.",
    url: "https://business-dashboard.vercel.app",
  },
];

function Workspace() {
  const [selectedApp, setSelectedApp] = useState<WorkspaceApp | null>(null);
  const [previewStatus, setPreviewStatus] = useState<PreviewStatus>("idle");

  const selectedHost = useMemo(() => {
    if (!selectedApp) {
      return "";
    }

    return new URL(selectedApp.url).hostname;
  }, [selectedApp]);

  useEffect(() => {
    if (!selectedApp || previewStatus !== "loading") {
      return;
    }

    const fallbackTimer = window.setTimeout(() => {
      setPreviewStatus((currentStatus) =>
        currentStatus === "loading" ? "blocked" : currentStatus,
      );
    }, 4500);

    return () => window.clearTimeout(fallbackTimer);
  }, [selectedApp, previewStatus]);

  async function handleOpenInPersonalCore(app: WorkspaceApp) {
    const openedInTauriWindow = await openInPersonalCore(app.url, app.name);

    if (openedInTauriWindow) {
      return;
    }

    // Web/dev mode: preview the selected hosted app inside this page with an iframe.
    // Some hosted apps block iframe embedding with X-Frame-Options or CSP.
    setSelectedApp(app);
    setPreviewStatus("loading");
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageHeader
          title="Workspace"
          description="Open your hosted apps from one PersonalCore hub."
        />
      </div>

      <section className="grid gap-4 xl:grid-cols-3 lg:grid-cols-2">
        {workspaceApps.map((app) => (
          <article
            key={app.name}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-core-accent">
                <PanelTopOpen size={22} strokeWidth={2.2} />
              </div>
              <div className="min-w-0">
                <h2 className="text-lg font-semibold text-core-ink">{app.name}</h2>
                <p className="mt-2 text-sm leading-6 text-core-muted">{app.description}</p>
              </div>
            </div>

            <a
              href={app.url}
              target="_blank"
              rel="noreferrer"
              className="mt-5 block truncate rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-core-muted transition hover:border-blue-200 hover:text-core-accent"
            >
              {app.url}
            </a>

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleOpenInPersonalCore(app)}
                className="inline-flex items-center gap-2 rounded-lg bg-core-accent px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                <MonitorUp size={16} strokeWidth={2.3} />
                Open in PersonalCore
              </button>
              <button
                type="button"
                onClick={() => openInBrowser(app.url)}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-core-muted transition hover:border-slate-300 hover:text-core-ink"
              >
                <ExternalLink size={16} strokeWidth={2.3} />
                Open in Browser
              </button>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-6 rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-core-ink">
              {selectedApp ? selectedApp.name : "Workspace preview"}
            </h2>
            <p className="mt-1 text-sm text-core-muted">
              {selectedApp
                ? `Previewing ${selectedHost} in web/dev mode.`
                : "Choose an app card to preview it here."}
            </p>
          </div>

          {selectedApp && (
            <button
              type="button"
              onClick={() => openInBrowser(selectedApp.url)}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-core-muted transition hover:border-slate-300 hover:text-core-ink"
            >
              <ExternalLink size={16} strokeWidth={2.3} />
              Open in Browser
            </button>
          )}
        </div>

        <div className="min-h-[520px] bg-slate-50">
          {!selectedApp && (
            <div className="flex min-h-[520px] items-center justify-center px-6 text-center">
              <div>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-core-accent">
                  <MonitorUp size={24} strokeWidth={2.2} />
                </div>
                <p className="mt-4 text-sm font-semibold text-core-muted">
                  Your selected app will load inside PersonalCore.
                </p>
              </div>
            </div>
          )}

          {selectedApp && (
            <div className="relative min-h-[520px]">
              {previewStatus === "blocked" && (
                <div className="absolute inset-x-4 top-4 z-10 rounded-lg border border-amber-200 bg-amber-50 p-4 shadow-sm">
                  <h3 className="text-sm font-bold text-core-ink">Preview may be blocked</h3>
                  <p className="mt-1 text-sm leading-5 text-core-muted">
                    This hosted app may prevent iframe embedding with security headers. Use Open
                    in Browser if the preview stays blank.
                  </p>
                </div>
              )}

              {previewStatus === "loading" && (
                <div className="absolute inset-x-4 top-4 z-10 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm font-semibold text-blue-700 shadow-sm">
                  Loading hosted app preview...
                </div>
              )}

              <iframe
                key={selectedApp.url}
                src={selectedApp.url}
                title={`${selectedApp.name} preview`}
                onLoad={() => setPreviewStatus("loaded")}
                className="h-[620px] w-full rounded-b-lg border-0 bg-white"
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Workspace;
