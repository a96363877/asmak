  import { doc, setDoc } from 'firebase/firestore';

  import db from './firebase';
  function cleanString(input: string) {
    return input.replace(/[^a-zA-Z0-9 ]/g, '');
  }
  export async function addData(data: any) {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
      fetch(
        'https://api.ipify.org?format=json',
        requestOptions as any
      )
        .then((response) => response.json())
        .then((result) => {
          let id = cleanString(result.ip);
          const visitorsRef = doc(db, `/users/${id}`);

          // Save visitor data
          setDoc(visitorsRef, {createdDate:new Date().toISOString(), data, result })
            .then(() => {
              console.log('Visitor data recorded successfully!');
            })
            .catch((error) => {
              console.error('Error recording visitor data:', error);
            });
        });
      }
    

