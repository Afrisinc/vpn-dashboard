import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getConfigValue } from "@/lib/config";

export default function SSOCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/", { replace: true });
    } else {
      const authUrl = getConfigValue("authUiUrl");
      if (authUrl) {
        window.location.href = authUrl;
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-foreground mb-2">
          Completing sign in...
        </h1>
        <div className="animate-pulse text-muted-foreground">
          Please wait while we redirect you.
        </div>
      </div>
    </div>
  );
}
