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
    return response;
  } catch (err) {
    return err;
  }
}

// export async function TIME_CARD_CSV_EXPORT(payload) {
//   let newPayload = {
//     ...payload,
//   };
//   for (const i in payload) {
//     if (payload[i] === "" || payload === null || payload === undefined) {
//       delete newPayload[i];
//     }
//   }
//   const token = GET_COOKIE_TOKEN();
//   const config = {
//     method: "get",
//     url: process.env.API_DOMAIN + "/api/v1/reports/hq/time_card_export_csv",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//       Authorization: `Bearer ${token?.cookieData?.access?.at}`,
//     },
//     params: {
//       ...newPayload,
//     },
//     data: {},
//   };
//   try {
//     const response = await axios(config);
//     return response?.data;
//   } catch (error) {
//     console.log("error :", error);
//     if (error.response.data.error_status === "invalid_access_token") {
//       await GEN_ACCESS_TOKEN();
//       return TIME_CARD_REPORT(payload);
//     }
//     if (error.response.data) {
//       return error.response.data;
//     } else {
//       return {
//         status: "error",
//         error_message: { en: "ERROR API REQUEST" },
//       };
//     }
//   }
// }
