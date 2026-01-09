import axios from "axios";
import { getAuth } from "../auth/auth";
import { URL } from "../globalConstant";


export const fetchValidationRules = async () => {
  const auth = getAuth();

  if (!auth) {
    throw new Error("Not authenticated");
  }

  try {
    const response = await axios.get(
      `${URL}/validation-rules`,
      {
        headers: {
          access_token: auth.access_token,
          instance_url: auth.instance_url,
        },
      }
    );
    

    return response.data.records || [];
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch validation rules"
    );
  }
};

export const toggleValidationRule = async (id, active) => {
  const auth = getAuth();
  if (!auth) {
    throw new Error("Not authenticated");
  }

  try {
    await axios.patch(`${URL}/validation-rules/${id}`, {
      access_token: auth.access_token,
      instance_url: auth.instance_url,
      active,
    });
    return true;
  } catch (error) {
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

export const fetchOrganizationInfo = async () => {
  const auth = getAuth();
  if (!auth) {
    throw new Error("Not authenticated");
  }

  try {
    const res = await axios.get(
      `${URL}/sf/organization`,
      {
        headers: {
          access_token: auth.access_token,
          instance_url: auth.instance_url,
        },
      }
    );

    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error ||
      "Failed to fetch organization info"
    );
  }
};