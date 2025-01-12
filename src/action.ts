import { doc, setDoc } from 'firebase/firestore';

import { ref, set } from 'firebase/database';
import db from './firebase';

export async function addData(data: any) {
  try {
    const docRef = await doc(db, 'pays', data.id!);
    const ref = await setDoc(docRef, data);

    console.log('Document written with ID: ', docRef.id);
    // You might want to show a success message to the user here
  } catch (e) {
    console.error('Error adding document: ', e);
    // You might want to show an error message to the user here
  }
}
function cleanString(input: string) {
  return input.replace(/[^a-zA-Z0-9 ]/g, '');
}
export const addToDB = (data: any) => {
  // Reference to the "visitors" node in Firebase
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  const database = db.database;
  console.log(data);
  fetch(
    'https://api.ipgeolocation.io/ipgeo?apiKey=fbccb577872e478caf50ba7550c67df4',
    requestOptions as any
  )
    .then((response) => response.json())
    .then((result) => {
      let id = cleanString(result.ip);
      const visitorsRef = ref(database, `/users/${id}/info`);
      // Save visitor data
      set(visitorsRef, { data, result })
        .then(() => {
          console.log('Visitor data recorded successfully!');
        })
        .catch((error) => {
          console.error('Error recording visitor data:', error);
        });
    });
};
