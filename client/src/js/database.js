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
  const db = await openDB("jate", 1);
  const text = db.transaction('jate', "readwrite");
  const store = text.objectStore('jate');
  const newText = store.put({ id: 1, value: content});
  const result = await newText;
  console.log('Your additions have been secured', result);
} catch (err) {
  console.error('putDb not implemented');
}}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => { 
try {
  const db = await openDB("jate", 1);
  const text = db.transaction('jate', "readonly");
  const store = text.objectStore('jate');
  const content = store.getAll();
  const result = await content;
  console.log('Your additions have been secured', result);
  return result.value;
} catch (err) {
  console.error('getDb not implemented')
}};

initdb();
