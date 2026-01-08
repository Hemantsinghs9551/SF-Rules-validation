import { useEffect } from "react";
import axios from "axios";
import { URL } from "../globalConstant";
// url =  https://sf-validation-backend-production.up.railway.app
export default function OAuthCallback() {
  useEffect(() => {
    const rawCode = new URLSearchParams(window.location.search).get("code");
    if (!rawCode) return;

    const decodedCode = decodeURIComponent(rawCode);
// and this code = aPrxpGCnFcxE7rlTWfk_CjQe8ai2A9g749caKYDuOUAt.y0YQLCj4DI4pqT.VFZJTOnobylXBA==

    axios
      .post(`${URL}/oauth/token`, {
        code: decodedCode, 
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
