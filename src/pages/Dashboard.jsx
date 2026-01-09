import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import RuleCard from "../components/Rulecard";
import {
  fetchOrganizationInfo,
  fetchValidationRules,
  toggleValidationRule,
} from "../server/api";
import axios from "axios";
import { URL } from "../globalConstant";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/auth-loading.json";
import noData from "../assets/Nodata.json";

const NoData = () => (
  <div className="flex flex-col items-center justify-center py-20">
    <Lottie animationData={noData} loop className="h-48 w-48" />
    <p className="mt-4 text-base font-medium text-gray-600">No rules found</p>
    <p className="mt-1 text-sm text-gray-400">
      There are no validation rules available for this account.
    </p>
  </div>
);

export default function Dashboard() {
  const [rules, setRules] = useState([]);
  const [data, setData] = useState(null);

  const [rulesLoading, setRulesLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);

  const [deploying, setDeploying] = useState(false);

  useEffect(() => {
    const loadAllUserData = async () => {
      try {
        const auth = JSON.parse(localStorage.getItem("sfAuth"));

        const [userRes, orgRes] = await Promise.all([
          axios.get(`${URL}/sf/userinfo`, {
            headers: {
              access_token: auth.access_token,
              instance_url: auth.instance_url,
            },
          }),
          fetchOrganizationInfo(),
        ]);

        setData({
          ...userRes.data,
          organization: orgRes,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setUserLoading(false);
      }
    };

    loadAllUserData();
  }, []);

  useEffect(() => {
    const loadRules = async () => {
      try {
        const result = await fetchValidationRules();

        const normalized = result.map((r) => ({
          ...r,
          Active: r.Active === true || r.Active === "true",
        }));

        setRules(normalized);
      } catch (err) {
        console.error(err);
      } finally {
        setRulesLoading(false);
      }
    };

    loadRules();
  }, []);

  const pageLoading = userLoading || rulesLoading;

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
      prev.map((r) => (r.Active ? r : { ...r, Active: true, dirty: true }))
    );
  };

  const disableAllRules = () => {
    setRules((prev) =>
      prev.map((r) => (!r.Active ? r : { ...r, Active: false, dirty: true }))
    );
  };

  const allEnabled = rules.length && rules.every((r) => r.Active);
  const allDisabled = rules.length && rules.every((r) => !r.Active);

  if (pageLoading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-white">
        <Lottie
          animationData={loadingAnimation}
          loop
          className="h-40 w-40 sm:h-56 sm:w-56"
        />
        <p className="mt-3 text-sm text-gray-500">
          Loading your Salesforce data…
        </p>
      </div>
    );
  }

  return (
    <Layout>
      <Header user={data} />

      <h3 className="text-xl font-semibold mb-4">Account Validation Rules</h3>

      {rules.length === 0 ? (
        <NoData />
      ) : (
        <div className="grid gap-4 mb-6">
          {rules.map((rule) => (
            <RuleCard
              key={rule.Id}
              rule={rule}
              onToggle={(newActive) => toggleRuleLocal(rule.Id, newActive)}
            />
          ))}
        </div>
      )}

      <div className="flex gap-3 mb-4">
        <button
          onClick={enableAllRules}
          disabled={allEnabled}
          className={`px-4 py-2 rounded text-white ${
            allEnabled
              ? "bg-green-300 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          Enable All
        </button>

        <button
          onClick={disableAllRules}
          disabled={allDisabled}
          className={`px-4 py-2 rounded text-white ${
            allDisabled
              ? "bg-red-300 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          }`}
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
    </Layout>
  );
}
