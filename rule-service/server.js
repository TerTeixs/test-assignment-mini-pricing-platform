import express from "express";
import dotenv from "dotenv";
import ruleRoute from "./api/rule-management-api/route.js";

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 8080;
const serviceName = process.env.NAME;

app.use("/api/v1/rule", ruleRoute);

app.get("/api/v1/rule/healthcheck", async (req, res) => {
  try {
    res.status(200);
    res.send("Rule Service Online!");
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
