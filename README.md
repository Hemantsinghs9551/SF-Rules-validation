
# Salesforce Validation Rule Switcher

This project is a **full‑stack web application** developed as part of the **Associate Software Engineer Assignment**.
The application integrates with **Salesforce** using **OAuth 2.0 (Authorization Code Flow)** and allows users to
**view, enable, and disable validation rules** on the **Account object** through a web interface.

The project focuses on **secure authentication**, **Salesforce API integration**, and **real‑world backend‑frontend communication**.

---

## 🚀 Features

- Salesforce OAuth 2.0 login (no username/password sharing)
- Fetch validation rules from the Account object
- Display rules with active / inactive status
- Enable or disable validation rules
- Deploy changes directly to Salesforce
- Fully deployed frontend and backend

---

## 🧱 Tech Stack

### Frontend
- React.js
- Axios

### Backend
- Node.js
- Express.js
- Salesforce Tooling / Metadata API
- OAuth 2.0 Authorization Code Flow

### Deployment
- Frontend: Netlify
- Backend: Railway

---

## 🔐 Salesforce OAuth Configuration

### External Client App (Assignment Implementation)

> ⚠️ **Important Clarification for Evaluators**
>
> This project uses a **Salesforce External Client App** to demonstrate OAuth 2.0 authentication
> and Salesforce API integration.
>
> **External Client Apps are org‑bound** and therefore:
> - OAuth login works only within the **same Salesforce org** where the app is created
> - **Cross‑org SaaS OAuth is not supported**
>
> For a production‑grade, multi‑tenant SaaS solution, this implementation should be migrated
> to a **Salesforce Connected App**, which supports cross‑org OAuth flows.

### How the External Client App Is Configured

Navigate to:

```
Setup → App Manager → New External Client App
```

Enable OAuth and configure:

- Callback URL:
  ```
  https://sf-validation-rule.netlify.app/oauth/callback
  ```

- OAuth Scopes:
  - Access and manage your data (api)
  - Perform requests on your behalf at any time (refresh_token, offline_access)
  - Access basic information (openid, profile, email)

After saving, note:
- Client ID
- Client Secret

---

## 🔑 Environment Variables (Backend)

OAuth secrets are stored securely as environment variables.
No credentials are committed to source control.

Set the following variables in **Railway → Project → Variables**:

```env
CLIENT_ID=your_salesforce_client_id
CLIENT_SECRET=your_salesforce_client_secret
REDIRECT_URI=https://sf-validation-rule.netlify.app/oauth/callback
```

🔒 **Security Note**
- Salesforce usernames and passwords are **never requested or stored**
- Users authenticate directly on Salesforce’s official login page

---

## 🔄 OAuth Login Flow

1. User clicks **Login with Salesforce**
2. Salesforce login page opens
3. User logs in using their own Salesforce credentials
4. Salesforce redirects back with an authorization code
5. Backend exchanges the code for an access token
6. Salesforce APIs are called securely using the token

⚠️ With an External Client App, this flow works **only for users in the same Salesforce org**.

---

## 🔧 Application Flow

1. Login using Salesforce OAuth
2. Fetch validation rules from the Account object
3. View rules with active / inactive status
4. Enable or disable validation rules
5. Deploy changes to Salesforce
6. Changes reflect immediately in Salesforce Setup

---

## 🌐 Deployed Application

- Frontend: https://sf-validation-rule.netlify.app/
- Backend: https://sf-validation-backend-production.up.railway.app

---

## 🧪 How Evaluators Can Review This Project

Evaluators **do NOT need** Salesforce credentials from the author.

### Option 1: Live Demonstration (Recommended)
- The author can demonstrate the full flow via screen share:
  - OAuth login
  - Fetching validation rules
  - Enabling/disabling rules
  - Salesforce Setup verification


### Option 2: Code Review
- Review backend OAuth handling
- Review Salesforce API usage
- Review secure handling of secrets

> Sharing Salesforce usernames or passwords is **not required and not recommended**.

---


### Backend
```bash
npm install
npm run dev
```

### Frontend
```bash
npm install
npm start
```

---

## 📁 Repository Notes

- Frontend and backend source code included
- Environment variables documented
- `.env` files excluded for security
- frontend Repo : https://github.com/Hemantsinghs9551/SF-Rules-validation
- backend Repo : https://github.com/Hemantsinghs9551/SF-validation-backend

---

## ✅ Assignment Requirements Mapping

| Requirement                          | Status |
|-------------------------------------|--------|
| Salesforce Developer Org             | ✅ |
| Validation Rules on Account Object   | ✅ |
| OAuth 2.0 Authentication             | ✅ |
| Fetch Validation Rules               | ✅ |
| Enable / Disable Rules               | ✅ |
| Deploy Changes to Salesforce         | ✅ |
| Web App Deployment                   | ✅ |
| Git Repository                       | ✅ |

---

## 🧑‍💻 Author

**Hemant Singh**
**Email : hemantsinghs9551@gmail.com**
**Contact : 7898687705**  
Associate Software Engineer Assignment
