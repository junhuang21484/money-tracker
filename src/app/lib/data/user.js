"use server";
import connection from "./connector";

export async function fetchUserByEmail(email) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM Users WHERE email = ?",
      [email],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results.length ? results[0] : null);
      }
    );
  });
}

export async function fetchUserByID(userID) {
  const sql = `SELECT * FROM Users WHERE user_id=?`;
  const values = [userID];

  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, results) => {
      if (error) {
        return reject(error);
      }

      resolve(results[0]);
    });
  });
}

export async function insertNewUser(
  email,
  password,
  firstName,
  lastName,
  role
) {
  const sql = `INSERT INTO Users (user_id, email, password, first_name, last_name, role) VALUES (UUID(), ?, ?, ?, ?, ?)`;
  const values = [email, password, firstName, lastName, "unverified_user"];

  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, results) => {
      if (error) {
        return reject(error);
      }

      resolve(results);
    });
  });
}

export async function fetchFirstNameByUserID(userID) {
  const sql = `SELECT first_name FROM Users WHERE user_id = ?`;
  const values = [userID];

  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, results) => {
      if (error) {
        return reject(error);
      }
      const first_name = results[0]?.first_name;
      resolve(first_name);
    });
  });
}

export async function fetchLastNameByUserID(userID) {
  const sql = `SELECT last_name FROM Users WHERE user_id = ?`;
  const values = [userID];

  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, results) => {
      if (error) {
        return reject(error);
      }
      const last_name = results[0]?.last_name;
      resolve(last_name);
    });
  });
}

export async function fetchEmailByUserID(userID) {
  const sql = `SELECT email FROM Users WHERE user_id = ?`;
  const values = [userID];

  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, results) => {
      if (error) {
        return reject(error);
      }
      const email = results[0]?.email;
      resolve(email);
    });
  });
}

export async function fetchProfilePictureUrlByUserID(userID) {
  const sql = `SELECT profile_picture FROM Users WHERE user_id = ?`;
  const values = [userID];

  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, results) => {
      if (error) {
        return reject(error);
      }
      const profilePictureUrl = results[0]?.profile_picture;
      resolve(profilePictureUrl);
    });
  });
}

export async function updateUserByID(userID, updatedUserData) {
  const { first_name, last_name, email, password } = updatedUserData;

  const sql = `UPDATE Users
               SET first_name = ?, last_name = ?, email = ?, password = ?
               WHERE user_id = ?`;

  const values = [first_name, last_name, email, password, userID];

  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results[0] || {});
    });
  });
}
export async function updateProfilePicture(userID, imageUrl) {
  const sql = `UPDATE Users
               SET profile_picture = ?
               WHERE user_id = ?`;

  const values = [imageUrl, userID];

  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, results) => {
      if (error) {
        return reject(error);
      }

      resolve(results);
    });
  });
}
export async function fetchUserNetBalance(userId) {
  const sql = `
    SELECT
      SUM(CASE WHEN accountTypes.is_depository = 1 THEN accounts.balance ELSE 0 END) AS available_fund,
      SUM(CASE WHEN accountTypes.is_depository = 0 THEN accounts.balance ELSE 0 END) AS outstanding_debt
    FROM Users
    JOIN accounts ON accounts.user_id = Users.user_id
    JOIN accountTypes ON accounts.account_type_id = accountTypes.account_type_id
    WHERE Users.user_id = ?
  `;

  const { available_fund = 0, outstanding_debt = 0 } = await new Promise(
    (resolve, reject) => {
      connection.query(sql, [userId], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results[0] || {});
      });
    }
  );

  return available_fund - outstanding_debt;
}

export async function getUserOverview(userId) {
  const availableFundSQL = `
    SELECT SUM(accounts.balance) AS available_fund
    FROM Users
    JOIN accounts ON accounts.user_id = Users.user_id
    JOIN accountTypes ON accounts.account_type_id = accountTypes.account_type_id
    WHERE Users.user_id = ? AND accountTypes.is_depository = 1;
  `;

  const debtSQL = `
    SELECT SUM(accounts.balance) AS outstanding_debt
    FROM Users
    JOIN accounts ON accounts.user_id = Users.user_id
    JOIN accountTypes ON accounts.account_type_id = accountTypes.account_type_id
    WHERE Users.user_id = ? AND accountTypes.is_depository = 0;
  `;

  const spendingSQL = `SELECT ROUND(SUM(TRANS.amount)) AS amount, TRANS.category FROM accounts ACC
  JOIN accountTypes ACCT
  ON ACC.account_type_id = ACCT.account_type_id
  JOIN transactions TRANS
  ON ACC.account_id = TRANS.account_id
  WHERE ACC.user_id = ?
  GROUP BY TRANS.category`;

  const yearlySpendingIncomeSQL = `SELECT SUM(
    CASE 
      WHEN transactions.amount > 0 AND accountTypes.is_depository = 1 THEN transactions.amount
      WHEN transactions.amount < 0 AND accountTypes.is_depository = 0 THEN transactions.amount
      ELSE 0 END
      ) AS total_income,
    SUM(
      CASE 
        WHEN transactions.amount > 0 AND accountTypes.is_depository = 0 THEN transactions.amount
        WHEN transactions.amount < 0 AND accountTypes.is_depository = 1 THEN transactions.amount 
              ELSE 0 END
      ) AS total_expense
  FROM transactions
  JOIN accounts ON transactions.account_id = accounts.account_id
  JOIN accountTypes ON accounts.account_type_id = accountTypes.account_type_id
  WHERE accounts.user_id = ?
    AND abs(DATEDIFF(CURRENT_DATE, transactions.date)) <= 365;`;

  const queries = [
    new Promise((resolve, reject) => {
      connection.query(availableFundSQL, [userId], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results[0]?.available_fund || 0);
      });
    }),
    new Promise((resolve, reject) => {
      connection.query(debtSQL, [userId], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results[0]?.outstanding_debt || 0);
      });
    }),
    new Promise((resolve, reject) => {
      connection.query(spendingSQL, [userId], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    }),
    new Promise((resolve, reject) => {
      connection.query(yearlySpendingIncomeSQL, [userId], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results[0]);
      });
    }),
  ];

  const [
    availableFund,
    outstandingDebt,
    spendingByCategory,
    yearlySpendingIncomeRaw,
  ] = await Promise.all(queries);
  const highestIncomeData = spendingByCategory.reduce(
    (max, current) => (current.amount > max.amount ? current : max),
    { amount: -Infinity, category: "" }
  );
  const highestSpendingData = spendingByCategory.reduce(
    (min, current) => (current.amount < min.amount ? current : min),
    { amount: Infinity, category: "" }
  );

  const yearlySpendingIncome = {
    total_income: Number(yearlySpendingIncomeRaw.total_income?.toFixed(2) || 0),
    total_expense: Number(
      yearlySpendingIncomeRaw.total_expense?.toFixed(2) || 0
    ),
  };

  return {
    availableFund,
    outstandingDebt,
    highestIncomeData,
    highestSpendingData,
    yearlySpendingIncome,
  };
}

export async function deleteUserByID(userID) {
  const sql = `DELETE FROM Users WHERE user_id = ?`;
  const values = [userID];

  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, results) => {
      if (error) {
        return reject(error);
      }

      if (results.affectedRows === 0) {
        return reject(new Error("User not found"));
      }

      resolve(results);
    });
  });
}
