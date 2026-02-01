import { useEffect } from "react";
import axios from "axios";
import { URL } from "../globalConstant";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/auth-loading.json";

export default function OAuthSuccess() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const code = params.get("code");
    const state = params.get("state");

    if (!code || !state) {
      window.location.replace("/");
      return;
    }

    axios
      .post(`${URL}/oauth/token`, {
        code,
        state,
        loginUrl: "https://login.salesforce.com",
      })
      .then((res) => {
        // SAVE TOKEN
        localStorage.setItem("sfAuth", JSON.stringify(res.data));

        //  GO TO DASHBOARD
        window.location.replace("/dashboard");
      })
      .catch((err) => {
        console.error(
          "OAuth token exchange failed:",
          err.response?.data || err.message
        );
        window.location.replace("/");
      });
  }, []);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-white">
      <Lottie animationData={loadingAnimation} loop className="h-56 w-56" />
      <p className="mt-4 text-sm font-medium text-gray-600">
        Completing Salesforce login…
      </p>
    </div>
  );
}
