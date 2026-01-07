import { useEffect } from "react";
import axios from "axios";

export default function OAuthCallback() {
  useEffect(() => {
    const rawCode = new URLSearchParams(window.location.search).get("code");

    if (!rawCode) return;

    // ⭐ MOST IMPORTANT FIX
    const decodedCode = decodeURIComponent(rawCode);

    axios
      .post("http://localhost:4000/oauth/token", {
        code: decodedCode, // 👈 decoded code bhejo
      })
      .then((res) => {
        localStorage.setItem("sfAuth", JSON.stringify(res.data));
        window.location.replace("/dashboard");
      })
      .catch((err) => {
        console.error("OAuth callback error:", err.response?.data || err.message);
        window.location.replace("/");
      });
  }, []);

  return <p>Logging in...</p>;
}
