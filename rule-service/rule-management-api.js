import { db } from "./db.js";

export class RuleAPIService {
  async listRule() {
    try {
      const sql = `SELECT * FROM rules`;
      let ruleData = [];
      return await new Promise((resolve, reject) => {
        db.all(sql, [], function (err, rows) {
          if (err) {
            return reject(err);
          }
          rows.forEach((row) => {
            ruleData.push({ ...row });
          });
          if (ruleData.length == 0) {
            return reject("Rule not found");
          }
          return resolve(ruleData);
        });
      });
    } catch (err) {
      throw err;
    }
  }

  async createRule(req) {
    try {
      let errorMessages = [];

      let requiredField = [
        "type",
        "priority",
        "effective_from",
        "effective_to",
        "is_active",
      ];

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

      const { type, priority, effective_from, effective_to, is_active } =
        req.body;

      const sql = `INSERT INTO rules(type, priority, effective_from, effective_to, is_active) VALUES (?, ?, ?, ?, ?)`;

      return await new Promise((resolve, reject) => {
        db.run(
          sql,
          [type, priority, effective_from, effective_to, is_active],
          function (err) {
            if (err) {
              return reject(err);
            }
            const ruleData = {
              id: this.lastID,
              ...req.body,
            };
            resolve(ruleData);
          },
        );
      });
    } catch (err) {
      throw err;
    }
  }

  async updateRule(req) {
    try {
      let errorMessages = [];

      let requiredField = [
        "id",
        "type",
        "priority",
        "effective_from",
        "effective_to",
        "is_active",
      ];

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

      let sql = `SELECT * FROM rules WHERE id=?`;

      await new Promise((resolve, reject) => {
        db.get(sql, [req.body.id], function (err, row) {
          if (err) {
            return reject(err);
          }
          if (!row) {
            return reject("Rule not found");
          }
          resolve();
        });
      });

      const { type, priority, effective_from, effective_to, is_active, id } =
        req.body;

      console.log("req body :", req.body);

      sql = `
      UPDATE rules  
      SET 
        type = ?,
        priority = ?,
        effective_from = ?,
        effective_to = ?,
        is_active = ?
      WHERE id = ?
      `;

      return await new Promise((resolve, reject) => {
        db.run(
          sql,
          [type, priority, effective_from, effective_to, is_active, id],
          function (err) {
            if (err) {
              return reject(err);
            }
            const ruleData = {
              id: this.lastID,
              ...req.body,
            };
            resolve(ruleData);
          },
        );
      });
    } catch (err) {
      throw err;
    }
  }

  async deleteRule(req) {
    try {
      let errorMessages = [];

      // let requiredField = [
      //   "id",
      // ];

      if (!req.params.id) {
        errorMessages.push({
          fieldName: "id",
          errorMessage: "This field is required",
        });
      }

      if (errorMessages.length > 0) {
        throw errorMessages;
      }

      let sql = `SELECT * FROM rules WHERE id=?`;

      await new Promise((resolve, reject) => {
        db.get(sql, [req.params.id], function (err, row) {
          if (err) {
            return reject(err);
          }
          if (!row) {
            return reject("Rule not found");
          }
          resolve();
        });
      });

      sql = `DELETE FROM rules WHERE id=?`;

      return await new Promise((resolve, reject) => {
        db.run(sql, [req.params.id], function (err) {
          if (err) {
            return reject(err);
          }
          const ruleData = {
            id: req.params.id,
          };
          resolve(ruleData);
        });
      });
    } catch (err) {
      throw err;
    }
  }
}

export default RuleAPIService;
