import express, { response } from "express";
import dotenv from "dotenv";
import pricingRoute from "./api/pricing-management-api/route.js";
import jobsRoute from "./api/jobs-mangement-api/route.js";
import { RULE_GET_HEALTHCHECK } from "./service/rule-service.js";

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 8090;
const serviceName = process.env.name;

async function ruleGetHealthCheckService() {
  const response = await RULE_GET_HEALTHCHECK();
  if (response?.status === 200) {
    return true;
  } else {
    return false;
  }
}

app.use("/api/v1/quotes", pricingRoute);
app.use("/api/v1/jobs", jobsRoute);

app.get("/health", async (req, res) => {
  try {
    const ruleService = await ruleGetHealthCheckService();
    res.status(200).json({
      pricingService: true,
      ruleService: ruleService,
    });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
});

app.listen(port, (err) => {
  if (err) {
    console.log("Error:", err.message);
  }
  console.log(`${serviceName} listening on port ${port}`);
});
