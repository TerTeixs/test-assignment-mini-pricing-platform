import axios from "axios";

export async function RULE_GET_HEALTHCHECK() {
  const config = {
    method: "get",
    url: process.env.RULE_SERVICE_API_DOMAIN + "/api/v1/rule/healthcheck",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    params: {},
    data: {},
  };
  try {
    const response = await axios(config);
    return response;
  } catch (err) {
    return err;
  }
}

export async function RULE_GET_LIST() {
  const config = {
    method: "get",
    url: process.env.RULE_SERVICE_API_DOMAIN + "/api/v1/rule",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    params: {},
    data: {},
  };
  try {
    const response = await axios(config);
    return response.data;
  } catch (err) {
    return err;
  }
}
