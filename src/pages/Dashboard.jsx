import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import RuleCard from "../components/Rulecard";
import { fetchValidationRules, toggleValidationRule } from "../server/api";
import axios from "axios";

export default function Dashboard() {
  const [rules, setRules] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deploying, setDeploying] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const auth = JSON.parse(localStorage.getItem("sfAuth"));

      const res = await axios.get("http://localhost:4000/sf/userinfo", {
        headers: {
          access_token: auth.access_token,
          instance_url: auth.instance_url,
        },
      });
      setData(res.data);
    };

    fetchUser();
  }, []);
  useEffect(() => {
    const loadRules = async () => {
      const result = await fetchValidationRules();

      const normalized = result.map((r) => ({
        ...r,
        Active: r.Active === true || r.Active === "true",
      }));

      setRules(normalized);
      setLoading(false);
    };

    loadRules();
  }, []);
  const toggleRuleLocal = (ruleId, newActive) => {
    setRules((prev) =>
      prev.map((rule) =>
        rule.Id === ruleId ? { ...rule, Active: newActive, dirty: true } : rule
      )
    );
  };

  const deployChanges = async () => {
    const changedRules = rules.filter((r) => r.dirty);
    if (!changedRules.length) return alert("No changes to deploy");

    try {
      setDeploying(true);
      for (const rule of changedRules) {
        await toggleValidationRule(rule.Id, rule.Active);
      }
      setRules((prev) => prev.map((r) => ({ ...r, dirty: false })));
      alert("Deployed successfully");
    } catch (err) {
      console.error(err);
      alert("Deployment failed");
    } finally {
      setDeploying(false);
    }
  };
  const enableAllRules = () => {
    setRules((prev) =>
      prev.map((r) =>
        r.Active === true ? r : { ...r, Active: true, dirty: true }
      )
    );
  };

  const disableAllRules = () => {
    setRules((prev) =>
      prev.map((rule) =>
        !rule.Active ? rule : { ...rule, Active: false, dirty: true }
      )
    );
  };
  const allEnabled = rules.length > 0 && rules.every((r) => r.Active === true);

  const allDisabled =
    rules.length > 0 && rules.every((r) => r.Active === false);

  return (
    <Layout>
      <Header user={data}/>

      <h3 className="text-xl font-semibold mb-4">Account Validation Rules</h3>

      {loading ? (
        <p className="text-gray-500">Loading rules...</p>
      ) : (
        <>
          <div className="grid gap-4 mb-6">
            {rules.map((rule) => (
              <RuleCard
                key={rule.Id}
                rule={rule}
                onToggle={(newActive) => toggleRuleLocal(rule.Id, newActive)}
              />
            ))}
          </div>

          <div className="flex gap-3 mb-4">
            <button
              onClick={enableAllRules}
              disabled={allEnabled}
              className={`px-4 py-2 rounded text-white
                  ${
                    allEnabled
                      ? "bg-green-300 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }
                `}
            >
              Enable All
            </button>

            <button
              onClick={disableAllRules}
              disabled={allDisabled}
              className={`px-4 py-2 rounded text-white
                ${
                  allDisabled
                    ? "bg-red-300 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700"
                }
              `}
            >
              Disable All
            </button>

            <button
              onClick={deployChanges}
              disabled={deploying}
              className="ml-auto bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {deploying ? "Deploying..." : "Deploy to Salesforce"}
            </button>
          </div>
        </>
      )}
    </Layout>
  );
}
