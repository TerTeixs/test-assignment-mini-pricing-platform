import JobAPIService from "./jobs-management-api.js";

const jobsManagementAPIService = new JobAPIService();

export const getBulkPricing = async (req, res) => {
  try {
    const data = await jobsManagementAPIService.getBulkPricing(req);

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
