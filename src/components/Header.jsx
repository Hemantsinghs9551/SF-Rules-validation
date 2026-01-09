import { logout } from "../auth/auth";

export default function Header({ user }) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Salesforce Validation Rule Manager
        </h1>
        <p className="text-sm text-gray-500">
          {user?.name} • {user?.email} • {user?.organization?.Name}
        </p>
      </div>

      <button
        onClick={() => {
          logout();
          window.location.replace("/");
        }}
        className="px-4 py-2 bg-red-500 text-white rounded-md border-red-500 hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}
