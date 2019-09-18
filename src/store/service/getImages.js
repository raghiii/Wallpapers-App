import axios from 'axios';
export default function getImagesService() {
  console.log('getImagesService');
  return new Promise((resolve, reject) => {
    axios
      .get(
        'https://api.unsplash.com/photos/?per_page=50&client_id=' +
          'a87ce2969e51acf89894a8aa76db4b33676e40cf54dfacd3f073fd202639f2a9'
      )
      .then(data => {
        console.log('data', data);
        resolve(data);
      })
      .catch(err => {
        console.log('Error happened during fetching!', err);
        reject(err);
      });
  });
}
