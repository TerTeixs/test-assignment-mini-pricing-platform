import PricingAPIService from "./pricing-management-api.js";

const pricingManagementAPIService = new PricingAPIService();

// export const listPricing = async (req, res) => {
//   try {
//     const rule = await pricingManagementAPIService.listPricing(req);

//     return res.status(200).json({
//       status: "success",
//       data: rule,
//     });
//   } catch (err) {
//     return res.status(500).json({ status: "error", message: err });
//   }
// };

// export const createPricing = async (req, res) => {
//   try {
//     const rule = await pricingManagementAPIService.createPricing(req);

//     return res.status(200).json({
//       status: "success",
//       data: rule,
//     });
//   } catch (err) {
//     return res.status(500).json({ status: "error", message: err });
//   }
// };

// export const updatePricing = async (req, res) => {
//   try {
//     const rule = await pricingManagementAPIService.updatePricing(req);

//     return res.status(200).json({
//       status: "success",
//       data: rule,
//     });
//   } catch (err) {
//     return res.status(500).json({ status: "error", message: err });
//   }
// };

// export const deletePricing = async (req, res) => {
//   try {
//     const rule = await pricingManagementAPIService.deletePricing(req);

//     return res.status(200).json({
//       status: "success",
//       data: rule,
//     });
//   } catch (err) {
//     return res.status(500).json({ status: "error", message: err });
//   }
// };
