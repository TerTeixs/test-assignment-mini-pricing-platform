import RuleAPIService from "./rule-management-api.js";

const ruleManagementAPIService = new RuleAPIService();

export const listRule = async (req, res) => {
  try {
    const rule = await ruleManagementAPIService.listRule(req);

    return res.status(200).json({
      status: "success",
      data: rule,
    });
  } catch (err) {
    if (err?.message) {
      return res.status(500).json({ status: "error", message: err?.message });
    }
    return res.status(500).json({ status: "error", message: err });
  }
};

export const createRule = async (req, res) => {
  try {
    const rule = await ruleManagementAPIService.createRule(req);

    return res.status(200).json({
      status: "success",
      data: rule,
    });
  } catch (err) {
    if (err?.message) {
      return res.status(500).json({ status: "error", message: err?.message });
    }
    return res.status(500).json({ status: "error", message: err });
  }
};

export const updateRule = async (req, res) => {
  try {
    const rule = await ruleManagementAPIService.updateRule(req);

    return res.status(200).json({
      status: "success",
      data: rule,
    });
  } catch (err) {
    if (err?.message) {
      return res.status(500).json({ status: "error", message: err?.message });
    }
    return res.status(500).json({ status: "error", message: err });
  }
};

export const deleteRule = async (req, res) => {
  try {
    const rule = await ruleManagementAPIService.deleteRule(req);

    return res.status(200).json({
      status: "success",
      data: rule,
    });
  } catch (err) {
    if (err?.message) {
      return res.status(500).json({ status: "error", message: err?.message });
    }
    return res.status(500).json({ status: "error", message: err });
  }
};
