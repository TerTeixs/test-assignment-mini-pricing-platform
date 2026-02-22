import { db } from "../../db.js";
import { RULE_GET_LIST } from "../../service/rule-service.js";
import dayjs from "dayjs";

import isBetween from "dayjs/plugin/isBetween.js";

dayjs.extend(isBetween);

// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export class PricingAPIService {
  async quotePricing(req) {
    try {
      let errorMessages = [];
      let requiredField = ["name", "shipping_to"];

      if (req.body.products.length === 0) {
        throw "Product is required";
      }

      requiredField?.forEach((field) => {
        if (!req.body[field] === null || req.body[field] === undefined) {
          errorMessages.push({
            fieldName: field,
            errorMessage: "This field is required",
          });
        }
      });

      if (errorMessages.length > 0) {
        throw errorMessages;
      }

      const response = await RULE_GET_LIST();
      if (response?.data === undefined) {
        throw "rule service is not responding";
      }

      response.data = response.data?.filter((rule) => {
        const isBetweenDate = dayjs(dayjs().format("YYYY-MM-DD")).isBetween(
          rule.effective_from,
          rule.effective_to,
          "day",
          "[]", // this make its between or equal date
        );
        return isBetweenDate && rule.is_active === 1;
      });

      response.data = response.data.sort((a, b) => a.priority - b.priority);

      let { name, products, shipping_to } = req.body;
      let totalPrice = 0,
        totalWeight = 0;

      products.map((item) => {
        totalPrice += item?.price * item?.quantity;
        totalWeight += item?.weight * item?.quantity;
      });

      response.data?.map((rule) => {
        switch (rule.type) {
          case "TimeWindowPromotion":
            const now = dayjs();
            const startTime = rule.rule_data.TimeWindowPromotion.start_time;
            const endTime = rule.rule_data.TimeWindowPromotion.end_time;

            const startDate = dayjs(
              `${now.format("YYYY-MM-DD")} ${startTime}`,
              "YYYY-MM-DD HH:mm",
            );
            const endDate = dayjs(
              `${now.format("YYYY-MM-DD")} ${endTime}`,
              "YYYY-MM-DD HH:mm",
            );

            const isBetweenRuleDate = now.isBetween(
              startDate,
              endDate,
              "minute",
              "[]", // this make its between or equal date
            );
            if (!isBetweenRuleDate) {
              break;
            }
            totalPrice =
              totalPrice -
              (totalPrice * rule.rule_data.TimeWindowPromotion.percentage) /
                100;
            break;
          case "RemoteAreaSurcharge":
            if (
              rule.rule_data.RemoteAreaSurcharge.destination === shipping_to
            ) {
              totalPrice += rule.rule_data.RemoteAreaSurcharge.price;
            }
            break;
          case "WeightTier":
            let weightIndex;
            rule.rule_data.WeightTier.map((weight, index) => {
              if (totalWeight >= weight.min && totalWeight <= weight.max) {
                weightIndex = index;
              }
            });
            if (weightIndex) {
              totalPrice +=
                rule.rule_data.WeightTier[weightIndex].price_per_kg *
                totalWeight;
            }
            break;
          default:
            throw "Invalid rule type";
        }
      });
      const pricingData = {
        totalPrice: totalPrice,
        totalWeight: totalWeight,
        name: name,
      };
      return pricingData;
    } catch (err) {
      throw err;
    }
  }

  async quoteBulk(req) {
    try {
      if (req.get("content-type") !== "application/json") {
        throw "File format mismatch";
      }

      if (!req.body || Object.keys(req.body).length === 0) {
        throw "Invalid JSON data";
      }

      const response = await RULE_GET_LIST();
      if (response?.data === undefined) {
        throw "rule service is not responding";
      }

      response.data = response.data.filter((rule) => {
        const isBetweenDate = dayjs(dayjs().format("YYYY-MM-DD")).isBetween(
          rule.effective_from,
          rule.effective_to,
          "day",
          "[]", // this make its between or equal date
        );
        return isBetweenDate && rule.is_active === 1;
      });

      response.data = response.data.sort((a, b) => a.priority - b.priority);

      const jobId = await new Promise((resolve, reject) => {
        db.run(
          `INSERT INTO bulks_pricing (status) VALUES ("pending")`,
          function (err) {
            if (err) {
              reject(err);
            }
            if (this) {
              resolve(this.lastID);
            } else {
              reject(
                new Error(
                  "Failed to retrieve lastID: 'this' context is undefined.",
                ),
              );
            }
            // resolve(this.lastID);
          },
        );
      });

      this._processBulkInBackground(jobId, req.body, response.data).catch(
        console.error,
      );

      return {
        message: "Bulk pricing calculation started",
        jobId: jobId,
      };
    } catch (err) {
      throw err;
    }
  }

  async _processBulkInBackground(jobId, items, ruleList) {
    try {
      let bulkData = [];

      // await sleep(10000);

      items.map((item) => {
        let { name, products, shipping_to } = item;
        let totalPrice = 0,
          totalWeight = 0;
        products.map((item) => {
          totalPrice += item?.price * item?.quantity;
          totalWeight += item?.weight * item?.quantity;
        });
        ruleList.map((rule) => {
          switch (rule.type) {
            case "TimeWindowPromotion":
              const now = dayjs();
              const startTime = rule.rule_data.TimeWindowPromotion.start_time;
              const endTime = rule.rule_data.TimeWindowPromotion.end_time;
              const startDate = dayjs(
                `${now.format("YYYY-MM-DD")} ${startTime}`,
                "YYYY-MM-DD HH:mm",
              );
              const endDate = dayjs(
                `${now.format("YYYY-MM-DD")} ${endTime}`,
                "YYYY-MM-DD HH:mm",
              );
              const isBetweenRuleDate = now.isBetween(
                startDate,
                endDate,
                "minute",
                "[]", // this make its between or equal date
              );
              if (!isBetweenRuleDate) {
                break;
              }
              totalPrice =
                totalPrice -
                (totalPrice * rule.rule_data.TimeWindowPromotion.percentage) /
                  100;
              break;
            case "RemoteAreaSurcharge":
              if (
                rule.rule_data.RemoteAreaSurcharge.destination === shipping_to
              ) {
                totalPrice += rule.rule_data.RemoteAreaSurcharge.price;
              }
              break;
            case "WeightTier":
              let weightIndex;
              rule.rule_data.WeightTier.map((weight, index) => {
                if (totalWeight >= weight.min && totalWeight <= weight.max) {
                  weightIndex = index;
                }
              });
              if (weightIndex) {
                totalPrice +=
                  rule.rule_data.WeightTier[weightIndex].price_per_kg *
                  totalWeight;
              }
              break;
            default:
              throw "Invalid rule type";
          }
        });
        const pricingData = {
          totalPrice: totalPrice,
          totalWeight: totalWeight,
          name: name,
        };
        bulkData.push(pricingData);
      });

      const sql = `UPDATE bulks_pricing 
      SET status = "completed",
          result = ? 
      WHERE id= ?`;

      await new Promise((resolve, reject) => {
        db.run(sql, [JSON.stringify(bulkData), jobId], function (err) {
          if (err) {
            return reject(console.error("DB Update Error:", err.message));
          } else
            return resolve(
              console.log(`Job ${jobId} finished and saved to DB.`),
            );
        });
      });
    } catch (err) {
      console.log("err", err);
      db.run(`UPDATE bulks_pricing SET status = 'failed' WHERE id = ?`, [
        jobId,
      ]);
    }
  }
}

export default PricingAPIService;
