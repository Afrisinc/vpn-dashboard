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

const isValidValue = (value: string | undefined): boolean => {
  return !!(value && !value.startsWith("__") && !value.endsWith("__"));
};

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

    const serverUrl =
      (isValidValue(windowEnv.VITE_API_URL) ? windowEnv.VITE_API_URL : null) ||
      import.meta.env.VITE_API_URL ||
      runtimeConfig.serverUrl;

    const authUiUrl =
      (isValidValue(windowEnv.VITE_AUTH_UI_URL)
        ? windowEnv.VITE_AUTH_UI_URL
        : null) ||
      import.meta.env.VITE_AUTH_UI_URL ||
      runtimeConfig.authUiUrl;

    if (!serverUrl) {
      throw new Error(
        "VITE_API_URL is required. Set via env var, window.__ENV__, or config.json",
      );
    }
    if (!authUiUrl) {
      throw new Error(
        "VITE_AUTH_UI_URL is required. Set via env var, window.__ENV__, or config.json",
      );
    }

    config = { serverUrl, authUiUrl };

    configLoaded = true;
    return config;
  } catch {
    const windowEnv =
      (window as Window & { __ENV__?: WindowEnv }).__ENV__ || {};

    const serverUrl =
      (isValidValue(windowEnv.VITE_API_URL) ? windowEnv.VITE_API_URL : null) ||
      import.meta.env.VITE_API_URL;

    const authUiUrl =
      (isValidValue(windowEnv.VITE_AUTH_UI_URL)
        ? windowEnv.VITE_AUTH_UI_URL
        : null) || import.meta.env.VITE_AUTH_UI_URL;

    if (!serverUrl) {
      throw new Error(
        "VITE_API_URL is required. Set via env var or window.__ENV__",
      );
    }
    if (!authUiUrl) {
      throw new Error(
        "VITE_AUTH_UI_URL is required. Set via env var or window.__ENV__",
      );
    }

    config = { serverUrl, authUiUrl };
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
  return cfg[key];
}

export function isRuntimeConfigLoaded(): boolean {
  return configLoaded;
}
