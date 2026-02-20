import sqlite3 from "sqlite3";

const sql3 = sqlite3.verbose();

const db = new sql3.Database(
  "./rule.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      return console.error("Connection Error:", err.message);
    }

    // Now that we are connected, run the table creation
    db.run(sql, (err) => {
      if (err) console.error("Table Creation Error:", err.message);
    });
  },
);

// rules TimeWindowPromotion, RemoteAreaSurcharge, WeightTier
let sql = `CREATE TABLE IF NOT EXISTS rules(
  id INTEGER PRIMARY KEY,
  type TEXT NOT NULL,
  priority INTEGER NOT NULL,
  effective_from NUMERIC NOT NULL,
  effective_to NUMERIC NOT NULL,
  is_active INTEGER NOT NULL,
  rule_data TEXT NOT NULL
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
