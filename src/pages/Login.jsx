import { SalesforceIcon } from "../assets/SalesForceIcon";

const clientId =
  "3MVG9HtWXcDGV.nHJ2joZJYNGyQ.6DvBX13VkcC9c2gHEloZ4oQEkRxXKf6b2MSLidkRihR20oa6Aw4t_qa69";
const redirectUri = "https://sf-validation-rule.netlify.app/oauth/callback";

export default function Login() {
  const login = () => {
    window.location.href = `https://login.salesforce.com/services/oauth2/authorize
?response_type=code
&client_id=${clientId}
&redirect_uri=${redirectUri}
&prompt=login`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-md">
            <SalesforceIcon className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Metadata Manager
        </h1>

        <p className="text-gray-500 mb-8">
          Connect with your Salesforce Developer Org to manage Account
          validation rules
        </p>

        {/* Login Button */}
        <button
          onClick={login}
          className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition shadow-md"
        >
          <SalesforceIcon className="h-5 w-5" />
          Continue with Salesforce
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 my-8">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-sm text-gray-400">
            Secure OAuth 2.0 Authentication
          </span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Feature badges */}
        <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
          <div className="bg-gray-50 rounded-xl py-4 shadow-sm">
            🔒 <p className="mt-1">Secure</p>
          </div>
          <div className="bg-gray-50 rounded-xl py-4 shadow-sm">
            ☁️ <p className="mt-1">Cloud-based</p>
          </div>
          <div className="bg-gray-50 rounded-xl py-4 shadow-sm">
            ⚡ <p className="mt-1">Fast</p>
          </div>
        </div>

        {/* Footer text */}
        <p className="text-xs text-gray-400 mt-8">
          By continuing, you agree to authorize access to your Salesforce org
        </p>
      </div>
    </div>
  );
}
