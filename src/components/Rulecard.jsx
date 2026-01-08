export default function RuleCard({ rule, onToggle }) {
  const handleToggle = () => {
    const newActive = !rule.Active;
    onToggle(newActive);
  };
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg bg-white shadow-sm">
      <div>
        <h4 className="font-medium text-gray-800">
          {rule.ValidationName}
        </h4>
        <p className="text-sm text-gray-500">
          Status:{" "}
          <span
            className={rule.Active ? "text-green-600" : "text-red-600"}
          >
            {rule.Active ? "Active" : "Inactive"}
          </span>
        </p>
      </div>

      <button
        onClick={handleToggle}
        role="switch"
        aria-checked={rule.Active}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
          ${rule.Active ? "bg-green-500" : "bg-gray-300"}
        `}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
            ${rule.Active ? "translate-x-6" : "translate-x-1"}
          `}
        />
      </button>
    </div>
  );
}
