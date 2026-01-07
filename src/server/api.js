import axios from "axios";
import { getAuth } from "../auth/auth";

const API_BASE_URL = "http://localhost:4000";

export const fetchValidationRules = async () => {
  const auth = getAuth();

  if (!auth) {
    throw new Error("Not authenticated");
  }

  try {
    const response = await axios.get(
      `${API_BASE_URL}/validation-rules`,
      {
        headers: {
          access_token: auth.access_token,
          instance_url: auth.instance_url,
        },
      }
    );

    console.log(response.data.records, "validation rules");
    return response.data.records || [];
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch validation rules"
    );
  }
};

export const toggleValidationRule = async (id, active) => {
  console.log(id, active, "sdffdsf")
  const auth = getAuth();
  if (!auth) {
    throw new Error("Not authenticated");
  }

  try {
    await axios.patch(`${API_BASE_URL}/validation-rules/${id}`, {
      access_token: auth.access_token,
      instance_url: auth.instance_url,
      active,
    });
    return true;
  } catch (error) {
    // Extract detailed error message from Salesforce
    let errorMessage = "Failed to toggle validation rule";
    
    if (error.response?.data) {
      if (error.response.data.error) {
        errorMessage = error.response.data.error;
      } else if (Array.isArray(error.response.data)) {
        errorMessage = error.response.data.map(e => e.message || e.errorCode).join(", ");
      } else if (error.response.data.message) {
        errorMessage = error.response.data.message;
      }
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    throw new Error(errorMessage);
  }
};