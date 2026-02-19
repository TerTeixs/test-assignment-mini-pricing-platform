import express from "express";
import dotenv from "dotenv";
import pricingRoute from "./route.js";

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 8090;
const serviceName = process.env.name;

app.use("/api/v1/pricing", pricingRoute);

app.get("/api/v1/pricing/healthcheck", async (req, res) => {
  try {
    res.status(200);
    res.send("Pricing Service Online!");
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
