"use server";
import connection from "./connector";
import { cookies } from "next/headers";
import { getDataFromToken } from "@/app/lib/data/jwtToken";

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

      resolve(results);
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

      resolve(results);
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

export async function getUserId() {
  const storedCookies = cookies();
  const token = storedCookies.get("token");
  if (token) {
    const userId = getDataFromToken(token.value).user_id;
    return userId;
  } else {
    return null;
  }
}
