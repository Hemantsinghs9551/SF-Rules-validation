import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import RuleCard from "../components/Rulecard";
import axios from "axios";
import { getAuth } from "../auth/auth";
import { fetchValidationRules, toggleValidationRule } from "../server/api";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  useEffect(() => {
    const loadRules = async () => {
      try {
        const result = await fetchValidationRules();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching validation rules:", error);
      }
    };

    loadRules();
  }, []);

  const auth = getAuth();

  // const toggleRule = (rule) => {
  //   // Original backend PATCH call (commented):
  //   axios.patch(`http://localhost:4000/validation-rules/${rule.Id}`, {
  //     access_token: auth.access_token,
  //     instance_url: auth.instance_url,
  //     active: !rule.Active,
  //     ruleName: rule.ValidationName,
  //   }).then(() => {
  //     setRules(prev =>
  //       prev.map(r =>
  //         r.Id === rule.Id ? { ...r, Active: !r.Active } : r
  //       )
  //     );
  //   });

  //   // Frontend-only toggle using local state:
  //   setRules((prev) =>
  //     prev.map((r) =>
  //       r.Id === rule.Id ? { ...r, Active: !r.Active } : r
  //     )
  //   );
  // };

  return (
    <Layout>
      {/* <Header user={user} /> */}

      <h3 className="text-xl font-semibold mb-4">Account Validation Rules</h3>

      {loading ? (
        <p className="text-gray-500">Loading rules...</p>
      ) : (
        <div className="grid gap-4">
          {data?.map((rule) => (
            <RuleCard
              key={rule.Id}
              rule={rule}
              onToggle={(newActive) => toggleValidationRule(rule.Id, newActive)}
            />
          ))}
        </div>
      )}
    </Layout>
  );
}
