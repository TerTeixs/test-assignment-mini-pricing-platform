import { db } from "../../db.js";
import dayjs from "dayjs";

import isBetween from "dayjs/plugin/isBetween.js";

dayjs.extend(isBetween);

export class JobAPIService {
  async getBulkPricing(req) {
    try {
      if (req.params.id === null || req.params.id === undefined) {
        throw "id is required";
      }
      let bulkData;
      const sql = `SELECT * FROM bulks_pricing WHERE id=?`;
      await new Promise((resolve, reject) => {
        db.get(sql, [req.params.id], function (err, row) {
          if (err) {
            return reject(err);
          }
          if (!row) {
            return reject("job not found");
          }
          bulkData = row;
          return resolve(row);
        });
      });
      if (bulkData.status === "completed") {
        return {
          ...bulkData,
          result: JSON.parse(bulkData.result),
        };
      } else {
        return { id: bulkData.id, status: bulkData.status };
      }
    } catch (err) {
      throw err;
    }
  }
}

export default JobAPIService;
