import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Put to the database');

  // Create a connection to the database database and version we want to use.
  const contactDb = await openDB('JATE', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = contactDb.transaction('JATE', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('JATE');

  // Use the .add() method on the store and pass in the content.
  const request = store.add({id: 1, value: content });

  // Get confirmation of the request.
  const result = await request;
  console.log('🚀 - data saved to the database', result.value);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  // Create a connection to the database database and version we want to use.
  const contactDb = await openDB('JATE', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = contactDb.transaction('JATE', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('JATE');

  // Use the .getAll() method to get all data in the database.
  const request = store.get(1);

  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result.value);
  return result?.value;
};

initdb();
