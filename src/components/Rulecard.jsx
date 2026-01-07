export default function RuleCard({ rule, onToggle }) {
    const handleToggle = () => {
    const newActive = !rule.Active;
    console.log("Toggling rule:", rule.Id, newActive); // debug
    onToggle(newActive);
  };
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg bg-white shadow-sm">
      <div>
        <h4 className="font-medium text-gray-800">
          {rule.ValidationName}
        </h4>
        <p className="text-sm text-gray-500">
          Status: {rule.Active ? "Active" : "Inactive"}
        </p>
      </div>

      <button
        onClick={handleToggle}
        className={`px-4 py-2 rounded-md text-white transition
          ${rule.Active
            ? "bg-red-500 hover:bg-red-600"
            : "bg-green-500 hover:bg-green-600"}
        `}
      >
        {rule.Active ? "Disable" : "Enable"}
      </button>
    </div>
  );
}
