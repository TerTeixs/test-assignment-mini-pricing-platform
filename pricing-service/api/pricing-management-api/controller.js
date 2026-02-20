import PricingAPIService from "./pricing-management-api.js";

const pricingManagementAPIService = new PricingAPIService();

export const quotePricing = async (req, res) => {
  try {
    const data = await pricingManagementAPIService.quotePricing(req);

    return res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (err) {
    if (err?.message) {
      return res.status(500).json({ status: "error", message: err?.message });
    }
    return res.status(500).json({ status: "error", message: err });
  }
};

export const quoteBulk = async (req, res) => {
  try {
    const data = await pricingManagementAPIService.quoteBulk(req);

    return res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (err) {
    if (err?.message) {
      return res.status(500).json({ status: "error", message: err?.message });
    }
    return res.status(500).json({ status: "error", message: err });
  }
};
