import sqlite3 from "sqlite3";

const sql3 = sqlite3.verbose();

const db = new sql3.Database(
  "./pricing.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  connected,
);

// rules TimeWindowPromotion, RemoteAreaSurcharge, WeightTier
let sql = `CREATE TABLE IF NOT EXISTS bulks_pricing(
  id INTEGER PRIMARY KEY,
  result TEXT NOT NULL
)`;

db.run(sql, [], (err) => {
  // callback function
  if (err) {
    console.log("Error creating rule table :", err.message);
    return;
  }
  // console.log("Created rule table");
});

function connected(err) {
  if (err) {
    console.log("db Error :", err.message);
    return;
  }
  // console.log("Created to the Rule db or db does already exist");
}

export { db };
