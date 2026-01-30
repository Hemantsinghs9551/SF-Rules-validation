import { useEffect, useRef } from "react";
import axios from "axios";
import { URL } from "../globalConstant";
import loadingAnimation from "../assets/auth-loading.json";
import Lottie from "lottie-react";

export default function OAuthCallback() {
  const calledRef = useRef(false);

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;

    const rawCode = new URLSearchParams(window.location.search).get("code");
    if (!rawCode) return;

    const decodedCode = decodeURIComponent(rawCode);

    axios
      .post(`${URL}/oauth/token`, {
        code: decodedCode,
        loginUrl: "https://login.salesforce.com",
      })
      .then((res) => {
        localStorage.setItem("sfAuth", JSON.stringify(res.data));
        window.location.replace("/dashboard");
      })
      .catch((err) => {
        console.error(
          "OAuth callback error:",
          err.response?.data || err.message,
        );
        window.location.replace("/");
      });
  }, []);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-white">
      <Lottie animationData={loadingAnimation} loop className="h-56 w-56" />
      <p className="mt-4 text-sm font-medium text-gray-600">
        Authenticating with Salesforce…
      </p>
    </div>
  );
}
