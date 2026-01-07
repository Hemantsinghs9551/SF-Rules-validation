export default function Login() {
//   const login = () => {
//     window.location.href =
//       `https://login.salesforce.com/services/oauth2/authorize` +
//       `?response_type=code` +
//       `&client_id=3MVG9HtWXcDGV.nHJ2joZJYNGyQ.6DvBX13VkcC9c2gHEloZ4oQEkRxXKf6b2MSLidkRihR20oa6Aw4t_qa69` +
//       `&redirect_uri=http://localhost:3000/oauth/callback`;
//   };
  const login = () => {
  window.location.href =
    `https://login.salesforce.com/services/oauth2/authorize
?response_type=code
&client_id=3MVG9HtWXcDGV.nHJ2joZJYNGyQ.6DvBX13VkcC9c2gHEloZ4oQEkRxXKf6b2MSLidkRihR20oa6Aw4t_qa69
&redirect_uri=http://localhost:5173/oauth/callback
&prompt=login`;
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Salesforce Metadata Manager
        </h2>

        <p className="text-gray-600 mb-6">
          Login with your Salesforce Developer Org to manage Account validation rules.
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
