type TauriWebviewWindowModule = {
  WebviewWindow: new (
    label: string,
    options: {
      title?: string;
      url?: string;
      width?: number;
      height?: number;
      resizable?: boolean;
      center?: boolean;
    },
  ) => unknown;
};

declare global {
  interface Window {
    __TAURI_INTERNALS__?: unknown;
  }
}

function isTauriDesktop() {
  return typeof window !== "undefined" && Boolean(window.__TAURI_INTERNALS__);
}

function createWorkspaceLabel(appName: string) {
  return `workspace-${appName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`;
}

export async function openInPersonalCore(appUrl: string, appName: string) {
  if (!isTauriDesktop()) {
    return false;
  }

  try {
    // Tauri desktop mode: open the hosted app in its own PersonalCore WebView window.
    // This dynamic import keeps the Vite/browser dev build from touching Tauri APIs.
    const { WebviewWindow } = (await import(
      "@tauri-apps/api/webviewWindow"
    )) as TauriWebviewWindowModule;

    new WebviewWindow(createWorkspaceLabel(appName), {
      title: appName,
      url: appUrl,
      width: 1180,
      height: 780,
      resizable: true,
      center: true,
    });

    return true;
  } catch (error) {
    console.error("Unable to open workspace app in a Tauri WebView window.", error);
    return false;
  }
}

export async function openInBrowser(appUrl: string) {
  if (isTauriDesktop()) {
    try {
      const moduleName = "@tauri-apps/plugin-opener";
      const opener = (await import(/* @vite-ignore */ moduleName)) as {
        openUrl?: (url: string) => Promise<void>;
        open?: (url: string) => Promise<void>;
      };

      if (opener.openUrl) {
        await opener.openUrl(appUrl);
        return;
      }

      if (opener.open) {
        await opener.open(appUrl);
        return;
      }
    } catch (error) {
      console.warn("Falling back to window.open for external workspace app.", error);
    }
  }

  window.open(appUrl, "_blank", "noopener,noreferrer");
}
