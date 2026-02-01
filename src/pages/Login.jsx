import { SalesforceIcon } from "../assets/SalesForceIcon";
import { URL } from "../globalConstant";

export default function Login() {
  const login = () => {
    window.location.href =
      `${URL}/oauth/login?loginUrl=https://login.salesforce.com`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10 text-center">
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-md">
            <SalesforceIcon className="h-8 w-8 text-white" />
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Metadata Manager
        </h1>

        <p className="text-gray-500 mb-8">
          Connect with your Salesforce Org to manage validation rules
        </p>

        <button
          onClick={login}
          className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition shadow-md"
        >
          <SalesforceIcon className="h-5 w-5" />
          Continue with Salesforce
        </button>
      </div>
    </div>
  );
}
