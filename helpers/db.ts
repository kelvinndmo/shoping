import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("places.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS locations (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imagUrl TEXT NOT NULL, address TEXT NOT NULL, lat TEXT NOT NULL, lng NOT NULL);",
        [],
        ///success function
        () => {
          resolve("ok");
        },
        // error function
        (_, err) => {
          // return false;
          reject(err);
        }
      );
    });
  });

  return promise;
};

export const insertPlace = (title, imageUrl, address, latitude, longitude) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO locations (title, imagUrl,address,lat,lng) VALUES (?,?,?,?,?);",
        [title, imageUrl, address, latitude, longitude],
        ///success function
        (_, result) => {
          resolve(result);
        },
        // error function
        (_, err) => {
          // return false;
          reject(err);
        }
      );
    });
  });

  return promise;
};

export const fetchPlaces = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM locations",
        [],
        ///success function
        (_, result) => {
          resolve(result);
        },
        // error function
        (_, err) => {
          // return false;
          reject(err);
        }
      );
    });
  });

  return promise;
};
