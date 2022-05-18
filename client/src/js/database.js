import { openDB } from 'idb';
import 'babel-polyfill';

const dbpromise = openDB('jate', 1, {
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
  const db = await dbpromise;
  const tx = db.transaction('jate', 'readwrite');
  await Promise.all([
    tx.store.add({value: content}),
    tx.done
  ]);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await dbpromise;
  const results = await db.getAll('jate');
  if (results.length){
    return results[results.length-1].value
  }
};