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
  try {
    const db = await openDB('jate', 1); // Open the database
    const tx = db.transaction('jate', 'readwrite'); // Start a transaction with readwrite mode
    const store = tx.objectStore('jate'); // Get the object store

    await store.put({ content }); // Add the content to the object store
    await tx.complete; // Complete the transaction
    console.log('Data successfully added to IndexedDB.');
  } catch (error) {
    console.error('Error adding data to IndexedDB:', error);
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => console.error('getDb not implemented');

initdb();