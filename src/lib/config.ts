export interface RuntimeConfig {
  serverUrl: string;
  authUiUrl: string;
}

interface WindowEnv {
  VITE_API_URL?: string;
  VITE_AUTH_UI_URL?: string;
}

let config: RuntimeConfig | null = null;
let configLoaded = false;

export async function loadRuntimeConfig(): Promise<RuntimeConfig> {
  if (configLoaded) {
    return config!;
  }

  try {
    const windowEnv =
      (window as Window & { __ENV__?: WindowEnv }).__ENV__ || {};

    const response = await fetch("/config.json", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    let runtimeConfig: { serverUrl?: string; authUiUrl?: string } = {};
    if (response.ok) {
      runtimeConfig = await response.json();
    }

    config = {
      serverUrl:
        windowEnv.VITE_API_URL ||
        import.meta.env.VITE_API_URL ||
        runtimeConfig.serverUrl ||
        "",
      authUiUrl:
        windowEnv.VITE_AUTH_UI_URL ||
        import.meta.env.VITE_AUTH_UI_URL ||
        runtimeConfig.authUiUrl ||
        "",
    };

    configLoaded = true;
    return config;
  } catch {
    const windowEnv =
      (window as Window & { __ENV__?: WindowEnv }).__ENV__ || {};

    config = {
      serverUrl: windowEnv.VITE_API_URL || import.meta.env.VITE_API_URL || "",
      authUiUrl:
        windowEnv.VITE_AUTH_UI_URL || import.meta.env.VITE_AUTH_UI_URL || "",
    };
    configLoaded = true;
    return config;
  }
}

export function getRuntimeConfig(): RuntimeConfig {
  if (!configLoaded || !config) {
    throw new Error(
      "Configuration not loaded. Call loadRuntimeConfig() first.",
    );
  }
  return config;
}

export function getConfigValue(key: keyof RuntimeConfig): string {
  const cfg = getRuntimeConfig();
  return cfg[key] || "";
}

export function isRuntimeConfigLoaded(): boolean {
  return configLoaded;
}
