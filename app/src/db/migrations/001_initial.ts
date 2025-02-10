import { Database } from "sqlite3";

const db = new Database("loyalty.db");

const createTables = () => {
    // Table des transactions
    db.run(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      transaction_hash TEXT NOT NULL,
      block_number INTEGER NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      user_address TEXT NOT NULL,
      transaction_type TEXT NOT NULL,
      amount INTEGER NOT NULL,
      purchase_type TEXT NOT NULL
    )
  `);

    // Table pour les statistiques agrégées
    db.run(`
    CREATE TABLE IF NOT EXISTS stats_daily (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date DATE NOT NULL,
      purchase_type TEXT NOT NULL,
      total_earned INTEGER DEFAULT 0,
      total_used INTEGER DEFAULT 0,
      unique_users INTEGER DEFAULT 0,
      UNIQUE(date, purchase_type)
    )
  `);

    // Index pour améliorer les performances
    db.run("CREATE INDEX IF NOT EXISTS idx_transactions_user ON transactions(user_address)");
    db.run("CREATE INDEX IF NOT EXISTS idx_transactions_timestamp ON transactions(timestamp)");
    db.run("CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(transaction_type)");
};

export { db, createTables };