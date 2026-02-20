import { db } from "./db.js";
import { RULE_GET_LIST } from "./service/rule-service.js";

export class PricingAPIService {
  // async listPricing() {
  //   try {
  //     const sql = `SELECT * FROM rules`;
  //     let ruleData = [];
  //     return await new Promise((resolve, reject) => {
  //       db.all(sql, [], function (err, rows) {
  //         if (err) {
  //           return reject(err);
  //         }
  //         rows.forEach((row) => {
  //           ruleData.push({ ...row });
  //         });
  //         if (ruleData.length == 0) {
  //           return reject("Pricing not found");
  //         }
  //         return resolve(ruleData);
  //       });
  //     });
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  async quotePricing(req) {
    try {
      let errorMessages = [];
      let requiredField = [
        "type",
        "priority",
        "effective_from",
        "effective_to",
        "is_active",
      ];

      const response = await RULE_GET_LIST();
      if (response?.data === undefined) {
        throw "rule service is not responding";
      }
      console.log("response :", response?.data);

      // requiredField?.forEach((field) => {
      //   if (!req.body[field] === null || req.body[field] === undefined) {
      //     errorMessages.push({
      //       fieldName: field,
      //       errorMessage: "This field is required",
      //     });
      //   }
      // });
      // if (errorMessages.length > 0) {
      //   throw errorMessages;
      // }
      // const { type, priority, effective_from, effective_to, is_active } =
      //   req.body;
      // const sql = `INSERT INTO rules(type, priority, effective_from, effective_to, is_active) VALUES (?, ?, ?, ?, ?)`;
      // return await new Promise((resolve, reject) => {
      //   db.run(
      //     sql,
      //     [type, priority, effective_from, effective_to, is_active],
      //     function (err) {
      //       if (err) {
      //         return reject(err);
      //       }
      //       const ruleData = {
      //         id: this.lastID,
      //         ...req.body,
      //       };
      //       resolve(ruleData);
      //     },
      //   );
      // });
    } catch (err) {
      throw err;
    }
  }
}

export default PricingAPIService;
