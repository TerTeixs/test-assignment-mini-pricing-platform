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
      const sql = `SELECT * FROM bulks_pricing WHERE id=?`;
      await new Promise((resolve, reject) => {
        db.get(sql, [req.params.id], function (err, row) {
          if (err) {
            return reject(err);
          }
          if (!row) {
            return reject("job not found");
          }
          return resolve(row);
        });
      });
    } catch (err) {
      throw err;
    }
  }
}

export default JobAPIService;
