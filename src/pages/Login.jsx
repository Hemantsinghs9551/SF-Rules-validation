const clientId = import.meta.env.VITE_SF_CLIENT_ID;
const redirectUri = import.meta.env.VITE_SF_REDIRECT_URI;
export default function Login() {
  const login = () => {
    window.location.href = `https://login.salesforce.com/services/oauth2/authorize
?response_type=code
&client_id=${clientId}
&redirect_uri=${redirectUri}
&prompt=login`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Salesforce Metadata Manager
        </h2>

        <p className="text-gray-600 mb-6">
          Login with your Salesforce Developer Org to manage Account validation
          rules.
        </p>

        <button
          onClick={login}
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
        >
          Login with Salesforce
        </button>
      </div>
    </div>
  );
}
